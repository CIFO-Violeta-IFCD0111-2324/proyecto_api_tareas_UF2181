const express=require("express");
const cors=require("cors");
const mysql=require("mysql");
const port =3000;

const server=express();

//Configuración
server.use(cors());
server.use(express.json())

//Rutas
const ruta="/insertar"
server.post(ruta,(req,resp)=>{
    const act=req.body.activity;
    const start=req.body.start;
    const dl=req.body.deadline;
    const com=req.body.comentary;
    const conexion=mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "apirest"
    });
    conexion.connect(err=>{
        if(err){
            resp.json("Error en la conexión:"+ err)
        }else{
            const query=`insert into tasks values(DEFAULT,${act},${start},${dl},${com});`
            conexion.query(query,err=>{
                if(err){
                    resp.json("Error en la inserción "+ err);
                }else{
                    resp.json("Insertado correctamente!")

                }
            });
        }
    });
    
});
// Arrancar el server
server.listen(port=>{
    console.log("Servidor conectado con terminal "+ port);
})