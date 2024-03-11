// require librerias
const express = require("express");
const cors = require("cors");
const api = express();
const port = 3000;

// Swagger setup
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


// // importar routes:
api.use("/api", require("./routes/routes"));


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
      url: 'http://localhost:3000/api',
      description: 'Servidor Local de desarrollo',
    },
  ],
};

const options = {
  swaggerDefinition,
  // path hacia todas las rutas
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

// configuracion de la api
api.use(cors()); 
api.use(express.json());
api.use(swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// arrancar server
api.listen(port, () => {
  console.log("Servidor OK! listening to port: " + port);
});
