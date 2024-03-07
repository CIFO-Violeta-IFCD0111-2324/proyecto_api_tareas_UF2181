const mysql = require('mysql2');
const util = require("util"); 

// const conexionMySQL = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'datos',
// });

// railway

const conexionMySQL = mysql.createPool({
  host: 'monorail.proxy.rlwy.net',
  user: 'root',
  password: 'F5aFEHgECaHGeFB4Hd3Ag5C64b6g625C',
  database: 'railway',
});

// promise wrapper to enable async await with MYSQL
conexionMySQL.query = util.promisify(conexionMySQL.query).bind(conexionMySQL);

// conexionMySQL.connect(err => {
//   if (err) {
//     console.log('Error en la conexión MySQL:', err);
//   }
//   console.log('Base de datos MySQL conectada!');
// });

module.exports = conexionMySQL;