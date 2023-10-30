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

// CONECTA CON ARCHIVO RUTA
require("./routes.js")


// MENSAJE DE ÉXITO CONEXIÓN SERVIDOR
app.listen(puerto,function(){
    console.log("servidor funcionando por el puerto "+ puerto);
}) 