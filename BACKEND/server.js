const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const server = express();
const port = 3000;

server.use(cors());
server.use(express.json());

server.post("/crear_en_bd", (req, res) => {

})




//ARRANCAR EL SERVIDOR
server.listen(port, () => {
    console.log("Servidor conectado en puerto 3000");
});
