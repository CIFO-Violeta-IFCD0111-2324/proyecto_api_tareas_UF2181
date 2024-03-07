const mysql = require('mysql');
const util = require("util"); 

const conexionMySQL = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'datos',
});

// promise wrapper to enable async await with MYSQL
conexionMySQL.query = util.promisify(conexionMySQL.query).bind(conexionMySQL);

conexionMySQL.connect(err => {
  if (err) {
    console.log('Error en la conexión MySQL:', err);
  }
  console.log('Base de datos MySQL conectada!');
});

module.exports = conexionMySQL;