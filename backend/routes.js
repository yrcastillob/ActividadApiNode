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


