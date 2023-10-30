/*
Elaborado por Yeisson Castillo
Actividad 4 
Creación CRUD con memoria back end para productos.
*/

// CREAN VARIABLES EXPRESS PARA EL PROYECTO
var express = require("express");
var app = express();
var puerto = 3000;


// CREAN VARIABLES BODY PARSER PARA EL PROYECTO
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


// VARIABLE PRODUCTOS
var productos = [
    {codigo: 12345, nombre:"Pan Bimbo", descripcion: "tajado, pequeño, 12 unidades", precio: 2800},
    {codigo: 45678, nombre:"Salchicha Ranchera", descripcion: "grande 18 unidades", precio: 6800},
    {codigo: 78912, nombre:"Papel higiénico", descripcion: "familiar 24 unidades, triple hoja", precio: 24500}
]

// CREATE - GUARDAR PRODUCTOS

app.post("/Productos/Guardar", function(request,response){
    var codigo = parseInt(request.body.codigo);
    var nombre = request.body.nombre;
    var descripcion = request.body.descripcion;
    var precio = parseFloat(request.body.precio);

    if(codigo==undefined || codigo == null || codigo =="" || isNaN(codigo)){
        response.status(406).json({state:false, mensaje: "El código del producto es obligatorio y debe ser un número entero."});
        return false;
    }

    if(nombre==undefined || nombre == null || nombre ==""){
        response.status(406).json({state:false, mensaje: "El nombre del producto es obligatorio."});
        return false;
    }

    if(descripcion==undefined || descripcion == null || descripcion ==""){
        response.status(406).json({state:false, mensaje: "La descripción del producto es obligatoria."});
        return false;
    }

    if(precio==undefined || precio == null || precio =="" || isNaN(precio)){
        response.status(406).json({state:false, mensaje: "El precio del producto es obligatorio y debe ser un número flotante."});
        return false;
    }

    productos.push({codigo: codigo, nombre :nombre, descripcion: descripcion, precio: precio});
    response.status(201).json({state:true, mensaje: "Se almacenó el producto correctamente."});
})

// READ - LISTAR PRODUCTOS

app.post("/Productos/ListarTodos", function(request,response){
    response.json(productos);
})

app.post("/Productos/ListarporCodigo", function(request,response){
    var codigo = parseInt(request.body.codigo);
    

    if(codigo==undefined || codigo == null || codigo =="" || isNaN(codigo)){
        response.status(406).json({state:false, mensaje: "El código del producto es obligatorio y debe ser un número entero."});
        return false;
    }

    var resultado = productos.find((producto) => producto.codigo == codigo) 

    if(resultado == "" || resultado == null || resultado == undefined ){
        response.status(404).json({state:false, mensaje: "El código del producto no existe. No es posible listarlo."});
        return false;
    }
    else {
        response.status(201).json({state:true, resultado});
    }
    
})

// UPDATE - ACTUALIZAR PRODUCTOS

app.post("/Productos/Modificar", function(request,response){
    var codigo = parseInt(request.body.codigo);
    var nombre = request.body.nombre;
    var descripcion = request.body.descripcion;
    var precio = parseFloat(request.body.precio);

    if(codigo==undefined || codigo == null || codigo =="" || isNaN(codigo)){
        response.status(406).json({state:false, mensaje: "El código del producto es obligatorio y debe ser un número entero."});
        return false;
    }

    if(nombre==undefined || nombre == null || nombre ==""){
        response.status(406).json({state:false, mensaje: "El nombre del producto es obligatorio."});
        return false;
    }

    if(descripcion==undefined || descripcion == null || descripcion ==""){
        response.status(406).json({state:false, mensaje: "La descripción del producto es obligatoria."});
        return false;
    }

    if(precio==undefined || precio == null || precio =="" || isNaN(precio)){
        response.status(406).json({state:false, mensaje: "El precio del producto es obligatorio y debe ser un número flotante."});
        return false;
    }

    var posicion = productos.findIndex((producto) => producto.codigo == codigo); 

    if(posicion==-1){
        response.status(404).json({state:false, mensaje: "El código del producto no existe."});
        return false;
    }
    else {
        productos[posicion].nombre = nombre;
        productos[posicion].descripcion = descripcion;
        productos[posicion].precio = precio;
        response.status(201).json({state:true, mensaje: "Se actualizó el producto con código "+codigo+" y nombre "+nombre+"."});
    }

})

// DELETE - ELIMINAR PRODUCTOS

app.post("/Productos/Eliminar", function(request,response){
    var codigo = parseInt(request.body.codigo);
    

    if(codigo==undefined || codigo == null || codigo =="" || isNaN(codigo)){
        response.status(406).json({state:false, mensaje: "El código del producto es obligatorio y debe ser un número entero."});
        return false;
    }

    var posicion = productos.findIndex((producto) => producto.codigo == codigo); 

    if(posicion == -1){
        response.status(404).json({state:false, mensaje: "El código del producto no existe. No es posible eliminarlo."});
        return false;
    }
    else {
        productos.splice(posicion, 1);

        response.status(201).json({state:true, mensaje: "Se eliminó el producto con código "+codigo+"."});
    }
    
})



app.listen(puerto,function(){
    console.log("servidor funcionando por el puerto "+ puerto);
}) 