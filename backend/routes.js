const express = require('express');
const router = express.Router();
const CryptoJS = require("crypto-js");
const { uuid } = require('uuidv4');

const conexionMySQL = require('./conexion_mysql.js');
// CREAR
router.post("/crear", (req, res) => {
  let nombre_tarea = req.body.nombre_tarea;
  let fecha_inicio = req.body.fecha_inicio;
  let fecha_fin = req.body.fecha_fin;
  let descripcion = req.body.descripcion;
  let id = uuid();
// encriptamos los datos
const datoEncriptadoN = CryptoJS.AES.encrypt(nombre_tarea, 'textoSecreto').toString();
const datosEncriptadoFI = CryptoJS.AES.encrypt(fecha_inicio, 'textoSecreto').toString();
const datosEncriptadoFF = CryptoJS.AES.encrypt(fecha_fin, 'textoSecreto').toString();
const datosEncriptadoD = CryptoJS.AES.encrypt(descripcion, 'textoSecreto').toString();
  const sql = "insert into tareas values (?, ?, ?, ?, ?)";
  conexionMySQL.query(sql, [id, datoEncriptadoN, datosEncriptadoFI, datosEncriptadoFF, datosEncriptadoD ], error => {
    if (error) {
      res.json({
        "status": 500,
        "mensaje": "Error del servidor. Error:" + error
      });
    } else {
      res.json({
        "status": 200,
        "mensaje": "Tarea creada exitosamente"
      });
    }
  });
});



//LEER 
router.get("/leer", (req, res) => {
  const sql = "select * from tareas;";
  conexionMySQL.query(sql, (error, resultado) => {
    if (error) {
      res.json({
        "status": 500,
        "mensaje": "Error en la inserción del dato. Error" + error
      });
    } else {
      // desencriptar datos
      let arrayNuevoResultado = [];
      for (let i = 0; i < resultado.length; i++) 
      {
        let bytes = CryptoJS.AES.decrypt(resultado[i].nombre_tarea, 'textoSecreto');
        let nombre_tarea = bytes.toString(CryptoJS.enc.Utf8);
        let bytes1 = CryptoJS.AES.decrypt(resultado[i].fecha_inicio, 'textoSecreto');
        let fecha_inicio = bytes1.toString(CryptoJS.enc.Utf8);
        let bytes2 = CryptoJS.AES.decrypt(resultado[i].fecha_fin, 'textoSecreto');
        let fecha_fin = bytes2.toString(CryptoJS.enc.Utf8);
        let bytes3 = CryptoJS.AES.decrypt(resultado[i].descripcion, 'textoSecreto');
        let descripcion = bytes3.toString(CryptoJS.enc.Utf8);
        
        arrayNuevoResultado.push({
          "id": resultado[i].id,
          "nombre_tarea": nombre_tarea,
          "fecha_inicio": fecha_inicio,
          "fecha_fin": fecha_fin,
          "descripcion": descripcion
        });
      }
      res.json({
        "status": 200,
        "resultado": arrayNuevoResultado
      });
    }
  });
});




module.exports = router;