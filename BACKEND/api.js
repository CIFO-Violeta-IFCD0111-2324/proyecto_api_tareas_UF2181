const express = require("express");
const cors = require("cors");
const port = 3500;

const api = express();

api.use(cors());
api.use(express.json());

//***************** importar rutas ************************ */
// Importar las rutas
const routes = require('./routes.js');

// Usar las rutas
api.use('/api/v1', routes);


//ARRANCAR EL SERVIDOR
api.listen(port, () => {
    console.log("Servidor conectado en puerto 3500");
});
