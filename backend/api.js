const express = require("express");
const cors = require("cors");

const api = express();

// configuración
api.use(express.json());
api.use(cors());

// importar las rutas
api.use('/api/v1', require('./routes.js'));

// arrancamos el servidor
api.listen(3333,() => {
    console.log("servidor ejecuntándose por el puerto 3333.")
});




