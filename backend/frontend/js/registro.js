//Petición al backend
class herramientas {
    mensajes = [];

    post = function(url,data,callback) {

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
    
        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            return callback(JSON.parse(this.responseText))
        }
        });
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
        xhr.send(data);
    }

    get = function(url,callback) {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
    
        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            return callback(JSON.parse(this.responseText))
        }
        });
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
        xhr.send();
    }

    imprimirMensajes = function(tipo, mensaje){
        var misMensajes = document.getElementById("misMensajes");
        this.mensajes.push({tipo:tipo,mensaje:mensaje});
        misMensajes.innerHTML = "";

        for (let a = 0; a < this.mensajes.length; a++) {
            misMensajes.innerHTML += `<div class="alert alert-${this.mensajes[a].tipo}" role="alert">
                                ${this.mensajes[a].mensaje}
                            </div>`

        }

        setTimeout(()=>{
            this.mensajes.splice(0,1);
            misMensajes.innerHTML = "";
            for (let a = 0; a < this.mensajes.length; a++) {
                misMensajes.innerHTML += `<div class="alert alert-${this.mensajes[a].tipo}" role="alert">
                                    ${this.mensajes[a].mensaje}
                                </div>`
    
            }
        },4000);

    }

}

var miHost = "http://localhost:3000";
var herramienta = new herramientas;

var registrar = function(){

    var nombre = document.getElementById("nombre").value;
    var correo = document.getElementById("correo").value;
    var password = document.getElementById("password").value;

    if(nombre==undefined || nombre == null || nombre ==""){
        herramienta.imprimirMensajes("danger","El nombre es obligatorio para efectuar la operación.");
        return false;
    }

    if(correo==undefined || correo == null || correo ==""){
        herramienta.imprimirMensajes("danger","El correo electrónico es obligatorio para efectuar la operación.");
        return false;
    }

    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(correo) == false) {
        herramienta.imprimirMensajes("danger","El correo electrónico no es uno válido.");
        return false
    }

    if(password==undefined || password == null || password ==""){
        herramienta.imprimirMensajes("danger","La contraseña es obligatoria para efectuar la operación.");
        return false;
    }

    if (password.lenght > 15 || password.lenght < 8){
        herramienta.imprimirMensajes("danger", "La contraseña debe tener mínimo 8 y máximo 15 caracteres.");
        return false;
    }
 
    post = {
        host: miHost,
        path:"/usuarios/Guardar",
        payload:`nombre=${nombre}&correo=${correo}&password=${password}`,

    }

    herramienta.post(post.host+post.path,post.payload,function(respuesta){
        console.log(respuesta)
        if(respuesta.state == false){
            herramienta.imprimirMensajes("danger",respuesta.mensaje);
        }
        else{
            herramienta.imprimirMensajes("success",respuesta.mensaje);
            window.open("http://localhost:3000/login.html");
        }
    })
}

