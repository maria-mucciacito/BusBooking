const Pool = require('pg').Pool;
require('dotenv').config()

let credentials = {
    user: process.env.UTENTE,
    host: process.env.HOSTNAME,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
};

let pool = new Pool(credentials);

//module.exports = pool;
module.exports = {
    getPool: function () {
      if (pool) return pool; // if it is already there, grab it here
      pool = new pg.Pool(credentials);
      return pool;
    }
}