const express = require("express");

const router = express.Router();

const conexionMySQL = require('./conexionMySQL.js');

router.get("/saludo", (req, res) => {
  res.json({
    "saludo": "Hola!"
  });
});


router.post("/crearTarea", (req, res) => {
  const Descripcion = req.body.Descripcion;
  const FechaInicio = req.body.FechaInicio;
  const Fechafinal = req.body.Fechafinal;
  const Estado = req.body.Estado;

  const query = "insert into proyecto_tarea_PIJ values (default, '" + Descripcion + "', '" + FechaInicio + "',  '" + Fechafinal + "', '" + Estado + "' );";

  conexionMySQL.query(query, err => {
        if (err) {
          res.json('Error en la insercion de datos: ' + err);
        } else {
          res.json('Tarea insertada correctamente!');
        }
      });
    });

/*router.get("/leerTarea", (req, res) => {
 
});

router.put("/actualizarTarea", (req, res) => {
 
});

router.delete("/borrarTarea", (req, res) => {
 
});

*/

////*******Esta línea siempre al final para recoger todo lo ejecutado antes en el mismo archivo ********** */

module.exports = router;
