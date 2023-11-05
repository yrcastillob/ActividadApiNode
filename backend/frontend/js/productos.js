var Guardar = function(){
    
    var codigoProducto = parseInt(document.getElementById("codigoproducto").value);
    var nombre = document.getElementById("nombreproducto").value;
    var descripcionProducto = document.getElementById("descripcionproducto").value;
    var precioProducto = parseFloat(document.getElementById("precioproducto").value);
    // WARNING: For POST requests, body is set to null by browsers.
    var data =`codigo=${codigoProducto}&nombre=${nombre}&descripcion=${descripcionProducto}&precio=${precioProducto}`

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        var respuesta = JSON.parse(this.responseText);
        var misMensajes = document.getElementById("mensajesResultado");
        if (respuesta.state == false) {
            misMensajes.innerHTML = `<div class="alert alert-danger" role="alert">
           ${respuesta.mensaje}</div>`
        } else if (respuesta.state == true) {
            misMensajes.innerHTML = `<div class="alert alert-success" role="alert">
           ${respuesta.mensaje}</div>`
        }
        listarTodos();
    }
    });

    xhr.open("POST", "Productos/Guardar");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send(data);
}

var listarTodos = function(){
    // WARNING: For POST requests, body is set to null by browsers.
    var data = "";

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        var respuesta = JSON.parse(this.responseText).reverse();
        var datos = document.getElementById("seccionTablaResultados");

       datos.innerHTML = "";

        for (let a = 0; a < respuesta.length; a++){
             datos.innerHTML += `<tr>
                 <th scope="row" onclick="ListarporCodigo(${respuesta[a].codigo})">${respuesta[a].codigo}</th>
                 <td onclick="ListarporCodigo(${respuesta[a].codigo})">${respuesta[a].nombre}</td>
                 <td onclick="ListarporCodigo(${respuesta[a].codigo})">${respuesta[a].descripcion}</td>
                 <td onclick="ListarporCodigo(${respuesta[a].codigo})">${respuesta[a].precio}</td>
                 <td><button type="button" class="btn btn-danger" onclick="eliminar(${respuesta[a].codigo})">Eliminar</button></td>
                 <td><button type="button" class="btn btn-info" onclick="ListarporCodigo(${respuesta[a].codigo})">Editar</button></td>
                 </tr>`
        }
                
    }
    });

    xhr.open("POST", "Productos/ListarTodos");

    xhr.send(data);
}

var eliminar = function(codigo){
    // WARNING: For POST requests, body is set to null by browsers.
    var data = `codigo=${codigo}`;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        var respuesta = JSON.parse(this.responseText);
        var misMensajes = document.getElementById("mensajesResultado");
        if (respuesta.state == false) {
            misMensajes.innerHTML = `<div class="alert alert-danger" role="alert">
           ${respuesta.mensaje}</div>`
        } else if (respuesta.state == true) {
            misMensajes.innerHTML = `<div class="alert alert-success" role="alert">
           ${respuesta.mensaje}</div>`
        }
        listarTodos()
    }
    });

    xhr.open("POST", "Productos/Eliminar");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send(data);
}

var ListarporCodigo = function(codigo){
    // WARNING: For POST requests, body is set to null by browsers.
    document.getElementById("botonGuardar").style.display = "none";
    document.getElementById("botonActualizar").style.display = "block";
    var data = `codigo=${codigo}`;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        var respuesta = JSON.parse(this.responseText);
        document.getElementById("codigoproducto").value = parseInt(respuesta.resultado.codigo);
        document.getElementById("nombreproducto").value = respuesta.resultado.nombre;
        document.getElementById("descripcionproducto").value = respuesta.resultado.descripcion;
        document.getElementById("precioproducto").value = parseFloat(respuesta.resultado.precio);
        document.getElementById("codigoproducto").setAttribute("disabled",true)
    }
    });

    xhr.open("POST", "Productos/ListarporCodigo");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send(data);
}

var Modificar = function(){

    var codigoProducto = parseInt(document.getElementById("codigoproducto").value);
    var nombre = document.getElementById("nombreproducto").value;
    var descripcionProducto = document.getElementById("descripcionproducto").value;
    var precioProducto = parseFloat(document.getElementById("precioproducto").value);
    // WARNING: For POST requests, body is set to null by browsers.
    var data =`codigo=${codigoProducto}&nombre=${nombre}&descripcion=${descripcionProducto}&precio=${precioProducto}`

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        var respuesta = JSON.parse(this.responseText);
        var misMensajes = document.getElementById("mensajesResultado");
        if (respuesta.state == false) {
            misMensajes.innerHTML = `<div class="alert alert-danger" role="alert">
           ${respuesta.mensaje}</div>`
        } else if (respuesta.state == true) {
            misMensajes.innerHTML = `<div class="alert alert-success" role="alert">
           ${respuesta.mensaje}</div>`
        }
        listarTodos();

        document.getElementById("botonGuardar").style.display = "block";
        document.getElementById("botonActualizar").style.display = "none";
        
    
        document.getElementById("codigoproducto").disabled = false;
        document.getElementById("codigoproducto").value = "";
        document.getElementById("nombreproducto").value = "";
        document.getElementById("descripcionproducto").value = "";
        document.getElementById("precioproducto").value = "";
    }
    });

    xhr.open("POST", "Productos/Modificar");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send(data);

    
}
listarTodos()
