
//Variables uasadas para obtener los valores añadidos a los campos
user = document.getElementById("usuario__id");
contrasena = document.getElementById("contrasena__id");
conf__contrasena = document.getElementById("contrasena2__id");
nombre = document.getElementById("nombre__id");
fecha__nacimiento = document.getElementById("fecha__nacimiento__id");
email = document.getElementById("email__id");
pfp = document.getElementById("pfp__id");
enviar = document.getElementsByClassName("enviar__boton");
//Declara en el LocalStorage la lista de  personas en vacío si no hay iniciado ningún usuario
lista_vacia = [];
if ( localStorage.getItem ("personas") == null) {
    localStorage.setItem ("personas", JSON.stringify ( lista_vacia ) );
}


function registro(){
    //Función que comprueba los valores introducidos
    errores = [];
    var parrafo = document.getElementById("mensaje_error"); 

    validar_contrasena(contrasena.value);

    if (contrasena.value != conf__contrasena.value){
        errores.push( "No coinciden las contraseñas" );
    }
    //Empiezan a validar los valores introducidos en los distintos campos
    validar_usuario(user.value);
    validar_correo(email.value);
    check = document.getElementById('condicion').checked;
    if ( !check) {
        errores.push( "No ha aceptado nuestras condiciones de uso");
    }
    if (fecha__nacimiento.value.length == 0){
        errores.push( "No has introducido tu fecha de nacimiento");
    }
    parrafo.innerHTML = "";
    if (errores.length != 0){
        $(".errores").show();
        for (i = 0; i < errores.length ; i++){
            parrafo.innerHTML += errores[i] + "<br>";
        }
    }
    
    else{ 
        //Si todos los argumenos son válidos se actualiza el usuario actual iniciado sesión
        localStorage.setItem( "usuario",  user.value);
        localStorage.setItem( "contrasena", contrasena.value);
        localStorage.setItem( "nombre",  nombre.value);
        localStorage.setItem( "nacimiento",  fecha__nacimiento.value);
        localStorage.setItem( "email",  email.value);
        localStorage.setItem( "pfp",  pfp.value);
        localStorage.setItem( "like", JSON.stringify ( [] ));
        localStorage.setItem( "play_list", JSON.stringify ( [] ));
        localStorage.setItem( "follow", JSON.stringify ( [] ));
        localStorage.setItem("generos", JSON.stringify([]));
        localStorage.setItem("notificaciones", JSON.stringify([]));
        //Y se añade la persona a la lista de personas logueadas
        var persona = {
            nombreCompleto: nombre.value,
            nombreUsuario: user.value,
            contrasenaUsuario: contrasena.value,
            fechaNacimiento: fecha__nacimiento.value,
            emailUsuario: email.value,
            pfpUsuario: pfp.value,
            like: [],
            play_list: [],
            follow: [], 
            generos: [],
            notificaciones: []
        };

        personas.push (persona);
        localStorage.setItem ("personas", JSON.stringify ( personas ) );

        window.location.href = "generos.html";

    }

}
function añadir_genero(genero, id){
    var user_generos = JSON.parse( localStorage.getItem ( "generos" ));
    var found = 0;
    for(i = 0; i < user_generos.length; i++){
        if (user_generos[i] == genero){
            found = 1;
            user_generos.splice(i, i+1);
            var newclass = "genero_off";
            document.getElementById(id).classList.add(newclass);
            document.getElementById(id).classList.remove("genero_on");

        }
        
    }
    if (found == 0){
        user_generos.push(genero);
        var newclass = "genero_on";
        document.getElementById(id).classList.add(newclass);
        document.getElementById(id).classList.remove("genero_off");

        
    }
    localStorage.setItem("generos", JSON.stringify(user_generos));
}
function enviar_generos(){
    window.location.href = "home.html";
    actualizar__cabecera();
}



