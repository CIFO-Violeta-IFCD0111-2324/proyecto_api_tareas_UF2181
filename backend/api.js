// require librerias
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const api = express();

// Swagger setup
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


// // importar routes:
api.use("/api", require("./routes"));


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Administrador de Tareas',
    version: '1.0.0',
    description:
      'Administrador de tareas general. Almacenaje de tareas a traves de una api hacia una base de datos SQL',
    contact: {
      name: 'CIFO violeta',
      url: 'https://github.com/CIFO-Violeta-IFCD0111-2324',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

// configuracion
api.use(cors());
api.use(express.json());
api.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



// rutas
// api.post("/insertar", (req, res) => {
//   const tarea = req.body;
//   const conexion = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "task_db",
//   });

//   conexion.connect((err) => {
//     if (err) {
//       res.json("Error en la conexion MySQL: " + err);
//     } else {

//       const query = 'insert into tasks values (default,?,?,?,?)';
//       conexion.query(query, [tarea.nombre,tarea.descripcion,tarea.fecha_inicio,tarea.fecha_fin],  (err) => {
//         if (err) {
//           res.json("Error en la insercion de la tarea: " + err);
//         } else {
//           res.json("Tarea insertada correctamente!");
//         }
//       });
//     }
//   });
// });

// arrancar server
api.listen(3000, () => {
  console.log("Servidor OK!!!");
});
