const mysql = require('mysql');

const conexionMySQL = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'proyecto_tarea_PIJ',
});

conexionMySQL.connect(err => {
  if (err) {
    console.log('Error en la conexión MySQL:', err);
  }
  console.log('Base de datos MySQL conectada!');
});

module.exports = conexionMySQL;