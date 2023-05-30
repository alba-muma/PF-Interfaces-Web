//Variables uasadas para obtener los valores añadidos a los campos
user = document.getElementById("usuario__id");
contrasena = document.getElementById("contrasena__id");

function sesion() {
    errores = [];
    var parrafo = document.getElementById("mensaje_error");
    personas = JSON.parse( localStorage.getItem ( "personas" ));
    persona_encontrada = ""
    //Comprueba que el usuario esté registrado en la web
    for (let i = 0; i<personas.length; i++) {
        if (user.value == personas[i].nombreUsuario) {
            persona_encontrada = personas[i]
        }
    }
    if (persona_encontrada == "") {
        errores.push("No esta registrado ese nombre de usuario");
    }
    else {
        if (persona_encontrada.contrasenaUsuario != contrasena.value){
            errores.push("La contraseña no coincide");
        }
    }

    if (errores.length != 0){
        $(".errores").show();
        for (i = 0; i < errores.length ; i++){
            var h3_errores = document.createElement("h3");
            h3_errores.textContent = errores[i];
            h3_errores.className = "error";
            parrafo.appendChild(h3_errores);
        }
    }
    else {
        //Si está registrado se actualizarán los valores de usuario actual
        localStorage.setItem( "usuario", persona_encontrada.nombreUsuario );
        localStorage.setItem( "contrasena", persona_encontrada.contrasenaUsuario );
        localStorage.setItem( "nombre", persona_encontrada.nombreCompleto );
        localStorage.setItem( "nacimiento", persona_encontrada.fechaNacimiento );
        localStorage.setItem( "email", persona_encontrada.emailUsuario );
        localStorage.setItem( "pfp",  persona_encontrada.pfpUsuario );
        localStorage.setItem( "like", persona_encontrada.like );
        localStorage.setItem( "play_list", persona_encontrada.play_list );
        localStorage.setItem( "follow", persona_encontrada.follow );
        localStorage.setItem("generos", persona_encontrada.generos);
        localStorage.setItem("notificaciones", persona_encontrada.notificaciones)

        window.location.href = "home.html";
        actualizar__cabecera()
    }
}

