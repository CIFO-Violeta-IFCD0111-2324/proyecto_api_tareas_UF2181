const express = require('express');
const router = express.Router();

const conexionMySQL = require('./conexionMySQL.js');

router.get("/saludo", (req, res) => {
  res.json({
    "saludo": "Hola!"
  });
});

router.post("/tarea", (req, res) => {
 
});


module.exports = router;