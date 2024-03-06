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
        "mensaje": "<span class='error'>Error en la inserción del dato.  Error:" + error + "</span>"
      });
    } else {
      res.json({
        "status": 200,
        "mensaje": "<span class='correcto'>Dato insertado correctamente! <i class='fas fa-spinner fa-spin'></i></span>"
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
        "mensaje": "<span class='error'>Error en la lectura de los dato. Error:" + error + "</span>"
      });
    } else {
      res.json({
        "status": 200,
        "resultado": resultado
      });
    }
  });
});

// BORRAR
router.delete("/borrar", (req, res) => {
  const dato = req.body.dato;
  const sql = "delete from dato where id=?";
  conexionMySQL.query(sql, [dato], error => {
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