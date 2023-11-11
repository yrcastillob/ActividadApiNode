/*
**************************************************************************************************
***********************************************PRODUCTOS******************************************
*/

var productosController = require("./API/controlador/productosController.js").productosController

// CREATE - GUARDAR PRODUCTOS

app.post("/Productos/Guardar", function(request,response){
    productosController.Guardar(request,response);
})

// READ - LISTAR PRODUCTOS

app.post("/Productos/ListarTodos", function(request,response){
    productosController.ListarTodos(request,response);
})

app.post("/Productos/ListarporCodigo", function(request,response){
    productosController.ListarporCodigo(request,response);    
})

// UPDATE - ACTUALIZAR PRODUCTOS

app.post("/Productos/Modificar", function(request,response){
    productosController.Modificar(request,response);
})

// DELETE - ELIMINAR PRODUCTOS

app.post("/Productos/Eliminar", function(request,response){
    productosController.Eliminar(request,response)
})


/*
**************************************************************************************************
************************************************USUARIOS******************************************
*/

var usuariosController = require("./API/controlador/usuariosController.js").usuariosController

// CREATE - GUARDAR usuarios

app.post("/usuarios/Guardar", function(request,response){
    usuariosController.Guardar(request,response);
})

// READ - LISTAR usuarios

app.post("/usuarios/ListarTodos", function(request,response){
    usuariosController.ListarTodos(request,response);
})

app.post("/usuarios/ListarporId", function(request,response){
    usuariosController.ListarporId(request,response);    
})

// UPDATE - ACTUALIZAR usuarios

app.post("/usuarios/Modificar", function(request,response){
    usuariosController.Modificar(request,response);
})

// DELETE - ELIMINAR usuarios

app.post("/usuarios/Eliminar", function(request,response){
    usuariosController.Eliminar(request,response)
})

// LOGIN - ELIMINAR usuarios


app.post("/usuarios/Login", function(request,response){
    usuariosController.Login(request,response);    
})
