const express = require('express');
const router = express.Router();

const conexionMySQL = require('./conexion_mysql.js');
// CREAR
router.post("/crear", (req, res) => {
  const nombre_tarea = req.body.nombre_tarea;
  const fecha_inicio = req.body.fecha_inicio;
  const fecha_fin = req.body.fecha_fin;
  const descripcion = req.body.descripcion;

  const sql = "insert into tareas values (?, ?, ?, ?)";
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
        "mensaje": "Error en la inserción del dato. Error" + error
      });
    } else {
      res.json({
        "status": 200,
        "resultado": resultado
      });
    }
  });
});




module.exports = router;