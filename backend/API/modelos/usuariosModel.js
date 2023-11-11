var usuariosModel = {};
const mongoose = require("mongoose");

// MODELO usuarios

// Se crea el esquema del producto.
const Schema = mongoose.Schema;

var usuariosSchema = new Schema({
    nombre:String,
    correo:String,
    password:String,
    rol:Number,
    codigoact:String,
    estado:Number,
})

// Modelado es la unión entre un nombre y un esquema que ya se creó.
const myModel = mongoose.model("usuarios",usuariosSchema);

usuariosModel.Guardar = function(post,callback){

    const instancia = new myModel;
    const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    instancia.nombre = post.nombre;
    instancia.correo = post.correo;
    instancia.password = post.password;
    instancia.rol = 2 // 1 admin, 2 cliente, 3 etc...
    instancia.codigoact = abc[Math.floor(Math.random() * 26)]+abc[Math.floor(Math.random() * 26)]+Math.floor(Math.random()*(99999-10000 + 1)+10000)+abc[Math.floor(Math.random() * 26)]+abc[Math.floor(Math.random() * 26)]
    instancia.estado = 0

    instancia.save().then((res)=>{
        return callback({state:true, mensaje: "Operación exitosa."});
    }).catch((error)=>{
        return callback({state:false, mensaje: "Se presentó un error al almacenar. Error: "+error})
    })

}

usuariosModel.ListarTodos = function(post,callback){
    myModel.find({},{password:0,codigoact:0}).then((res)=>{
        return callback(res)
    })

}

usuariosModel.ListarporId = function(post,callback){
    myModel.find({_id: post._id},{password:0,codigoact:0}).then((res)=>{
        return callback(res)
    }).catch((error)=>{
        return callback({state:false, mensaje: "El elemento no existe. No es posible efectuar operacion.",error:error});
    })
}

usuariosModel.Modificar = function(post,callback){
    myModel.findByIdAndUpdate(post._id,
        {
            nombre: post.nombre,
            correo: post.correo,
            rol: post.rol
        }).then((res)=>{
            return callback({state:true, mensaje: "Actualización exitosa."});
        }).catch((error)=>{
            return callback({state:false, mensaje: "El elemento no existe.",error: error});
        })
}

usuariosModel.Eliminar = function(post,callback){
    myModel.findByIdAndDelete(post._id).then((res)=>{
        callback({state:true, mensaje: "Eliminación exitosa."});
    }).catch((error)=>{
        return callback({state:false, mensaje: "El elemento no existe. No es posible eliminarlo.", error: error});
    })
}

usuariosModel.ExisteCorreo = function(post,callback){
    myModel.find({correo: post.correo},{}).then((res)=>{
        if (res.length == 0){
            return callback({existe: "No"});
        }else{
            return callback({existe: "Si"});
        }
    })
}


usuariosModel.Login = function(post,callback){
    myModel.find({correo: post.correo, password: post.password},{password:0,codigoact:0}).then((res)=>{
        if (res.length==0){
            return callback({state:false, mensaje: "Sus credenciales no son válidas."});
        }else{
            return callback({state:true, mensaje: "Bienvenido "+res[0].nombre});
        }
    })
}

usuariosModel.CuentaActiva = function(post,callback){
    myModel.find({correo:post.correo},{estado:1}).then((res)=>{
        if(res.length >0){
            return callback({state: true, res:res})
        }else{
            return callback({state:false})
        }
    })
}

module.exports.usuariosModel = usuariosModel