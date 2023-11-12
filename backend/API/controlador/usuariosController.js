const { response, application } = require("express");

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
        
        post.password = sha256(config.encryptStart+post.password+config.encryptEnd);

        usuariosModel.ExisteCorreo(post,function(res){
            if(res.existe == "No"){

                const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                post.codigoact = abc[Math.floor(Math.random() * 26)]+abc[Math.floor(Math.random() * 26)]+Math.floor(Math.random()*(99999-10000 + 1)+10000)+abc[Math.floor(Math.random() * 26)]+abc[Math.floor(Math.random() * 26)]

                usuariosModel.Guardar(post,function(respuesta){
                    if(respuesta.state == true){
                        //Envíar correo electrónico
                        
                        let transporter = nodemailer.createTransport({
                            host:"smtp.gmail.com",
                            port: 587,
                            requireTLS: true,
                            secure:false,
                            auth: {
                                user: config.userGmail,
                                pass: config.pasGmail
                            }
                        })

                        var mailOptions = {
                            from: config.userGmail,
                            to:post.correo,
                            subject:"Verificación registro ExpandMind",
                            html:
                            `<div style="font-family: Arial, sans-serif;line-height: 1.6;background-color: #FF8C00;margin: 0;padding: 42px;">

                            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                                    <h1 style="font-size: 24px; color: #333333; margin-bottom: 20px;">Activación de cuenta Amplía-Mente</h1>
                                    <p>¡Hola!,</p>
                                    <p>Gracias por registrarte en nuestro sitio; celebramos tú iniciativa por aprender y expandir tus conocimientos. Para activar tu cuenta, haz clic en el siguiente enlace:</p>
                                    <div style="display: flex; flex-flow: row; justify-content: center; padding: 0; margin: 0">
                                        <p style="margin: 0;"><a style="display: inline-block; padding: 10px 20px; background-color: #FF6347; color: #ffffff; text-decoration: none; border-radius: 8px; margin: 0; ;" href="http://localhost:${config.puerto}/usuarios/Activarcuenta/${post.correo}/${post.codigoact}">Activar cuenta</a></p>
                                    </div>
                                    <p>Si el enlace no funciona, copia y pega la siguiente URL en tu navegador:</p>
                                    <p style="color: #FF6347; text-align: center;">http://localhost:${config.puerto}/usuarios/Activarcuenta/${post.correo}/${post.codigoact}</p>
                                    <p>Si no has creado una cuenta en nuestro sitio, puedes ignorar este correo electrónico.</p>
                                    <p>Un caluroso saludo,</p>
                                    <p>El equipo de Amplía-Mente</p>
                            </div>
                        </div>`
                        }
                        
                        transporter.sendMail(mailOptions, (error,info)=>{
                            if(error){
                                response.json(error)
                            }else{
                                response.json({state:true, mensaje:"Usuario creado correctamente. Verifique su bandeja de entrada para activarla."})
                            }
                        })
                    }
                    else{
                        response.json(respuesta)
                    }
                    
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

    post.password = sha256(config.encryptStart+post.password+config.encryptEnd);

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

usuariosController.Activarcuenta = function(request,response){
    var post = {
        correo: request.params.correo,
        codigoact: request.params.codigoact
    }

    if(post.correo==undefined || post.correo == null || post.correo ==""){
        response.status(406).json({state:false, mensaje: "El correo electrónico es obligatorio para efectuar la operación."});
        return false;
    }

    if(post.codigoact==undefined || post.codigoact == null || post.codigoact ==""){
        response.status(406).json({state:false, mensaje: "El código de activación es obligatorio para efectuar la operación."});
        return false;
    }

    usuariosModel.BuscarCodigoActivacion(post, function(respuesta){
        if (respuesta.state== false){
            response.json({state:false, mensaje: "Código o correo electrónico inválidos."});
            return false;
        } else{
            if (respuesta.estado == 1){
                response.json({state: true, mensaje: "Su cuenta ya se encontraba activa."})
            }else{
                usuariosModel.CambiarEstado(post, function(resestado){
                    if(resestado.state == true){
                        response.json({state: true, mensaje: "Cuenta activada, ya puede iniciar sesión."});
                    } else {
                        response.json({state: false, mensaje: "Ocurrió un error al activar la cuenta."});
                    }
                })
            }
        }
    })

}

module.exports.usuariosController = usuariosController