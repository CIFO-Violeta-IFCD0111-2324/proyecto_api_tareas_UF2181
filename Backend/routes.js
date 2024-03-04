const express = require("express");
const router = express.Router();

const conexionMySQL = require('./conexionMySQL.js');


router.get("/saludo", (req, res) => {
  res.json({
      "saludo": "hola cliente"
  });

});

router.post("/insertar", (req, res) => {
  const titulo = req.body.titulo;
  const descripcion = req.body.descripcion;
  const fechainicio = req.body.fechainicio;
  const fechafinal = req.body.fechafinal;

  const sql = `insert into tabla values (default, "${titulo}","${descripcion}"  ,"${fechainicio}","${fechafinal}" )`;
  conexionMySQL.query(sql, err => {
    if (err) {
        res.json({
            "status": 500,
            "mensaje": "error1 de servidor mysql" + err
        })
    }

    else {
        res.json({
            "status": 200,
            "mensaje": "dato insertado correctamente"
        });
      }
  })
});

router.get("/leer", (req, res) => {
  const sql = "select * from tabla";
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