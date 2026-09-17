const sql = require('mssql');
require('dotenv').config();

const config = {
  user: process.env.DB_USER || 'db68614',
  password: process.env.DB_PASSWORD || 'Wi3#?Mk7x2N=',
  server: process.env.DB_SERVER || 'db68614.public.databaseasp.net',
  database: process.env.DB_NAME || 'db68614',
  port: parseInt(process.env.DB_PORT, 10) || 1433,
  connectionTimeout: 15000,
  requestTimeout: 15000,
  options: {
    encrypt: true,
    trustServerCertificate: true,
    enableArithAbort: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

let pool = null;

async function getPool() {
  try {
    if (pool && pool.connected) {
      return pool;
    }
    if (pool) {
      try {
        await pool.close();
      } catch (e) {}
      pool = null;
    }
    pool = await new sql.ConnectionPool(config).connect();
    console.log('✅ Connected to MSSQL Database:', config.database);
    return pool;
  } catch (err) {
    console.error('❌ MSSQL Connection Error:', err.message);
    pool = null;
    return null;
  }
}

module.exports = {
  sql,
  getPool,
};
