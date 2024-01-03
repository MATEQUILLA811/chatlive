/**
 * TODO: DATABASE OF MYSQL CONFIGURATIONS
 */
const mysql =  require("mysql");
const conexion = mysql.createConnection({
    host: process.env.HOST,
    port: 3306,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
});

module.exports = conexion;