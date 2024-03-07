const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3000; 
  
const api = express();

// configuracion
api.use(express.json()); 
api.use(cors());

// importar las rutas
api.use('/api/v1', require('./routes.js'));

// arrancamos el servidor
api.listen(port, () => {
  console.log(`Servidor arrancado y escuchando por el puerto: ${port}`); 
});