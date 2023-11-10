var productosModel = {};
const mongoose = require("mongoose");

// MODELO PRODUCTOS

// Se crea el esquema del producto.
const Schema = mongoose.Schema;

var productosSchema = new Schema({
    codigo:Number,
    nombre:String,
    descripcion:String,
    precio:Number
})

// Modelado es la unión entre un nombre y un esquema que ya se creó.
const myModel = mongoose.model("Productos",productosSchema);

productosModel.Guardar = function(post,callback){

    const instancia = new myModel;
    
    instancia.codigo = post.codigo;
    instancia.nombre = post.nombre;
    instancia.descripcion = post.descripcion;
    instancia.precio = post.precio;

    myModel.find({codigo:post.codigo},{}).then((res)=>{
        if (res.length == 0){
            instancia.save().then((res)=>{
                return callback({state:true, mensaje: "Operación exitosa."});
            }).catch((error)=>{
                return callback({state:false, mensaje: "Se presentó un error al almacenar. Error: "+error})
            })
        } else {
            return callback({state:false, mensaje: "El elemento "+post.codigo+" ya existe, ingrese uno único, por favor."});
        }
    })

}

productosModel.ListarTodos = function(post,callback){
    myModel.find({},{}).then((res)=>{
        return callback(res)
    })

    /*return callback(productos)*/

}

productosModel.ListarporCodigo = function(post,callback){
    /*var resultado = productos.find((producto) => producto.codigo == post.codigo) 

    if(resultado == "" || resultado == null || resultado == undefined ){
        return callback({state:false, mensaje: "El código del producto no existe. No es posible listarlo."});

    }
    else {
        return callback({state:true, resultado});
    } */

    myModel.find({_id: post._id},{}).then((res)=>{
        return callback(res)
    }).catch((error)=>{
        return callback({state:false, mensaje: "El elemento no existe. No es posible efectuar operacion.",error:error});
    })
}

productosModel.Modificar = function(post,callback){
    /* var posicion = productos.findIndex((producto) => producto.codigo == post.codigo); 

    if(posicion==-1){
        return callback({state:false, mensaje: "El código del producto no existe."});
    }
    else {
        productos[posicion].nombre = post.nombre;
        productos[posicion].descripcion = post.descripcion;
        productos[posicion].precio = post.precio;
        return callback({state:true, mensaje: "Se actualizó el producto con código "+post.codigo+" y nombre "+post.nombre+"."});
    } */

    myModel.findByIdAndUpdate(post._id,
        {
            codigo: post.codigo,
            nombre: post.nombre,
            descripcion: post.descripcion,
            precio: post.precio
        }).then((res)=>{
            return callback({state:true, mensaje: "Actualización exitosa."});
        }).catch((error)=>{
            return callback({state:false, mensaje: "El elemento no existe.",error: error});
        })
}

productosModel.Eliminar = function(post,callback){
    /* var posicion = productos.findIndex((producto) => producto.codigo == post.codigo); 

    if(posicion == -1){
        return callback({state:false, mensaje: "El código del producto no existe. No es posible eliminarlo."});
    }
    else {
        productos.splice(posicion, 1);

        callback({state:true, mensaje: "Se eliminó el producto con código "+post.codigo+"."});
    } */

    myModel.findByIdAndDelete(post._id).then((res)=>{
        callback({state:true, mensaje: "Eliminación exitosa."});
    }).catch((error)=>{
        return callback({state:false, mensaje: "El elemento no existe. No es posible eliminarlo.", error: error});
    })
}

module.exports.productosModel = productosModel