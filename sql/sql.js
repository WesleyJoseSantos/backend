const mysql = require('mysql2');
const env = require('../env_prod.js');

const db = mysql.createConnection({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_DATABASE
});

module.exports = db