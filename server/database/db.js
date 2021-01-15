const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "27456520recon",
    database: "new_db",
    host: "localhost",
    port: 5432
});
module.exports = pool;