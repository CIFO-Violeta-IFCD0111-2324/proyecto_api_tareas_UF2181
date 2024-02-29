const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const api = express();

api.use(cors());
api.use(express.json());

api.post("/insertar", (req, res) => {
    const conexion = mysql.createConnection({
        "host": "localhost",
        "user": "root",
        "password": "",
        "database": "tareas"
    })

    conexion.connect(err => {
        if (err) {
            res.json({
                "status": 500,
                "mensaje": "Error del Servidor de MySql"
            })
        }
        conexion.query("insert into values (default, '" + input.value + "')", err => {
            if (err) {
                req.json({
                    "status": 500,
                    "mensaje": "Error del servidor de MySQL."
                });
            } else {
                res.json({
                    "status": 200,
                    "mensaje": "Dato insertado correctamente."
                });
            }
        });
    });
});


api.listen(333,() => {
    console.log("servidor ejecuntándose por el puerto 3333.")
});




