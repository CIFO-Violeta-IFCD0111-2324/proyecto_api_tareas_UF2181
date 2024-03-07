
const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const cors = require("cors");


// Utilidades
router.use(cors());
router.use(express.json());


// Rutas

/**
 * @swagger
 * /insert:
 *   post:
 *     summary: Insertar una tarea en la base de datos.
 *     description: A través de nuestra API, insertar una tarea en la tabla de tareas.
 *     parameters:
 *       - in: body
 *         name: nombre
 *         required: true
 *         description: Nombre de la tarea que desea insertar en la base de datos.
 *         schema:
 *           type: string
 *           example: completar proyecto
 *       - in: body
 *         name: descripcion
 *         required: true
 *         description: Descripción de la tarea a introducir.
 *         schema:
 *           type: string
 *           example: Usar JavaScript y MySQL para completar el proyecto.
 *       - in: body
 *         name: fecha_inicio
 *         required: true
 *         description: Fecha de inicio de la tarea en formato YYYY-MM-DD.
 *         schema:
 *           type: string
 *           format: date
 *           example: 2024-01-01
 *       - in: body
 *         name: fecha_fin
 *         required: true
 *         description: Fecha de finalización de la tarea en formato YYYY-MM-DD.
 *         schema:
 *           type: string
 *           format: date
 *           example: 2024-01-01
 *     responses:
 *       200:
 *         description: Tarea introducida correctamente.
 *       400:
 *         description: Error de ruta.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error.
 *       500:
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error.
 */
router.post("/insert", (req, res) => {
  //Importar conexion DB:
  const conexionDB = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "task_db",
  });

  const tarea = req.body;
  conexionDB.connect((err) => {
    if (err) {
      res.status(500).json("Error en la conexion MySQL: " + err);
    } else {

      const query = 'insert into tasks values (default,?,?,?,?)';
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

/**
 * @swagger
 * /read:
 *   get:
 *     summary: Leer las tareas insertadas
 *     description: Leer las tareas insertadas a través de nuestra API.
 *     responses:
 *       200:
 *         description: Lectura correcta
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la tarea
 *                   nombre:
 *                     type: string
 *                     description: Nombre de la tarea
 *                   descripcion:
 *                     type: string
 *                     description: Descripción de la tarea
 *                   fecha_inicio:
 *                     type: string
 *                     format: date
 *                     description: Fecha de inicio de la tarea
 *                   fecha_fin:
 *                     type: string
 *                     format: date
 *                     description: Fecha de finalización de la tarea
 *       400:
 *         description: Error de query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 */
router.get("/read", (req, res) => {
  const conexionDB = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "task_db",
  });

  const query = "select * from tasks";
  conexionDB.query(query, (error, result) => {
    if (error) {
      res.status(400).json({
        "mensaje": "Error en la query. Error: " + error,
      });
    } else {
      res.status(200).json({
        "resultado": result,
      });
    }
  });
});


/**
 * @swagger
 * /delete:
 *   delete:
 *     summary: Eliminar una tarea
 *     description: Eliminar una tarea de la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID de la tarea a eliminar
 *                 example: 1
 *     responses:
 *       200:
 *         description: Tarea eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje de éxito
 *       400:
 *         description: Error en el proceso de eliminación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   description: Mensaje de error
 */
router.delete("/delete", (req, res) => {
  const dato = req.body.id;
  const query = "delete from tasks where id=?;"
  const conexionDB = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "task_db",
  });

  conexionDB.query(query, [dato], error => {
    if(error) {
      res.status(400).json({
        "mensaje": "Error en el borrado del dato" + error
      });
    } else {
      res.status(200).json({
        "mensaje": "<span class='correcto'>Dato borrado correctamente! <i class='fas fa-spinner fa-spin'></i></span>"
      });
    }
  })
});








module.exports = router;