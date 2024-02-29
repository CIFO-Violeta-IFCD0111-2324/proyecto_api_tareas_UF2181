const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const api = express();
const port = 3001;

api.use(express.json());
api.use(cors());

api.get("/saludo", (req, res) => {
    res.json({
        "saludo": "hola cliente"
    });

});
api.post("/insertar", (req, res) => {
    const titulo = req.body.titulo;
    const descripcion = req.body.descripcion;
    const fechainicio = req.body.fechainicio;
    const fechafinal = req.body.fechafinal;

    const conexion = mysql.createConnection({
        "host": "localhost",
        "user": "root",
        "password": "",
        "database": "basedatos"
    });
    conexion.connect(err => {
        if (err) {
            res.json({
                "status": 500,
                "mensaje": "error1 de servidor my SQL"
            })
        }
        else {
            const sql = `insert into tabla values (default, "${titulo}","${descripcion}"  ,"${fechainicio}","${fechafinal}" )`;
            conexion.query(sql, err => {
                if (err) {
                    res.json({
                        "status": 500,
                        "mensaje": "error2 de servidor mysql" + err
                    })
                }

                else {
                    res.json({
                        "status": 200,
                        "mensaje": "dato insertado correctamente"
                    });
                }
            })
        }
    })

});


api.listen(port, () => {
    console.log("servidor levantado por el puerto " + port);
})