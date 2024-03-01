
const mysql = require('mysql');

const conexionMySQL = mysql.createConnection({
  "host": "localhost",
  "user": "root",
  "password": "",
  "database": "basedatos"
});
conexionMySQL.connect(err => {
  if (err) {
    console.log('Base de datos MySQL incorrecta!')
  }else{
    console.log('Base de datos MySQL conectada!')
  }});

  
module.exports = conexionMySQL;