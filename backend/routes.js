const express = require('express');
const router = express.Router();
const CryptoJS = require("crypto-js");
const { v4: uuid_v4 } = require('uuid');

const conexionMySQL = require('./conexionMySQL.js');

// codigo optimizado con funcion que gestiona los errores y async/await (ver conexionMySQL.js para cambios, sino no funciona) en la primera ruta (CREAR)
// TODO: Optimizar las que faltan

// Función para manejar errores
const handleError = (res, error, mensaje) => {
  console.error(error);
  res.status(500).json({
    status: 500,
    mensaje: `<span class='error'>${mensaje}. Error: ${error}</span>`
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

// version "old"

// router.post("/crear", (req, res) => {
//   let dato = req.body.dato;
//   let id = uuid_v4(); // crea una id robusta
//   // encriptamos el dato
//   const datoEncriptado = CryptoJS.AES.encrypt(dato, 'miTextoSecreto').toString();
//   // gestión de la posición del dato
//   const sql1 = "select max(posicion_dato) as posicion_dato_max from dato";
//   conexionMySQL.query(sql1, (error, resultado) => {
//     if (error) {
//       res.json({
//         "status": 500,
//         "mensaje": "<span class='error'>Error en la consulta a la DB.  Error:" + error + "</span>"
//       });
//     } else {
//       let sql2 = "";
//       if (resultado[0].posicion_dato_max === null) {
//         sql2 = "insert into dato values (?, ?, 1)";
//       } else {
//         sql2 = "insert into dato values (?, ?, ?)";
//       }
//       conexionMySQL.query(sql2, [id, datoEncriptado, resultado[0].posicion_dato_max+1], error => {
//         if (error) {
//           res.json({
//             "status": 500,
//             "mensaje": "<span class='error'>Error en la inserción del dato.  Error:" + error + "</span>"
//           });
//         } else {
//           res.json({
//             "status": 200,
//             "mensaje": "<span class='correcto'>Dato insertado correctamente! <i class='fas fa-spinner fa-spin'></i></span>"
//           });
//         }
//       });
//     }
//   });
// });

// LEER
router.get("/leer", (req, res) => {
  const sql = "select * from dato";
  conexionMySQL.query(sql, (error, resultado) => {
    if (error) {
      res.json({
        "status": 500,
        "mensaje": "<span class='error'>Error en la lectura de los datos. Error:" + error + "</span>"
      });
    } else {
      // desencriptar el dato
      let arrayNuevoResultado = [];
      for (let i = 0; i < resultado.length; i++) {
        let bytes = CryptoJS.AES.decrypt(resultado[i].dato, 'miTextoSecreto');
        let dato = bytes.toString(CryptoJS.enc.Utf8);
        arrayNuevoResultado.push({
          "id": resultado[i].id,
          "dato": dato,
          "posicion_dato":  resultado[i].posicion_dato
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