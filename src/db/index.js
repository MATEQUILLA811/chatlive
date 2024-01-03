/**
 * TODO: DATABASE OF MYSQL CONFIGURATIONS
 */
const mysql = require("mysql")

const conexion = mysql.createConnection({
    host:"bwv4fhypidq2k0kx3cls-mysql.services.clever-cloud.com",
    database:"bwv4fhypidq2k0kx3cls",
    user:"u0sz96zvixikzm71",
    password:"m0x6iPmMmAnCHhDrhOFK"
})

module.exports = conexion;