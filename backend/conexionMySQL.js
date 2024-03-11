
const mysql = require('mysql');
const util = require("util"); 

// const conexionMySQL = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'task_db',
//   timezone: 'utc',
// });


// railway deploy
const conexionMySQL = mysql.createConnection({
  host: 'monorail.proxy.rlwy.net',
  user: 'root',
  password: 'UdyWGZykRMUrUXcqMMiobZjXHHYpWIjG',
  database: 'railway',
  port: 56903,
  timezone: 'utc',
});


// promise wrapper to enable async await with MYSQL
conexionMySQL.query = util.promisify(conexionMySQL.query).bind(conexionMySQL);

conexionMySQL.connect(err => {
  if (err) {
    console.log('Error en la conexión MySQL:', err);
  }
  console.log('Conexion establecida con MYSQL');
});

module.exports = conexionMySQL;