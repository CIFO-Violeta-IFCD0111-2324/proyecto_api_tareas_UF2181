const express = require('express');
const router = express.Router();

const conexionMySQL = require('./conexion_mysql.js');
// CREAR
router.post("/crear", (req, res) => {
  let nombre_tarea = req.body.nombre_tarea;
  let fecha_inicio = req.body.fecha_inicio;
  let fecha_fin = req.body.fecha_fin;
  let descripcion = req.body.descripcion;

  const sql = "insert into tareas values (default, ?, ?, ?, ?)";
  conexionMySQL.query(sql, [nombre_tarea, fecha_inicio, fecha_fin, descripcion], error => {
    if (error) {
      res.json({
        "status": 500,
        "mensaje": "Error del servidor. Error:" + error
      });
    } else {
      res.json({
        "status": 200,
        "mensaje": "Tarea creada exitosamente"
      });
    }
  });
});

//LEER 
router.get("/leer", (req, res) => {
  const sql = "select * from tareas;";
  conexionMySQL.query(sql, (error, resultado) => {
    if (error) {
      res.json({
        "status": 500,
        "mensaje": "Error en la lectura de los datos. Error" + error
      });
    } else {
      res.json({
        "status": 200,
        "resultado": resultado
      });
    }
  });
});

//BORRAR

router.delete("/borrar", (req, res) => {
  const dato = req.body.tareas;
  const sql = "delete from tareas where id = ?";
  conexionMySQL.query(sql, [nombre_tarea, fecha_inicio, fecha_fin, descripcion], error => {
    if (error) {
      res.json({
        "status": 500,
        "mensaje": "<span class='error'>Error en el borrado del dato. Error:" + error + "</span>"
      });
    } else {
      res.json({
        "status": 200,
        "mensaje": "<span class='correcto'>Dato borrado correctamente! <i class='fas fa-spinner fa-spin'></i></span>"
      });
    }
  });
});

module.exports = router;