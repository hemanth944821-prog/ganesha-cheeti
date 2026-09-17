const express = require('express');
const cors = require('cors');
const { getPool, sql } = require('../backend/config/db');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Normalize request URLs (strips /api prefix if Vercel serverless proxy passes /login or /api/login)
app.use((req, res, next) => {
  if (req.url.startsWith('/api/')) {
    req.url = req.url.substring(4);
  } else if (req.url === '/api') {
    req.url = '/';
  }
  next();
});

// ============================================================
// 1. GLOBAL SETTINGS & CHEETICYCLES ENDPOINTS (dbo.CheetiCycles & dbo.AppSettings)
// ============================================================
app.get(['/settings', '/api/settings'], async (req, res) => {
  try {
    const pool = await getPool();
    if (!pool) return res.status(503).json({ error: 'MSSQL Database connection unavailable' });

    let settings = {
      appTitleEn: "Ganesha Cheeti",
      appTitleKn: "ಗಣೇಶ ಚೀಟಿ",
      groupNameEn: "Sri Ganesh Friends",
      groupNameKn: "ಶ್ರೀ ಗಣೇಶ್ ಫ್ರೆಂಡ್ಸ್",
      monthlyContribution: 200,
      effectiveFromMonth: "Oct 2026",
      cheetiDrawDay: 12,
      defaultInterestRate: 5
    };

    // Query dbo.CheetiCycles
    try {
      const cycleRes = await pool.request().query("SELECT TOP 1 * FROM dbo.CheetiCycles WHERE Status = 'Active'");
      if (cycleRes.recordset && cycleRes.recordset.length > 0) {
        const c = cycleRes.recordset[0];
        if (c.CycleName) settings.groupNameEn = c.CycleName;
        if (c.DefaultMonthlyAmount) settings.monthlyContribution = c.DefaultMonthlyAmount;
        if (c.DrawDayOfMonth) settings.cheetiDrawDay = c.DrawDayOfMonth;
        if (c.StartMonthYear) settings.effectiveFromMonth = c.StartMonthYear;
      }
    } catch (e) {}

    // Query dbo.AppSettings key-value table
    try {
      await pool.request().query(`
        IF OBJECT_ID('dbo.AppSettings', 'U') IS NULL
        BEGIN
            CREATE TABLE dbo.AppSettings (
                SettingKey NVARCHAR(100) PRIMARY KEY,
                SettingValue NVARCHAR(MAX) NOT NULL
            );
        END
      `);

      const result = await pool.request().query('SELECT * FROM dbo.AppSettings');
      if (result.recordset && result.recordset.length > 0) {
        result.recordset.forEach(row => {
          try {
            const parsed = JSON.parse(row.SettingValue);
            settings[row.SettingKey] = typeof parsed === 'number' ? parsed : (isNaN(Number(parsed)) ? parsed : Number(parsed));
          } catch (e) {
            const raw = row.SettingValue;
            settings[row.SettingKey] = (!isNaN(Number(raw)) && raw.trim() !== '') ? Number(raw) : raw;
          }
        });
      }
    } catch (e) {}

    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post(['/settings', '/api/settings'], async (req, res) => {
  try {
    const pool = await getPool();
    if (!pool) return res.status(503).json({ error: 'MSSQL Database connection unavailable' });

    const groupName = req.body.groupNameEn || 'Sri Ganesh Friends';
    const monthlyAmt = req.body.monthlyContribution || 200;
    const drawDay = req.body.cheetiDrawDay || 12;
    const effectiveMonth = req.body.effectiveFromMonth || 'Oct 2026';

    // 1. Update dbo.CheetiCycles
    try {
      await pool.request()
        .input('groupName', sql.NVarChar, groupName)
        .input('monthlyAmt', sql.Decimal(18,2), monthlyAmt)
        .input('drawDay', sql.Int, drawDay)
        .input('effectiveMonth', sql.NVarChar, effectiveMonth)
        .query(`
          IF OBJECT_ID('dbo.CheetiCycles', 'U') IS NOT NULL
          BEGIN
              UPDATE dbo.CheetiCycles
              SET CycleName = @groupName,
                  DefaultMonthlyAmount = @monthlyAmt,
                  DrawDayOfMonth = @drawDay
              WHERE Status = 'Active';

              IF @@ROWCOUNT = 0
              BEGIN
                  INSERT INTO dbo.CheetiCycles (CycleName, StartMonthYear, EndMonthYear, DefaultMonthlyAmount, TotalMembers, DrawDayOfMonth, Status)
                  VALUES (@groupName, @effectiveMonth, 'Sep 2027', @monthlyAmt, 15, @drawDay, 'Active');
              END
          END
        `);
    } catch (e) { console.error('CheetiCycles update:', e.message); }

    // 2. Save into dbo.AppSettings
    await pool.request().query(`
      IF OBJECT_ID('dbo.AppSettings', 'U') IS NULL
      BEGIN
          CREATE TABLE dbo.AppSettings (
              SettingKey NVARCHAR(100) PRIMARY KEY,
              SettingValue NVARCHAR(MAX) NOT NULL
          );
      END
    `);

    for (const [key, val] of Object.entries(req.body)) {
      const strVal = typeof val === 'object' ? JSON.stringify(val) : String(val);
      await pool.request()
        .input('key', sql.NVarChar, key)
        .input('val', sql.NVarChar, strVal)
        .query(`
          MERGE dbo.AppSettings AS target
          USING (SELECT @key AS SettingKey) AS source
          ON (target.SettingKey = source.SettingKey)
          WHEN MATCHED THEN UPDATE SET SettingValue = @val
          WHEN NOT MATCHED THEN INSERT (SettingKey, SettingValue) VALUES (@key, @val);
        `);
    }

    res.json({ success: true, settings: req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// 2. EXPENSE CATEGORIES ENDPOINTS (dbo.ExpenseCategories)
// ============================================================
app.get(['/categories', '/api/categories'], async (req, res) => {
  try {
    const pool = await getPool();
    if (!pool) return res.status(503).json({ error: 'MSSQL Database connection unavailable' });

    await pool.request().query(`
      IF OBJECT_ID('dbo.ExpenseCategories', 'U') IS NULL
      BEGIN
          CREATE TABLE dbo.ExpenseCategories (
              CategoryID NVARCHAR(100) PRIMARY KEY,
              Code NVARCHAR(50) NOT NULL,
              Name_EN NVARCHAR(150) NOT NULL,
              Name_KN NVARCHAR(150) NOT NULL,
              Status NVARCHAR(50) NOT NULL DEFAULT 'Active',
              Color NVARCHAR(50) NOT NULL DEFAULT '#059669'
          );
      END
    `);

    const result = await pool.request().query('SELECT CategoryID as id, Code as code, Name_EN as nameEn, Name_KN as nameKn, Status as status, Color as color FROM dbo.ExpenseCategories');
    if (result.recordset && result.recordset.length > 0) {
      return res.json(result.recordset);
    }

    // Default Seed if DB empty
    const defaults = [
      { id: 'festival', code: 'FEST', nameEn: 'Festival', nameKn: 'ಹಬ್ಬ', status: 'Active', color: '#059669' },
      { id: 'temple', code: 'TMPL', nameEn: 'Temple', nameKn: 'ದೇವಾಲಯ', status: 'Active', color: '#D97706' },
      { id: 'pooja', code: 'POOJ', nameEn: 'Puja & Rituals', nameKn: 'ಪೂಜೆ ಮತ್ತು ಆಚರಣೆ', status: 'Active', color: '#7C3AED' },
      { id: 'food', code: 'FOOD', nameEn: 'Food & Prasad', nameKn: 'ಊಟ ಮತ್ತು ಪ್ರಸಾದ', status: 'Active', color: '#DC2626' },
      { id: 'other', code: 'OTHR', nameEn: 'Other', nameKn: 'ಇತರ', status: 'Active', color: '#4B5563' }
    ];
    res.json(defaults);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post(['/categories', '/api/categories'], async (req, res) => {
  try {
    const pool = await getPool();
    if (!pool) return res.status(503).json({ error: 'MSSQL Database connection unavailable' });

    if (Array.isArray(req.body)) {
      await pool.request().query(`
        IF OBJECT_ID('dbo.ExpenseCategories', 'U') IS NULL
        BEGIN
            CREATE TABLE dbo.ExpenseCategories (
                CategoryID NVARCHAR(100) PRIMARY KEY,
                Code NVARCHAR(50) NOT NULL,
                Name_EN NVARCHAR(150) NOT NULL,
                Name_KN NVARCHAR(150) NOT NULL,
                Status NVARCHAR(50) NOT NULL DEFAULT 'Active',
                Color NVARCHAR(50) NOT NULL DEFAULT '#059669'
            );
        END
      `);

      for (const cat of req.body) {
        await pool.request()
          .input('id', sql.NVarChar, cat.id)
          .input('code', sql.NVarChar, cat.code || cat.id.substring(0,4).toUpperCase())
          .input('nameEn', sql.NVarChar, cat.nameEn)
          .input('nameKn', sql.NVarChar, cat.nameKn || cat.nameEn)
          .input('status', sql.NVarChar, cat.status || 'Active')
          .input('color', sql.NVarChar, cat.color || '#059669')
          .query(`
            MERGE dbo.ExpenseCategories AS target
            USING (SELECT @id AS CategoryID) AS source
            ON (target.CategoryID = source.CategoryID)
            WHEN MATCHED THEN UPDATE SET Code = @code, Name_EN = @nameEn, Name_KN = @nameKn, Status = @status, Color = @color
            WHEN NOT MATCHED THEN INSERT (CategoryID, Code, Name_EN, Name_KN, Status, Color) VALUES (@id, @code, @nameEn, @nameKn, @status, @color);
          `);
      }
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// 3. MEMBERS ENDPOINTS (dbo.Members)
// ============================================================
app.get(['/members', '/api/members'], async (req, res) => {
  try {
    const pool = await getPool();
    if (!pool) return res.status(503).json({ error: 'MSSQL Database connection unavailable' });

    const result = await pool.request().query('SELECT MemberID, MemberCode, Name_EN, Name_KN, Phone, Role, Status FROM dbo.Members ORDER BY MemberID ASC');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post(['/members', '/api/members'], async (req, res) => {
  const { name_en, name_kn, phone, role, password } = req.body;
  try {
    const pool = await getPool();
    if (!pool) return res.status(503).json({ error: 'MSSQL Database connection unavailable' });

    const countRes = await pool.request().query('SELECT COUNT(*) AS total FROM dbo.Members');
    const code = `M#${(countRes.recordset[0].total + 1).toString().padStart(2, '0')}`;
    
    await pool.request()
      .input('code', sql.NVarChar, code)
      .input('name_en', sql.NVarChar, name_en)
      .input('name_kn', sql.NVarChar, name_kn || name_en)
      .input('phone', sql.NVarChar, phone)
      .input('password', sql.NVarChar, password || '1234')
      .input('role', sql.NVarChar, role || 'Member')
      .query(`INSERT INTO dbo.Members (MemberCode, Name_EN, Name_KN, Phone, Password, Role, Status) VALUES (@code, @name_en, @name_kn, @phone, @password, @role, 'Active')`);

    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch(['/members/:id/status', '/api/members/:id/status'], async (req, res) => {
  const memberId = parseInt(req.params.id, 10);
  const { status } = req.body;
  try {
    const pool = await getPool();
    if (!pool) return res.status(503).json({ error: 'MSSQL Database connection unavailable' });

    await pool.request()
      .input('memberId', sql.Int, memberId)
      .input('status', sql.NVarChar, status)
      .query('UPDATE dbo.Members SET Status = @status WHERE MemberID = @memberId');

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put(['/members/:id', '/api/members/:id'], async (req, res) => {
  const memberId = parseInt(req.params.id, 10);
  const { name_en, name_kn, phone, role, status } = req.body;
  try {
    const pool = await getPool();
    if (!pool) return res.status(503).json({ error: 'MSSQL Database connection unavailable' });

    await pool.request()
      .input('memberId', sql.Int, memberId)
      .input('name_en', sql.NVarChar, name_en)
      .input('name_kn', sql.NVarChar, name_kn || name_en)
      .input('phone', sql.NVarChar, phone)
      .input('role', sql.NVarChar, role || 'Member')
      .input('status', sql.NVarChar, status || 'Active')
      .query(`
        UPDATE dbo.Members 
        SET Name_EN = @name_en, Name_KN = @name_kn, Phone = @phone, Role = @role, Status = @status 
        WHERE MemberID = @memberId
      `);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// AUTH LOGIN (Matches RTRIM/LTRIM for both Phone and Password)
app.post(['/login', '/api/login'], async (req, res) => {
  const phone = (req.body.phone || '').toString().trim();
  const password = (req.body.password || '').toString().trim();
  try {
    const pool = await getPool();
    if (!pool) return res.status(503).json({ error: 'MSSQL Database connection unavailable' });

    const result = await pool.request()
      .input('phone', sql.NVarChar, phone)
      .input('password', sql.NVarChar, password)
      .query('SELECT MemberID, MemberCode, Name_EN, Name_KN, Phone, Role, Status FROM dbo.Members WHERE RTRIM(LTRIM(Phone)) = RTRIM(LTRIM(@phone)) AND RTRIM(LTRIM(Password)) = RTRIM(LTRIM(@password))');

    if (result.recordset && result.recordset.length > 0) {
      const user = result.recordset[0];
      if (user.Status === 'Inactive') return res.status(403).json({ success: false, message: 'Account inactive' });
      return res.json({ success: true, user });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid phone or password' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CHANGE PASSWORD
app.post(['/change-password', '/api/change-password'], async (req, res) => {
  const { memberId, newPassword } = req.body;
  try {
    const pool = await getPool();
    if (!pool) return res.status(503).json({ error: 'MSSQL Database connection unavailable' });

    await pool.request()
      .input('memberId', sql.Int, memberId)
      .input('newPassword', sql.NVarChar, (newPassword || '').toString().trim())
      .query('UPDATE dbo.Members SET Password = @newPassword WHERE MemberID = @memberId');

    res.json({ success: true, message: 'Password updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// 4. CONTRIBUTIONS ENDPOINTS (dbo.Contributions)
// ============================================================
app.get(['/contributions', '/api/contributions'], async (req, res) => {
  try {
    const pool = await getPool();
    if (!pool) return res.status(503).json({ error: 'MSSQL Database connection unavailable' });

    const result = await pool.request().query(`
      SELECT c.*, m.MemberCode, m.Name_EN, m.Name_KN 
      FROM dbo.Contributions c 
      JOIN dbo.Members m ON c.MemberID = m.MemberID 
      ORDER BY c.ContributionID DESC
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post(['/contributions', '/api/contributions'], async (req, res) => {
  const { memberId, monthYear, amount, paymentMethod, transactionRef, status } = req.body;
  try {
    const pool = await getPool();
    if (!pool) return res.status(503).json({ error: 'MSSQL Database connection unavailable' });

    await pool.request()
      .input('memberId', sql.Int, memberId)
      .input('monthYear', sql.NVarChar, monthYear || 'Oct 2026')
      .input('amount', sql.Decimal(18,2), amount || 200.00)
      .input('paymentMethod', sql.NVarChar, paymentMethod || 'UPI')
      .input('transactionRef', sql.NVarChar, transactionRef || '')
      .input('status', sql.NVarChar, status || 'Pending Approval')
      .query(`
        INSERT INTO dbo.Contributions (MemberID, MonthYear, DueDate, Amount, PaymentMethod, TransactionRef, Status, PaidDate)
        VALUES (@memberId, @monthYear, GETDATE(), @amount, @paymentMethod, @transactionRef, @status, CASE WHEN @status = 'Paid' OR @status = 'Approved' THEN GETDATE() ELSE NULL END);
      `);

    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch(['/contributions/:id/status', '/api/contributions/:id/status'], async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { status, rejectionReason, transactionRef } = req.body;
  try {
    const pool = await getPool();
    if (!pool) return res.status(503).json({ error: 'MSSQL Database connection unavailable' });

    await pool.request()
      .input('id', sql.Int, id)
      .input('status', sql.NVarChar, status)
      .input('ref', sql.NVarChar, rejectionReason || transactionRef || '')
      .query(`
        UPDATE dbo.Contributions 
        SET Status = @status, 
            PaidDate = CASE WHEN @status = 'Paid' OR @status = 'Approved' THEN GETDATE() ELSE PaidDate END,
            TransactionRef = CASE WHEN @ref <> '' THEN @ref ELSE TransactionRef END
        WHERE ContributionID = @id
      `);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// 5. EXPENSES ENDPOINTS (dbo.Expenses)
// ============================================================
app.get(['/expenses', '/api/expenses'], async (req, res) => {
  try {
    const pool = await getPool();
    if (!pool) return res.status(503).json({ error: 'MSSQL Database connection unavailable' });

    const result = await pool.request().query('SELECT * FROM dbo.Expenses ORDER BY ExpenseDate DESC');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post(['/expenses', '/api/expenses'], async (req, res) => {
  const { title_en, title_kn, category, amount, expenseDate } = req.body;
  try {
    const pool = await getPool();
    if (!pool) return res.status(503).json({ error: 'MSSQL Database connection unavailable' });

    await pool.request()
      .input('title_en', sql.NVarChar, title_en)
      .input('title_kn', sql.NVarChar, title_kn || title_en)
      .input('category', sql.NVarChar, category || 'Festival')
      .input('amount', sql.Decimal(18, 2), amount)
      .input('expenseDate', sql.Date, expenseDate || new Date())
      .query(`INSERT INTO dbo.Expenses (Title_EN, Title_KN, Category, Amount, ExpenseDate) VALUES (@title_en, @title_kn, @category, @amount, @expenseDate)`);

    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete(['/expenses/:id', '/api/expenses/:id'], async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const pool = await getPool();
    if (!pool) return res.status(503).json({ error: 'MSSQL Database connection unavailable' });

    await pool.request().input('id', sql.Int, id).query('DELETE FROM dbo.Expenses WHERE ExpenseID = @id');
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// 6. LOANS ENDPOINTS (dbo.Loans)
// ============================================================
app.get(['/loans', '/api/loans'], async (req, res) => {
  try {
    const pool = await getPool();
    if (!pool) return res.status(503).json({ error: 'MSSQL Database connection unavailable' });

    const result = await pool.request().query(`
      SELECT l.*, m.MemberCode, m.Name_EN, m.Name_KN 
      FROM dbo.Loans l 
      JOIN dbo.Members m ON l.BorrowerID = m.MemberID 
      WHERE l.Status = 'Active'
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post(['/loans', '/api/loans'], async (req, res) => {
  const { memberId, principalAmount } = req.body;
  try {
    const pool = await getPool();
    if (!pool) return res.status(503).json({ error: 'MSSQL Database connection unavailable' });

    await pool.request()
      .input('memberId', sql.Int, memberId)
      .input('principal', sql.Decimal(18,2), principalAmount)
      .query(`
        IF OBJECT_ID('dbo.Loans', 'U') IS NOT NULL
        BEGIN
            MERGE dbo.Loans AS target
            USING (SELECT @memberId AS BorrowerID) AS source
            ON (target.BorrowerID = source.BorrowerID AND target.Status = 'Active')
            WHEN MATCHED THEN UPDATE SET PrincipalAmount = @principal
            WHEN NOT MATCHED THEN INSERT (BorrowerID, PrincipalAmount, MonthlyInterestRatePercent, DisbursedDate, Status)
            VALUES (@memberId, @principal, 5.00, GETDATE(), 'Active');
        END
      `);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// 7. PAYOUTS ENDPOINTS (dbo.Payouts)
// ============================================================
app.get(['/payouts', '/api/payouts'], async (req, res) => {
  try {
    const pool = await getPool();
    if (!pool) return res.status(503).json({ error: 'MSSQL Database connection unavailable' });

    const result = await pool.request().query(`
      SELECT p.*, m.MemberCode, m.Name_EN, m.Name_KN 
      FROM dbo.Payouts p 
      JOIN dbo.Members m ON p.MemberID = m.MemberID 
      ORDER BY p.PayoutID DESC
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post(['/payouts', '/api/payouts'], async (req, res) => {
  const { memberId, monthYear, amountWon, paymentMethod } = req.body;
  try {
    const pool = await getPool();
    if (!pool) return res.status(503).json({ error: 'MSSQL Database connection unavailable' });

    await pool.request()
      .input('memberId', sql.Int, memberId)
      .input('monthYear', sql.NVarChar, monthYear)
      .input('drawDate', sql.Date, new Date())
      .input('amountWon', sql.Decimal(18,2), amountWon || 2400)
      .input('paymentMethod', sql.NVarChar, paymentMethod || 'UPI')
      .query(`INSERT INTO dbo.Payouts (MemberID, MonthYear, DrawDate, AmountWon, PaymentMethod) VALUES (@memberId, @monthYear, @drawDate, @amountWon, @paymentMethod)`);

    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// 8. NOTIFICATIONS ENDPOINTS (dbo.Notifications)
// ============================================================
app.get(['/notifications', '/api/notifications'], async (req, res) => {
  try {
    const pool = await getPool();
    if (!pool) return res.status(503).json({ error: 'MSSQL Database connection unavailable' });

    await pool.request().query(`
      IF OBJECT_ID('dbo.Notifications', 'U') IS NULL
      BEGIN
          CREATE TABLE dbo.Notifications (
              NotificationID INT IDENTITY(1,1) PRIMARY KEY,
              Title NVARCHAR(250) NOT NULL,
              Body NVARCHAR(500) NOT NULL,
              Type NVARCHAR(50) NOT NULL DEFAULT 'Broadcast',
              CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
              IsRead BIT NOT NULL DEFAULT 0
          );
      END
    `);

    const result = await pool.request().query('SELECT * FROM dbo.Notifications ORDER BY NotificationID DESC');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post(['/notifications', '/api/notifications'], async (req, res) => {
  const { title, body, type } = req.body;
  try {
    const pool = await getPool();
    if (!pool) return res.status(503).json({ error: 'MSSQL Database connection unavailable' });

    await pool.request().query(`
      IF OBJECT_ID('dbo.Notifications', 'U') IS NULL
      BEGIN
          CREATE TABLE dbo.Notifications (
              NotificationID INT IDENTITY(1,1) PRIMARY KEY,
              Title NVARCHAR(250) NOT NULL,
              Body NVARCHAR(500) NOT NULL,
              Type NVARCHAR(50) NOT NULL DEFAULT 'Broadcast',
              CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
              IsRead BIT NOT NULL DEFAULT 0
          );
      END
    `);

    await pool.request()
      .input('title', sql.NVarChar, title || 'Alert / ಸೂಚನೆ')
      .input('body', sql.NVarChar, body || 'Important update.')
      .input('type', sql.NVarChar, type || 'Broadcast')
      .query('INSERT INTO dbo.Notifications (Title, Body, Type, CreatedAt) VALUES (@title, @body, @type, GETDATE())');

    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// 9. SUMMARY AGGREGATION ENDPOINT
// ============================================================
app.get(['/summary', '/api/summary'], async (req, res) => {
  try {
    const pool = await getPool();
    if (!pool) return res.status(503).json({ error: 'MSSQL Database connection unavailable' });

    const result = await pool.request().query(`
      SELECT 
        (SELECT ISNULL(SUM(Amount), 90000) FROM dbo.Contributions WHERE Status = 'Paid' OR Status = 'Approved') AS TotalSavings,
        (SELECT COUNT(*) FROM dbo.Members WHERE Status='Active') AS TotalMembers,
        (SELECT ISNULL(SUM(Amount), 8450) FROM dbo.Expenses) AS TotalExpenses,
        (SELECT ISNULL(SUM(TotalInterestCollected), 4500) FROM dbo.Loans) AS TotalInterest
    `);

    res.json({
      totalSavings: result.recordset[0].TotalSavings,
      totalMembers: result.recordset[0].TotalMembers,
      completedYears: 2,
      monthlyContribution: 200,
      nextDrawDate: '12th Oct 2026',
      interestRatePercent: 5,
      totalInterestPaid: result.recordset[0].TotalInterest,
      totalExpenses: result.recordset[0].TotalExpenses,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
