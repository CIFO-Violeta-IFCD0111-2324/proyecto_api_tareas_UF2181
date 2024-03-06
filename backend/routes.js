const express = require('express');
const router = express.Router();
const CryptoJS = require("crypto-js");
const { uuid } = require('uuidv4');

const conexionMySQL = require('./conexionMySQL.js');
// CREAR
router.post("/crear", (req, res) => {
  let dato = req.body.dato;
  let id = uuid();
  // encriptamos el dato
  const datoEncriptado = CryptoJS.AES.encrypt(dato, 'miTextoSecreto').toString();
  const sql = "insert into dato values (?, ?)";
  conexionMySQL.query(sql, [id, datoEncriptado], error => {
    if (error) {
      res.json({
        "status": 500,
        "mensaje": "<span class='error'>Error en la inserción del dato.  Error:" + error + "</span>"
      });
    } else {
      res.json({
        "status": 200,
        "mensaje": "<span class='correcto'>Dato insertado correctamente! <i class='fas fa-spinner fa-spin'></i></span>"
      });
    }
  });
});
// LEER
router.get("/leer", (req, res) => {
  const sql = "select * from dato";
  conexionMySQL.query(sql, (error, resultado) => {
    if (error) {
      res.json({
        "status": 500,
        "mensaje": "<span class='error'>Error en la lectura de los dato. Error:" + error + "</span>"
      });
    } else {
      // desencriptar el dato
      let arrayNuevoResultado = [];
      for (let i = 0; i < resultado.length; i++) {
        let bytes = CryptoJS.AES.decrypt(resultado[i].dato, 'miTextoSecreto');
        let dato = bytes.toString(CryptoJS.enc.Utf8);
        arrayNuevoResultado.push({
          "id": resultado[i].id,
          "dato": dato
        });
      }
      res.json({
        "status": 200,
        "resultado": arrayNuevoResultado
      });
    }
  });
});
// BORRAR
router.delete("/borrar", (req, res) => {
  const dato = req.body.dato;
  const sql = "delete from dato where id = ?";
  conexionMySQL.query(sql, [dato], error => {
    if (error) {
      res.json({
        "status": 500,
        "mensaje": "<span class='error'>Error en el borrado del dato. Error:" + error + "</span>"
      });
    } else {
      res.json({
        "status": 200,
        "mensaje": "<span class='correcto'>Dato borrado correctamente! <i class='fas fa-spinner fa-spin'></i></span>"
      });
    }
  });
});
// EDITAR
router.put("/editar", (req, res) => {
  const dato = req.body.dato;
  const id = req.body.id;
  res.json(id)
  // const sql = "update datos set dato = ? where id = ?";
  // conexionMySQL.query(sql, [dato,id], error => {
  //   if (error) {
  //     res.json({
  //       "status": 500,
  //       "mensaje": "<span class='error'>Error en la edición del dato.  Error:" + error + "</span>"
  //     });
  //   } else {
  //     res.json({
  //       "status": 200,
  //       "mensaje": "<span class='correcto'>Dato editado correctamente! <i class='fas fa-spinner fa-spin'></i></span>"
  //     });
  //   }
  // });
});

module.exports = router;