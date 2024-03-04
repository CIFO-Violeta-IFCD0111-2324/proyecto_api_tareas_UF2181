const express = require("express");
const cors = require("cors");

const api = express();

api.use(express.json());
api.use(cors());


api.use('/api/v1', require('./routes.js'));

api.listen(3333,() => {
    console.log("servidor ejecuntándose por el puerto 3333.")
});




