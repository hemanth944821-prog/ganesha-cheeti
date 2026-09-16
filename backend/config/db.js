const sql = require('mssql');
require('dotenv').config();

const config = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'YourPassword123!',
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_NAME || 'GaneshaCheetiDB',
  port: parseInt(process.env.DB_PORT, 10) || 1433,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
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
