// require librerias
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const api = express();

// configuracion
api.use(cors());
api.use(express.json());

// rutas
api.post("/insertar", (req, res) => {
  const tarea = req.body;

  const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "task_db",
  });

  conexion.connect((err) => {
    if (err) {
      res.json("Error en la conexion MySQL: " + err);
    } else {

      const query = 'insert into tasks values (default,?,?,?,?)';
      conexion.query(query, [tarea.nombre,tarea.descripcion,tarea.fecha_inicio,tarea.fecha_fin],  (err) => {
        if (err) {
          res.json("Error en la insercion de la tarea: " + err);
        } else {
          res.json("Tarea insertada correctamente!");
        }
      });
    }
  });
});

// arrancar server
api.listen(3000, () => {
  console.log("Servidor OK!!!");
});
