const fs = require('fs');
const path = require('path');
const { getPool, sql } = require('./config/db');

async function initializeDatabase() {
  console.log('🔄 Connecting to live MSSQL server: db68614.public.databaseasp.net ...');
  
  const pool = await getPool();
  if (!pool) {
    console.error('❌ Failed to connect to MSSQL Database. Please check network/credentials.');
    process.exit(1);
  }

  try {
    console.log('⚡ Dropping existing tables if present...');
    await pool.request().query(`
      IF OBJECT_ID('dbo.Contributions', 'U') IS NOT NULL DROP TABLE dbo.Contributions;
      IF OBJECT_ID('dbo.Payouts', 'U') IS NOT NULL DROP TABLE dbo.Payouts;
      IF OBJECT_ID('dbo.Expenses', 'U') IS NOT NULL DROP TABLE dbo.Expenses;
      IF OBJECT_ID('dbo.Loans', 'U') IS NOT NULL DROP TABLE dbo.Loans;
      IF OBJECT_ID('dbo.CheetiCycles', 'U') IS NOT NULL DROP TABLE dbo.CheetiCycles;
      IF OBJECT_ID('dbo.Members', 'U') IS NOT NULL DROP TABLE dbo.Members;
    `);

    const sqlFilePath = path.join(__dirname, 'db', 'schema_hosted.sql');
    const sqlScript = fs.readFileSync(sqlFilePath, 'utf8');

    const statements = sqlScript
      .split(/\nGO\b/i)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    for (const statement of statements) {
      console.log('⚡ Executing batch...');
      await pool.request().query(statement);
    }
    console.log('🎉 LIVE MSSQL DATABASE SEEDED & INITIALIZED SUCCESSFULLY WITH PASSWORDS!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Database Initialization Error:', err.message);
    process.exit(1);
  }
}

initializeDatabase();
