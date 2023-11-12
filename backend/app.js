/*
Elaborado por Yeisson Castillo
Actividad 4 
Creación CRUD con memoria back end para productos.
*/

// CREAN VARIABLES EXPRESS PARA EL PROYECTO
var express = require("express");
global.app = express();

// CREAN VARIABLES BODY PARSER PARA EL PROYECTO
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// CONECTA CON MONGO
const mongoose = require("mongoose");
const { config } = require("./config.js");

// NODEMAILER
global.nodemailer = require("nodemailer");

// CONECTAR ARCHIVO CONFIG
global.config = require("./config.js").config;

// SHA 256
global.sha256 = require("sha256");

// CONECTA CON ARCHIVO RUTA
require("./routes.js");


// CONECTAR A LA BASE DE DATOS

// PRODUCTOS
/* mongoose.connect("mongodb://127.0.0.1:27017/"+config.bdProductos,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((res)=>{
    console.log("Conexión correcta a mongo bd: "+config.bdProductos)
}).catch((error)=>{
    console.log(error)
}) */

// USUARIOS
mongoose.connect("mongodb://127.0.0.1:27017/"+config.bdUsuarios,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((res)=>{
    console.log("Conexión correcta a mongo bd: "+config.bdUsuarios);
}).catch((error)=>{
    console.log(error);
})


// LINEA PARA VISUALIZAR FRONT END A TRAVÉS DE BACK END
app.use("/",express.static(__dirname+"/frontend"));


// MENSAJE DE ÉXITO CONEXIÓN SERVIDOR
app.listen(config.puerto,function(){
    console.log("servidor funcionando por el puerto "+ config.puerto);
}) 
