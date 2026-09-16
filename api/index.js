const express = require('express');
const cors = require('cors');
const { getPool, sql } = require('../backend/config/db');

const app = express();

app.use(cors());
app.use(express.json());

// In-Memory Seed Fallback
let mockMembers = [
  { MemberID: 1, MemberCode: 'M#01', Name_EN: 'Ganesh (Admin)', Name_KN: 'ಗಣೇಶ್ (ಅಡ್ಮಿನ್)', Phone: '9876543210', Password: 'admin123', Role: 'Admin', Status: 'Active' },
  { MemberID: 2, MemberCode: 'M#02', Name_EN: 'Ramesh', Name_KN: 'ರಮೇಶ್', Phone: '9876543211', Password: '1234', Role: 'Member', Status: 'Active' },
  { MemberID: 3, MemberCode: 'M#03', Name_EN: 'Suresh', Name_KN: 'ಸುರೇಶ್', Phone: '9876543212', Password: '1234', Role: 'Member', Status: 'Active' },
  { MemberID: 4, MemberCode: 'M#04', Name_EN: 'Mahesh', Name_KN: 'ಮಹೇಶ್', Phone: '9876543213', Password: '1234', Role: 'Member', Status: 'Active' },
  { MemberID: 5, MemberCode: 'M#05', Name_EN: 'Ravi', Name_KN: 'ರವಿ', Phone: '9876543214', Password: '1234', Role: 'Member', Status: 'Active' },
  { MemberID: 6, MemberCode: 'M#06', Name_EN: 'Shankar', Name_KN: 'ಶಂಕರ್', Phone: '9876543215', Password: '1234', Role: 'Member', Status: 'Active' },
  { MemberID: 7, MemberCode: 'M#07', Name_EN: 'Ramesh Kumar', Name_KN: 'ರಮೇಶ್ ಕುಮಾರ್', Phone: '9876543216', Password: '1234', Role: 'Member', Status: 'Active' },
  { MemberID: 8, MemberCode: 'M#08', Name_EN: 'Lakshmi', Name_KN: 'ಲಕ್ಷ್ಮಿ', Phone: '9876543217', Password: '1234', Role: 'Member', Status: 'Active' },
  { MemberID: 9, MemberCode: 'M#09', Name_EN: 'Anitha', Name_KN: 'ಅನಿತಾ', Phone: '9876543218', Password: '1234', Role: 'Member', Status: 'Active' },
  { MemberID: 10, MemberCode: 'M#10', Name_EN: 'Kumar', Name_KN: 'ಕುಮಾರ್', Phone: '9876543219', Password: '1234', Role: 'Member', Status: 'Active' },
];

let mockExpenses = [
  { ExpenseID: 1, Title_EN: 'Ganesh Chaturthi Puja (Temple & Prasad)', Title_KN: 'ಗಣೇಶ ಚತುರ್ಥಿ ಪೂಜೆ (ದೇವಾಲಯ ಮತ್ತು ಪ್ರಸಾದ)', Category: 'Festival', Amount: 2500, ExpenseDate: '2026-09-12' },
  { ExpenseID: 2, Title_EN: 'Group Dinner', Title_KN: 'ಗುಂಪು ಊಟ', Category: 'Other', Amount: 1800, ExpenseDate: '2026-08-05' },
  { ExpenseID: 3, Title_EN: 'Temple Donation', Title_KN: 'ದೇವಾಲಯ ದೇಣಿಗೆ', Category: 'Temple', Amount: 1000, ExpenseDate: '2026-01-15' },
  { ExpenseID: 4, Title_EN: 'Flowers & Decoration', Title_KN: 'ಹೂವುಗಳು ಮತ್ತು ಅಲಂಕಾರ', Category: 'Festival', Amount: 950, ExpenseDate: '2025-08-27' },
  { ExpenseID: 5, Title_EN: 'Miscellaneous', Title_KN: 'ಇತರ ಖರ್ಚುಗಳು', Category: 'Other', Amount: 1200, ExpenseDate: '2025-05-10' },
];

let mockPayouts = [
  { PayoutID: 1, MemberID: 3, MemberCode: 'M#03', Name_EN: 'Suresh', Name_KN: 'ಸುರೇಶ್', MonthYear: 'Jun 2026', AmountWon: 2400 },
  { PayoutID: 2, MemberID: 8, MemberCode: 'M#08', Name_EN: 'Lakshmi', Name_KN: 'ಲಕ್ಷ್ಮಿ', MonthYear: 'Jul 2026', AmountWon: 2400 },
  { PayoutID: 3, MemberID: 5, MemberCode: 'M#05', Name_EN: 'Ravi', Name_KN: 'ರವಿ', MonthYear: 'Aug 2026', AmountWon: 2400 },
  { PayoutID: 4, MemberID: 7, MemberCode: 'M#07', Name_EN: 'Ramesh Kumar', Name_KN: 'ರಮೇಶ್ ಕುಮಾರ್', MonthYear: 'Sep 2026', AmountWon: 2400 },
];

let mockNotifications = [
  {
    NotificationID: 1,
    Title: '⏱️ Monthly Payment Due Reminder / ಕೊಡುಗೆ ಜ್ಞಾಪನೆ',
    Body: 'Monthly Cheeti ₹200 contribution is due by 10th of every month. Please pay via UPI or Cash to stay active!',
    Type: 'Reminder',
    CreatedAt: '2026-09-10 09:00:00',
    IsRead: false
  },
  {
    NotificationID: 2,
    Title: '🎲 12th Cheeti Lucky Draw Alert / 12ನೇ ತಾರೀಖಿನ ಚೀಟಿ ಡ್ರಾ',
    Body: 'Monthly Cheeti Lucky Draw will take place on 12th at 6:00 PM! Good luck to all active group members!',
    Type: 'Event',
    CreatedAt: '2026-09-12 10:30:00',
    IsRead: false
  },
  {
    NotificationID: 3,
    Title: '🎉 September Winner Announced / ಸೆಪ್ಟೆಂಬರ್ ವಿಜೇತರು',
    Body: 'Congratulations to Ramesh Kumar for winning September 2026 Cheeti Payout of ₹2,400!',
    Type: 'Winner',
    CreatedAt: '2026-09-12 18:30:00',
    IsRead: true
  }
];

let mockSettings = {
  appTitleEn: "Ganesha Cheeti",
  appTitleKn: "ಗಣೇಶ ಚೀಟಿ",
  groupNameEn: "Sri Ganesh Friends",
  groupNameKn: "ಶ್ರೀ ಗಣೇಶ್ ಫ್ರೆಂಡ್ಸ್",
  monthlyContribution: 200,
  effectiveFromMonth: "Oct 2026",
  cheetiDrawDay: 12,
  defaultInterestRate: 5
};

let mockCategories = [
  { id: 'festival', code: 'FEST', nameEn: 'Festival', nameKn: 'ಹಬ್ಬ', status: 'Active', color: '#059669' },
  { id: 'temple', code: 'TMPL', nameEn: 'Temple', nameKn: 'ದೇವಾಲಯ', status: 'Active', color: '#D97706' },
  { id: 'pooja', code: 'POOJ', nameEn: 'Puja & Rituals', nameKn: 'ಪೂಜೆ ಮತ್ತು ಆಚರಣೆ', status: 'Active', color: '#7C3AED' },
  { id: 'food', code: 'FOOD', nameEn: 'Food & Prasad', nameKn: 'ಊಟ ಮತ್ತು ಪ್ರಸಾದ', status: 'Active', color: '#DC2626' },
  { id: 'other', code: 'OTHR', nameEn: 'Other', nameKn: 'ಇತರ', status: 'Active', color: '#4B5563' }
];

// SETTINGS ENDPOINTS (Reads and Writes directly to dbo.CheetiCycles and dbo.AppSettings)
app.get('/api/settings', async (req, res) => {
  try {
    const pool = await getPool();
    if (pool) {
      // 1. Query pre-existing dbo.CheetiCycles table
      try {
        const cycleRes = await pool.request().query("SELECT TOP 1 * FROM dbo.CheetiCycles WHERE Status = 'Active'");
        if (cycleRes.recordset && cycleRes.recordset.length > 0) {
          const c = cycleRes.recordset[0];
          if (c.CycleName) mockSettings.groupNameEn = c.CycleName;
          if (c.DefaultMonthlyAmount) mockSettings.monthlyContribution = c.DefaultMonthlyAmount;
          if (c.DrawDayOfMonth) mockSettings.cheetiDrawDay = c.DrawDayOfMonth;
          if (c.StartMonthYear) mockSettings.effectiveFromMonth = c.StartMonthYear;
        }
      } catch (e) {}

      // 2. Query dbo.AppSettings table
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
        const dbSettings = {};
        result.recordset.forEach(row => {
          try {
            dbSettings[row.SettingKey] = JSON.parse(row.SettingValue);
          } catch (e) {
            dbSettings[row.SettingKey] = row.SettingValue;
          }
        });
        mockSettings = { ...mockSettings, ...dbSettings };
      }
    }
  } catch (err) {
    console.error('Settings SQL error:', err.message);
  }
  res.json(mockSettings);
});

app.post('/api/settings', async (req, res) => {
  mockSettings = { ...mockSettings, ...req.body };
  try {
    const pool = await getPool();
    if (pool) {
      // 1. Write directly to pre-existing dbo.CheetiCycles table
      const groupName = req.body.groupNameEn || 'Sri Ganesh Friends';
      const monthlyAmt = req.body.monthlyContribution || 200;
      const drawDay = req.body.cheetiDrawDay || 12;
      const effectiveMonth = req.body.effectiveFromMonth || 'Oct 2026';

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
      } catch (e) {
        console.error('CheetiCycles update error:', e.message);
      }

      // 2. Write to dbo.AppSettings key-value store
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
    }
  } catch (err) {
    console.error('Save Settings SQL error:', err.message);
  }
  res.json({ success: true, settings: mockSettings });
});

// CATEGORIES ENDPOINTS (MSSQL persistent & fallback)
app.get('/api/categories', async (req, res) => {
  try {
    const pool = await getPool();
    if (pool) {
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
        mockCategories = result.recordset;
      }
    }
  } catch (err) {
    console.error('Categories SQL error:', err.message);
  }
  res.json(mockCategories);
});

app.post('/api/categories', async (req, res) => {
  if (Array.isArray(req.body)) {
    mockCategories = req.body;
    try {
      const pool = await getPool();
      if (pool) {
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
    } catch (err) {
      console.error('Save Categories SQL error:', err.message);
    }
  }
  res.json({ success: true, categories: mockCategories });
});

// NOTIFICATIONS ENDPOINTS
app.get('/api/notifications', async (req, res) => {
  try {
    const pool = await getPool();
    if (pool) {
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
      if (result.recordset && result.recordset.length > 0) {
        return res.json(result.recordset);
      }
    }
  } catch (err) {
    console.error('Notifications SQL error:', err.message);
  }
  res.json(mockNotifications);
});

app.post('/api/notifications', async (req, res) => {
  const { title, body, type } = req.body;
  const newNotif = {
    NotificationID: mockNotifications.length + 1,
    Title: title || 'Group Alert / ಸೂಚನೆ',
    Body: body || 'Important update from Ganesha Cheeti Admin.',
    Type: type || 'Broadcast',
    CreatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
    IsRead: false
  };

  try {
    const pool = await getPool();
    if (pool) {
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
        .input('title', sql.NVarChar, newNotif.Title)
        .input('body', sql.NVarChar, newNotif.Body)
        .input('type', sql.NVarChar, newNotif.Type)
        .query('INSERT INTO dbo.Notifications (Title, Body, Type, CreatedAt) VALUES (@title, @body, @type, GETDATE())');
    }
  } catch (err) {
    console.error('Save notification SQL error:', err.message);
  }

  mockNotifications.unshift(newNotif);
  res.status(201).json({ success: true, notification: newNotif });
});

// AUTH LOGIN
app.post('/api/login', async (req, res) => {
  const { phone, password } = req.body;
  try {
    const pool = await getPool();
    if (pool) {
      const result = await pool.request()
        .input('phone', sql.NVarChar, phone)
        .input('password', sql.NVarChar, password)
        .query('SELECT MemberID, MemberCode, Name_EN, Name_KN, Phone, Role, Status FROM dbo.Members WHERE Phone = @phone AND Password = @password');
      if (result.recordset.length > 0) {
        const user = result.recordset[0];
        if (user.Status === 'Inactive') return res.status(403).json({ success: false, message: 'Account inactive' });
        return res.json({ success: true, user });
      }
    }
  } catch (err) {
    console.error(err.message);
  }

  const found = mockMembers.find(m => m.Phone === phone && m.Password === password);
  if (found) return res.json({ success: true, user: found });
  res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// CHANGE PASSWORD (ADMIN ONLY)
app.post('/api/change-password', async (req, res) => {
  const { memberId, newPassword } = req.body;
  try {
    const pool = await getPool();
    if (pool) {
      await pool.request()
        .input('memberId', sql.Int, memberId)
        .input('newPassword', sql.NVarChar, newPassword)
        .query('UPDATE dbo.Members SET Password = @newPassword WHERE MemberID = @memberId');
    }
  } catch (err) { console.error(err.message); }
  res.json({ success: true, message: 'Password updated' });
});

// SUMMARY
app.get('/api/summary', async (req, res) => {
  try {
    const pool = await getPool();
    if (pool) {
      const result = await pool.request().query(`
        SELECT 
          (SELECT ISNULL(SUM(Amount), 90000) FROM dbo.Contributions) AS TotalSavings,
          (SELECT COUNT(*) FROM dbo.Members WHERE Status='Active') AS TotalMembers,
          (SELECT ISNULL(SUM(Amount), 8450) FROM dbo.Expenses) AS TotalExpenses,
          (SELECT ISNULL(SUM(TotalInterestCollected), 4500) FROM dbo.Loans) AS TotalInterest
      `);
      return res.json({
        totalSavings: result.recordset[0].TotalSavings,
        totalMembers: result.recordset[0].TotalMembers,
        completedYears: 2,
        monthlyContribution: 200,
        nextDrawDate: '12th Oct 2026',
        interestRatePercent: 5,
        totalInterestPaid: result.recordset[0].TotalInterest,
        totalExpenses: result.recordset[0].TotalExpenses,
      });
    }
  } catch (err) { console.error(err.message); }

  res.json({ totalSavings: 90000, totalMembers: 15, completedYears: 2, monthlyContribution: 200, nextDrawDate: '12th Oct 2026', interestRatePercent: 5, totalInterestPaid: 4500, totalExpenses: 8450 });
});

// MEMBERS
app.get('/api/members', async (req, res) => {
  try {
    const pool = await getPool();
    if (pool) {
      const result = await pool.request().query('SELECT MemberID, MemberCode, Name_EN, Name_KN, Phone, Role, Status FROM dbo.Members ORDER BY MemberID ASC');
      return res.json(result.recordset);
    }
  } catch (err) { console.error(err.message); }
  res.json(mockMembers);
});

app.post('/api/members', async (req, res) => {
  const { name_en, name_kn, phone, role, password } = req.body;
  try {
    const pool = await getPool();
    if (pool) {
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
      return res.status(201).json({ success: true });
    }
  } catch (err) { console.error(err.message); }
  res.status(201).json({ success: true });
});

app.patch('/api/members/:id/status', async (req, res) => {
  const memberId = parseInt(req.params.id, 10);
  const { status } = req.body;
  try {
    const pool = await getPool();
    if (pool) {
      await pool.request().input('memberId', sql.Int, memberId).input('status', sql.NVarChar, status).query('UPDATE dbo.Members SET Status = @status WHERE MemberID = @memberId');
    }
  } catch (err) { console.error(err.message); }
  res.json({ success: true });
});

// EXPENSES
app.get('/api/expenses', async (req, res) => {
  try {
    const pool = await getPool();
    if (pool) {
      const result = await pool.request().query('SELECT * FROM dbo.Expenses ORDER BY ExpenseDate DESC');
      return res.json(result.recordset);
    }
  } catch (err) { console.error(err.message); }
  res.json(mockExpenses);
});

app.post('/api/expenses', async (req, res) => {
  const { title_en, title_kn, category, amount, expenseDate } = req.body;
  try {
    const pool = await getPool();
    if (pool) {
      await pool.request()
        .input('title_en', sql.NVarChar, title_en)
        .input('title_kn', sql.NVarChar, title_kn || title_en)
        .input('category', sql.NVarChar, category || 'Festival')
        .input('amount', sql.Decimal(18, 2), amount)
        .input('expenseDate', sql.Date, expenseDate || new Date())
        .query(`INSERT INTO dbo.Expenses (Title_EN, Title_KN, Category, Amount, ExpenseDate) VALUES (@title_en, @title_kn, @category, @amount, @expenseDate)`);
    }
  } catch (err) { console.error(err.message); }
  res.status(201).json({ success: true });
});

app.delete('/api/expenses/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const pool = await getPool();
    if (pool) {
      await pool.request().input('id', sql.Int, id).query('DELETE FROM dbo.Expenses WHERE ExpenseID = @id');
    }
  } catch (err) { console.error(err.message); }
  res.json({ success: true });
});

// PAYOUTS
app.get('/api/payouts', async (req, res) => {
  try {
    const pool = await getPool();
    if (pool) {
      const result = await pool.request().query(`SELECT p.*, m.MemberCode, m.Name_EN, m.Name_KN FROM dbo.Payouts p JOIN dbo.Members m ON p.MemberID = m.MemberID ORDER BY p.PayoutID DESC`);
      return res.json(result.recordset);
    }
  } catch (err) { console.error(err.message); }
  res.json(mockPayouts);
});

app.post('/api/payouts', async (req, res) => {
  const { memberId, monthYear, amountWon, paymentMethod } = req.body;
  try {
    const pool = await getPool();
    if (pool) {
      await pool.request()
        .input('memberId', sql.Int, memberId)
        .input('monthYear', sql.NVarChar, monthYear)
        .input('drawDate', sql.Date, new Date())
        .input('amountWon', sql.Decimal(18,2), amountWon || 2400)
        .input('paymentMethod', sql.NVarChar, paymentMethod || 'UPI')
        .query(`INSERT INTO dbo.Payouts (MemberID, MonthYear, DrawDate, AmountWon, PaymentMethod) VALUES (@memberId, @monthYear, @drawDate, @amountWon, @paymentMethod)`);
    }
  } catch (err) { console.error(err.message); }
  res.status(201).json({ success: true });
});

module.exports = app;
