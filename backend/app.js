/*
Elaborado por Yeisson Castillo
Actividad 4 
Creación CRUD con memoria back end para productos.
*/

// CREAN VARIABLES EXPRESS PARA EL PROYECTO
var express = require("express");
global.app = express();
var puerto = 3000;


// CREAN VARIABLES BODY PARSER PARA EL PROYECTO
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


// CONECTA CON MONGO
const mongoose = require("mongoose");


// CONECTA CON ARCHIVO RUTA
require("./routes.js")


// CONECTAR A LA BASE DE DATOS
mongoose.connect("mongodb://127.0.0.1:27017/productos",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((res)=>{
    console.log("Conexión correcta a mongo")
}).catch((error)=>{
    console.log(error)
})


// LINEA PARA VISUALIZAR FRONT END A TRAVÉS DE BACK END
app.use("/",express.static(__dirname+"/frontend"))


// MENSAJE DE ÉXITO CONEXIÓN SERVIDOR
app.listen(puerto,function(){
    console.log("servidor funcionando por el puerto "+ puerto);
}) 