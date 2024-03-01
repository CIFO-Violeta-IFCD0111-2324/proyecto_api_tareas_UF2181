
const express = require("express");
const router = express.Router();
const cors = require("cors");

//Importar conexion DB:
const conexionDB = require("../connectionDB")


// Utilidades
router.use(cors());
router.use(express.json());


// Rutas

/**
 * @swagger
 * /insertar:
 *   post:
 *     summary: Insertar una tarea en la base de datos.
 *     description: A traves de nuestra api insertar en la tabla tasks una tarea.
 *     parameters:
 *       - in: body
 *         name: nombre
 *         required: true
 *         description: "Nombre de la tarea que desea insertar en la base de datos"
 *         schema:
 *           type: string
 *           example: completar proyecto
 *       - name: descripcion
 *         in: body
 *         required: true
 *         description: "Descripcion de la tarea a introducir"
 *         schema:
 *           type: string
 *           example: Usar JavaScript y Mysql para completar el proyecto
 *       - name: fecha_inicio
 *         in: body
 *         required: true
 *         description: Fecha de inicio de la tarea
 *         schema:
 *           type: string
 *           format: date
 *           example: 2024-01-01
 *       - name: fecha_fin
 *         in: body
 *         required: true
 *         description: Fecha de finalizacion de la tarea
 *         schema:
 *           type: string
 *           format: date
 *           example: 2024-01-01
 *     responses:
 *       200:
 *         description: Tarea introducida correctamente 
 *       400:
 *         description: Error de ruta         
 */
router.get("/hola", (req, res) => {
    res.json({
        "saludo": "hola",
    });
});


router.post("/insertar", (req, res) => {
  const tarea = req.body;

  conexionDB.connect((err) => {
    if (err) {
      res.status(500).json("Error en la conexion MySQL: " + err);
    } else {

      const query = 'nsert into tasks values (default,?,?,?,?)';
      conexionDB.query(query, [tarea.nombre,tarea.descripcion,tarea.fecha_inicio,tarea.fecha_fin],  (err) => {
        if (err) {
          res.status(400).json("Error en la insercion de la tarea: " + err);
        } else {
          res.status(200).json("Tarea insertada correctamente!");
        }
      });
    }
  });
});



module.exports = router;