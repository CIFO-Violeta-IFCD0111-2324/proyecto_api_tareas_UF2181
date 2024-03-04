const express = require('express');
const router = express.Router();

const conexionMySQL = require('./conexion_mysql.js');
// CREAR
router.post("/crear", (req, res) => {
    const dato = req.body.tareas;
    const sql = "insert into tareas values (default, ?, ?, ?)";
    conexionMySQL.query(sql, [tareas], error => {
        if (error) {
            res.json({
                "status": 500,
                "mensaje": "Error en la inserción del dato. Error:" + error
            });
        } else {
            res.json({
                "status": 200,
                "mensaje": "dato insertado croquetamente!"
            });
        }
    });
});

//LEER 

//PARA HACER

module.exports = router;