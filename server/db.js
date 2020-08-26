const Pool = require('pg').Pool;

var pool = new Pool({
    user: "postgres",
    password: "Le980104",
    host: "localhost",
    port: 5432,
    database: "todolist"
})

module.exports = pool;