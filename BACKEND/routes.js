const express = require("express");

const router = express.Router();

const conexionMySQL = require('./conexionMySQL.js');

router.get("/saludo", (req, res) => {
  res.json({
    "saludo": "Hola!"
  });
});

router.post("/tarea", (req, res) => {
 
});

////*******Esta línea siempre al final para recoger todo lo ejecutado antes en el mismo archivo ********** */

module.exports = router;
