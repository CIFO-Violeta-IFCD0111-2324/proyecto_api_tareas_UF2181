
const mysql = require("mysql");

const conexion = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "task_db",
      });


module.exports = conexion;




