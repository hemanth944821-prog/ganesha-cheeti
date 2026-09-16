const { getPool } = require('./config/db');

async function migrate() {
  console.log('🔄 Running auto-migrations for MSSQL database...');
  const pool = await getPool();
  if (!pool) {
    console.error('❌ Could not connect to DB');
    process.exit(1);
  }

  try {
    // 1. Add TransactionRef to dbo.Contributions if missing
    await pool.request().query(`
      IF OBJECT_ID('dbo.Contributions', 'U') IS NOT NULL
      BEGIN
        IF NOT EXISTS (
          SELECT * FROM INFORMATION_SCHEMA.COLUMNS 
          WHERE TABLE_NAME = 'Contributions' AND COLUMN_NAME = 'TransactionRef'
        )
        BEGIN
          ALTER TABLE dbo.Contributions ADD TransactionRef NVARCHAR(250) NULL;
        END
      END
    `);
    console.log('✅ dbo.Contributions checked/updated');

    // 2. Ensure dbo.ExpenseCategories exists
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
    console.log('✅ dbo.ExpenseCategories checked/created');

    // 3. Ensure dbo.AppSettings exists
    await pool.request().query(`
      IF OBJECT_ID('dbo.AppSettings', 'U') IS NULL
      BEGIN
          CREATE TABLE dbo.AppSettings (
              SettingKey NVARCHAR(100) PRIMARY KEY,
              SettingValue NVARCHAR(MAX) NOT NULL
          );
      END
    `);
    console.log('✅ dbo.AppSettings checked/created');

    // 4. Ensure dbo.Notifications exists
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
    console.log('✅ dbo.Notifications checked/created');

    console.log('🎉 ALL AUTO-MIGRATIONS COMPLETED SUCCESSFULLY!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Migration Error:', err.message);
    process.exit(1);
  }
}

migrate();
