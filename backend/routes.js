
const express = require("express");
const router = express.Router();

//Importar conexion DB:
const conexionDB = require("./connectionDB")


// Rutas

router.get("/hola", (req, res) => {
    res.json({
        "saludo": "hola",
    });
});


router.post("/insertar", (req, res) => {
  const tarea = req.body;

  conexionDB.connect((err) => {
    if (err) {
      res.json("Error en la conexion MySQL: " + err);
    } else {

      const query = 'insert into tasks values (default,?,?,?,?)';
      conexionDB.query(query, [tarea.nombre,tarea.descripcion,tarea.fecha_inicio,tarea.fecha_fin],  (err) => {
        if (err) {
          res.json("Error en la insercion de la tarea: " + err);
        } else {
          res.json("Tarea insertada correctamente!");
        }
      });
    }
  });
});



module.exports = router;