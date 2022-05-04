require('dotenv').config()
const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATA_BASE
})

pool.getConnection((err, connection) => {
    if(err)
        console.error("Error connection to MySQL")

    if(connection)
        console.log("Connected to MySQL")
})

module.exports = pool;
