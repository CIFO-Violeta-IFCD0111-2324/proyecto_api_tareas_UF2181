// DEPLOY: Desinstalar paquete mysql e instalar mysql2
// Cambiar datos conexión
// MySQL2!!!!!
const mysql = require('mysql2');
const util = require("util"); 

// const conexionMySQL = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'datos',
// });

// railway
const conexionMySQL = mysql.createConnection({
  host: 'roundhouse.proxy.rlwy.net',
  user: 'root',
  password: 'YYBGncDzztfVvHGmSKWKLpccIZkpwAZR',
  database: 'railway',
  port: 58285
});

// DEPLOY:
// promise wrapper to enable async await with MYSQL
conexionMySQL.query = util.promisify(conexionMySQL.query).bind(conexionMySQL);

conexionMySQL.connect(err => {
  if (err) {
    console.log('Error en la conexión MySQL:', err);
  }
  console.log('Base de datos MySQL conectada!');
});

module.exports = conexionMySQL;