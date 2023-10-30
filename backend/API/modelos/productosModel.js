var productosModel = {}

// MODELO PRODUCTOS

var productos = [
    {codigo: 12345, nombre:"Pan Bimbo", descripcion: "tajado, pequeño, 12 unidades", precio: 2800},
    {codigo: 45678, nombre:"Salchicha Ranchera", descripcion: "grande 18 unidades", precio: 6800},
    {codigo: 78912, nombre:"Papel higiénico", descripcion: "familiar 24 unidades, triple hoja", precio: 24500}
]

productosModel.Guardar = function(post,callback){
    var posicion = productos.findIndex((producto) => producto.codigo == post.codigo); 

    if(posicion == -1){
        productos.push({codigo: post.codigo, nombre: post.nombre, descripcion: post.descripcion, precio: post.precio});
        return callback({state:true, mensaje: "Se almacenó el producto correctamente."});
    }
    else {
        return callback({state:false, mensaje: "El código "+post.codigo+" ya existe, ingrese un código único, por favor."});
    }

}

productosModel.ListarTodos = function(post,callback){
    return callback(productos)
}

productosModel.ListarporCodigo = function(post,callback){
    var resultado = productos.find((producto) => producto.codigo == post.codigo) 

    if(resultado == "" || resultado == null || resultado == undefined ){
        return callback({state:false, mensaje: "El código del producto no existe. No es posible listarlo."});

    }
    else {
        return callback({state:true, resultado});
    }
}

productosModel.Modificar = function(post,callback){
    var posicion = productos.findIndex((producto) => producto.codigo == post.codigo); 

    if(posicion==-1){
        return callback({state:false, mensaje: "El código del producto no existe."});
    }
    else {
        productos[posicion].nombre = post.nombre;
        productos[posicion].descripcion = post.descripcion;
        productos[posicion].precio = post.precio;
        return callback({state:true, mensaje: "Se actualizó el producto con código "+post.codigo+" y nombre "+post.nombre+"."});
    }
}

productosModel.Eliminar = function(post,callback){
    var posicion = productos.findIndex((producto) => producto.codigo == post.codigo); 

    if(posicion == -1){
        return callback({state:false, mensaje: "El código del producto no existe. No es posible eliminarlo."});
    }
    else {
        productos.splice(posicion, 1);

        callback({state:true, mensaje: "Se eliminó el producto con código "+post.codigo+"."});
    }
}
module.exports.productosModel = productosModel