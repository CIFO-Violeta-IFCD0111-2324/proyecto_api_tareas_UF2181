const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Administrador de tareas',
      version: '1.0.0',
    },
  },
  apis: ['./api.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);
module.exports = options;