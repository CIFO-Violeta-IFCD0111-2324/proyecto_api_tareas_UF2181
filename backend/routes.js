const express = require('express');
const router = express.Router();
const CryptoJS = require("crypto-js");
const { v4: uuid_v4 } = require('uuid');

const conexionMySQL = require('./conexionMySQL.js');

// Función para manejar errores
const handleError = (res, error, mensaje) => {
  console.error(error);
  res.status(500).json({
    status: 500,
    mensaje: `<span class='error'>${mensaje}. ${error}</span>`
  });
};

// CREAR
router.post("/crear", async (req, res) => {
  try {
    const dato = req.body.dato;
    const id = uuid_v4(); // crea una id robusta
    // encriptamos el dato
    const datoEncriptado = CryptoJS.AES.encrypt(dato, 'miTextoSecreto').toString();
    // gestión de la posición del dato
    const resultado = await conexionMySQL.query("select max(posicion_dato) as posicion_dato_max from dato");
    const posicion = resultado[0].posicion_dato_max === null ? 1 : resultado[0].posicion_dato_max + 1;
    await conexionMySQL.query("insert into dato values (?, ?, ?)", [id, datoEncriptado, posicion]);
    res.status(200).json({
      status: 200,
      mensaje: "<span class='correcto'>Dato insertado correctamente! <i class='fas fa-spinner fa-spin'></i></span>"
    });
  } catch (error) {
    handleError(res, error, "Error en la inserción del dato");
  }
});

// LEER
router.get("/leer", async (req, res) => {
  try {
    const resultado = await conexionMySQL.query("select * from dato");
    let arrayNuevoResultado = [];
    for (let i = 0; i < resultado.length; i++) {
      let bytes = CryptoJS.AES.decrypt(resultado[i].dato, 'miTextoSecreto');
      let dato = bytes.toString(CryptoJS.enc.Utf8);
      arrayNuevoResultado.push({
        "id": resultado[i].id,
        "dato": dato,
        "posicion_dato": resultado[i].posicion_dato
      });
    }
    res.status(200).json({
      status: 200,
      resultado: arrayNuevoResultado
    });
  } catch (error) {
    handleError(res, error, "Error en la lectura de los datos");
  }
});

// BORRAR
router.delete("/borrar", async (req, res) => {
  try {
    const id = req.body.id;
    await conexionMySQL.query("delete from dato where id = ?", [id]);
    res.status(200).json({
      status: 200,
      mensaje: "<span class='correcto'>Dato borrado correctamente! <i class='fas fa-spinner fa-spin'></i></span>"
    });
  } catch (error) {
    handleError(res, error, "Error en el borrado del dato");
  }
});

// EDITAR
router.put("/editar", (req, res) => {
  const dato = req.body.dato;
  const id = req.body.id;
  // encriptamos el dato
  const datoEncriptado = CryptoJS.AES.encrypt(dato, 'miTextoSecreto').toString();
  const sql = "update dato set dato = ? where id = ?";
  conexionMySQL.query(sql, [datoEncriptado, id], error => {
    if (error) {
      res.json({
        "status": 500,
        "mensaje": "<span class='error'>Error en la edición del dato. Error:" + error + "</span>"
      });
    } else {
      res.json({
        "status": 200,
        "mensaje": "<span class='correcto'>Dato editado correctamente! <i class='fas fa-spinner fa-spin'></i></span>"
      });
    }
  });
});

module.exports = router;