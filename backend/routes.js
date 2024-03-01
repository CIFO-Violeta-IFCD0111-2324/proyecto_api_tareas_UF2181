const express = require('express');
const router = express.Router();

const conexionMySQL = require('./conexion_mysql.js');

router.get("saludo", (req,res) => {
    res.json({
        "Despedida": "Adios"
    });
});

router.post("/tarea",  (req,res) => {

});

module.exports = router;