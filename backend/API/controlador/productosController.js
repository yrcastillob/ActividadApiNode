var productosModel = require("../modelos/productosModel.js").productosModel
var productosController = {}

productosController.Guardar = function(request,response){
    try {
        var post = {
            codigo: parseInt(request.body.codigo),
            nombre: request.body.nombre,
            descripcion: request.body.descripcion,
            precio: parseFloat(request.body.precio)
        }
    
        
        if(post.codigo==undefined || post.codigo == null || post.codigo =="" || isNaN(post.codigo)){
            response.status(406).json({state:false, mensaje: "El código del producto es obligatorio y debe ser un número entero."});
            return false;
        }
    
        if(post.nombre==undefined || post.nombre == null || post.nombre ==""){
            response.status(406).json({state:false, mensaje: "El nombre del producto es obligatorio."});
            return false;
        }
    
        if(post.descripcion==undefined || post.descripcion == null || post.descripcion ==""){
            response.status(406).json({state:false, mensaje: "La descripción del producto es obligatoria."});
            return false;
        }
    
        if(post.precio==undefined || post.precio == null || post.precio =="" || isNaN(post.precio)){
            response.status(406).json({state:false, mensaje: "El precio del producto es obligatorio y debe ser un número flotante."});
            return false;
        }
    
        productosModel.Guardar(post,function(respuesta){
            response.json(respuesta)
        })
        
    } catch (error) {
        response.json({state:false, mensaje: "Error inesperado ",error});
    }
    
}

productosController.ListarTodos = function(request,response) {
    productosModel.ListarTodos(null,function(respuesta){
        response.json(respuesta);
    })
    
}

productosController.ListarporCodigo = function(request,response) {
    post = {
        codigo: parseInt(request.body.codigo)
    } 
    

    if(post.codigo==undefined || post.codigo == null || post.codigo =="" || isNaN(post.codigo)){
        response.status(406).json({state:false, mensaje: "El código del producto es obligatorio y debe ser un número entero."});
        return false;
    }

    productosModel.ListarporCodigo(post,function(respuesta){
        response.json(respuesta)
    })
}

productosController.Modificar = function(request,response) {
    var post = {
        codigo: parseInt(request.body.codigo),
        nombre: request.body.nombre,
        descripcion: request.body.descripcion,
        precio: parseFloat(request.body.precio)
    }

 
    if(post.codigo==undefined || post.codigo == null || post.codigo =="" || isNaN(post.codigo)){
        response.status(406).json({state:false, mensaje: "El código del producto es obligatorio y debe ser un número entero."});
        return false;
    }

    if(post.nombre==undefined || post.nombre == null || post.nombre ==""){
        response.status(406).json({state:false, mensaje: "El nombre del producto es obligatorio."});
        return false;
    }

    if(post.descripcion==undefined || post.descripcion == null || post.descripcion ==""){
        response.status(406).json({state:false, mensaje: "La descripción del producto es obligatoria."});
        return false;
    }

    if(post.precio==undefined || post.precio == null || post.precio =="" || isNaN(post.precio)){
        response.status(406).json({state:false, mensaje: "El precio del producto es obligatorio y debe ser un número flotante."});
        return false;
    }

    productosModel.Modificar(post, function(respuesta){
        response.json(respuesta)
    })
}

productosController.Eliminar = function(request,response) {
    post = {
        codigo: parseInt(request.body.codigo)
    } 
    
    if(post.codigo==undefined || post.codigo == null || post.codigo =="" || isNaN(post.codigo)){
        response.status(406).json({state:false, mensaje: "El código del producto es obligatorio y debe ser un número entero."});
        return false;
    }

    productosModel.Eliminar(post,function(respuesta){
        response.json(respuesta)
    })
}

module.exports.productosController = productosController