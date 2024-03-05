const express = require("express");

const router = express.Router();

const conexionMySQL = require('./conexionMySQL.js');

router.get("/saludo", (req, res) => {
  res.json({
    "saludo": "Hola!"
  });
});

// CREAR, Crud
router.post("/crearTarea", (req, res) => {
  const Descripcion = req.body.Descripcion;
  const FechaInicio = req.body.FechaInicio;
  const Fechafinal = req.body.Fechafinal;
  const Estado = req.body.Estado;

  const sql = "insert into tareas values (default, ?, ?, ?, ? );";
  conexionMySQL.query(sql, [Descripcion, FechaInicio,  Fechafinal, Estado], err => {
    if (err) {
      res.json({
        "status": 500,
        "mensaje": "Error en la inserción del dato. Error:" + err
      });
    } else {
      res.json({
        "status": 200,
        "mensaje": "Dato insertado correctamente!"
      });
    }
  });
});


// LEER, cRud
router.get("/leer", (req, res) => {
  const sql = "select * from tareas";
  conexionMySQL.query(sql, (error, resultado) => {
    if (error) {
      res.json({
        "status": 500,
        "mensaje": "Error en la inserción del dato. Error:" + error
      });
    } else {
      res.json({
        "status": 200,
        "resultado": resultado
      });
    }
  });
});


/*

router.put("/actualizarTarea", (req, res) => {
 
});

router.delete("/borrarTarea", (req, res) => {
 
});

*/

////*******Esta línea siempre al final para recoger todo lo ejecutado antes en el mismo archivo ********** */

module.exports = router;
