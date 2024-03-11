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
  const portada = req.body.portada;


  const sql = `insert into tabla values (default, "${titulo}","${descripcion}" ,"${portada}","${fechainicio}","${fechafinal}" )`;
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

router.delete("/borrar", (req, res) => {
  const idTarea = req.body.id;
  const sql = "delete from tabla where id=?";
  conexionMySQL.query(sql, [idTarea], error => {
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
router.put("/editar", (req, res) => {
  const idTarea = req.body.id;
  const tituloTarea = req.body.titulo;
  const sql = "update tabla set titulo=? where id=?";
  conexionMySQL.query(sql, [tituloTarea,idTarea], error => {
    if (error) {
      res.json({
        "status": 500,
        "mensaje": "<span class='error'>Error en el editado del dato. Error:" + error + "</span>"
      });
    } else {
      res.json({
        "status": 200,
        "mensaje": "<span class='correcto'>Dato editado correctamente! <i class='fas fa-spinner fa-spin'></i></span>"
      });
    }
  });
});

  module.exports = router;