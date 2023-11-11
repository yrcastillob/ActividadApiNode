const { response } = require("express");

var usuariosModel = require("../modelos/usuariosModel.js").usuariosModel
var usuariosController = {}

usuariosController.Guardar = function(request,response){
    try {
        var post = {
            nombre: request.body.nombre,
            correo: request.body.correo,
            password: request.body.password
        }
    
        if(post.nombre==undefined || post.nombre == null || post.nombre ==""){
            response.status(406).json({state:false, mensaje: "El nombre es obligatorio para efectuar la operación."});
            return false;
        }

        if(post.correo==undefined || post.correo == null || post.correo ==""){
            response.status(406).json({state:false, mensaje: "El correo electrónico es obligatorio para efectuar la operación."});
            return false;
        }

        if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(post.correo) == false) {
            response.status(406).json({ state: false, mensaje: "El correo electrónico no es uno válido." })
            return false
        }

        if(post.password==undefined || post.password == null || post.password ==""){
            response.status(406).json({state:false, mensaje: "La contraseña es obligatoria para efectuar la operación."});
            return false;
        }

        if (post.password.lenght > 15 || post.password.lenght < 8){
            response.status(406).json({state:false, mensaje: "La contraseña debe tener mínimo 8 y máximo 15 caracteres."});
            return false;
        }
        
        usuariosModel.ExisteCorreo(post,function(res){
            if(res.existe == "No"){
                usuariosModel.Guardar(post,function(respuesta){
                    response.json(respuesta)
                })
            }else{
                response.json({state: false, mensaje: "El correo ya existe. Por favor, intente con otro."})
            }
        })
        
    } catch (error) {
        response.json({state:false, mensaje: "Error inesperado ",error});
    }
    
}

usuariosController.ListarTodos = function(request,response) {
    usuariosModel.ListarTodos(null,function(respuesta){
        response.json(respuesta);
    })
    
}

usuariosController.ListarporId = function(request,response) {
    post = {
        _id: request.body._id
    } 
    

    if(post._id==undefined || post._id == null || post._id ==""){
        response.status(406).json({state:false, mensaje: "El id es obligatorio para efectuar la operación."});
        return false;
    }

    usuariosModel.ListarporId(post,function(respuesta){
        response.json(respuesta)
    }) 
}

usuariosController.Modificar = function(request,response) {
    var post = {
        _id: request.body._id,
        nombre: request.body.nombre,
        rol: request.body.rol
    }

    if(post._id==undefined || post._id == null || post._id ==""){
        response.status(406).json({state:false, mensaje: "El id es obligatorio para efectuar la operación."});
        return false;
    }

    if(post.nombre==undefined || post.nombre == null || post.nombre ==""){
        response.status(406).json({state:false, mensaje: "El nombre es obligatorio para efectuar la operación."});
        return false;
    }

    if(post.rol==undefined || post.rol == null || post.rol ==""){
        response.status(406).json({state:false, mensaje: "El rol es obligatorio para efectuar la operación."});
        return false;
    }

    usuariosModel.Modificar(post, function(respuesta){
        response.json(respuesta)
    })
}

usuariosController.Eliminar = function(request,response) {
    post = {
        _id: request.body._id
    } 
    
    if(post._id==undefined || post._id == null || post._id ==""){
        response.status(406).json({state:false, mensaje: "El id es obligatorio para efectuar la operación."});
        return false;
    }

    usuariosModel.Eliminar(post,function(respuesta){
        response.json(respuesta)
    })
}


usuariosController.Login = function(request,response) {
    post = {
        correo: request.body.correo,
        password: request.body.password
    } 
    

    if(post.correo==undefined || post.correo == null || post.correo ==""){
        response.status(406).json({state:false, mensaje: "El correo es obligatorio para efectuar la operación."});
        return false;
    }

    if(post.password==undefined || post.password == null || post.password ==""){
        response.status(406).json({state:false, mensaje: "La contraseña es obligatoria para efectuar la operación."});
        return false;
    }

    usuariosModel.CuentaActiva(post,function(estado){
        if (estado.state == false){
            response.json({state:false,mensaje:"El correo no es válido."});
            return false
        }else{
            if(estado.res[0].estado == 0){
                response.json({state:false,mensaje:"Su cuenta no está activa."});
                return false
            }else{
                usuariosModel.Login(post,function(respuesta){
                    response.json(respuesta)
                }) 
            }
        }
    })
    
}


module.exports.usuariosController = usuariosController