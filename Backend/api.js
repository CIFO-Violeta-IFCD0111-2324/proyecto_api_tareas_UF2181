
const express = require("express");
const cors = require("cors");
const port = 3001;

const api = express();


api.use(express.json());
api.use(cors());

api.use('/api/v1', require('./routes.js'));

api.listen(port, () => {
    console.log("servidor levantado por el puerto " + port);
})

