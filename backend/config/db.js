const sql = require('mssql');
require('dotenv').config();

const config = {
  user: process.env.DB_USER || 'db68614',
  password: process.env.DB_PASSWORD || 'Wi3#?Mk7x2N=',
  server: process.env.DB_SERVER || 'db68614.public.databaseasp.net',
  database: process.env.DB_NAME || 'db68614',
  port: parseInt(process.env.DB_PORT, 10) || 1433,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

let poolPromise = null;

async function getPool() {
  if (!poolPromise) {
    poolPromise = new sql.ConnectionPool(config)
      .connect()
      .then((pool) => {
        console.log('✅ Connected to MSSQL Database:', config.database);
        return pool;
      })
      .catch((err) => {
        console.warn('⚠️ MSSQL Connection Warning:', err.message);
        console.warn('Backend will default to mock data fallback if SQL Server is not reachable.');
        poolPromise = null;
        return null;
      });
  }
  return poolPromise;
}

module.exports = {
  sql,
  getPool,
};
