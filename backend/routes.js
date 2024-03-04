const express = require('express');
const router = express.Router();

const conexionMySQL = require('./conexionMySQL.js');
// CREAR
router.post("/crear", (req, res) => {
  const dato = req.body.dato;
  const sql = "insert into dato values (default, ?)";
  conexionMySQL.query(sql, [dato], error => {
    if (error) {
      res.json({
        "status": 500,
        "mensaje": "Error en la inserción del dato. Error:" + error
      });
    } else {
      res.json({
        "status": 200,
        "mensaje": "Dato insertado correctamente!"
      });
    }
  });
});
// LEER
router.get("/leer", (req, res) => {
  const sql = "select * from dato";
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


module.exports = router;