//Variables uasadas para obtener los valores añadidos a los campos
user = document.getElementById("usuario__id");
contrasena = document.getElementById("contrasena__id");
conf__contrasena = document.getElementById("contrasena2__id");
nombre = document.getElementById("nombre__id");
fecha__nacimiento = document.getElementById("fecha__nacimiento__id");
email = document.getElementById("email__id");
pfp = document.getElementById("pfp__id");
enviar = document.getElementsByClassName("enviar__boton");

function modificar(clase){
    //Modifica los datos que tiene en la base de datos la web en caso de que pase todas las pruebas de error
    elemento = clase.substring(0, clase.length - 13)
    elemento_id = elemento + "__id"
    var variable_mod = document.getElementById(elemento_id).value;
    errores = []
    if (elemento == "usuario") {
        //comprueba que el nombre de usuario sea el correcto
        validar_usuario(variable_mod, errores)
    }
    if (elemento == "contrasena") {
        //Comprueba que la contraseña tenga formato correcto
        validar_contrasena(variable_mod, errores)
    }
    if (elemento == "email") {
        //Comprueba que el email tenga el formato correcto y no esté repetido
        validar_correo(variable_mod, errores)
    }
    if (variable_mod == null || variable_mod == ""){
        console.log(variable_mod)
        errores = "Porfavor, introduce una modificación"
    }
    if (errores.length == 0) { /*No fallos, modificamos*/
        parrafo = document.getElementById("errores");
        parrafo.innerHTML = "Dato modificado";
        localStorage.setItem(elemento , variable_mod);
        guardar_modificado(user);
        completar_cuenta();
    }
    else {
        //Si hay errores los muestra
        parrafo = document.getElementById("errores");
        console.log(errores)
        parrafo.innerHTML = errores;
    }
    $("#errores").show(1)
}

/*¿No sirve para nada esta función?*/
function error_modificacion(errores){
    var parrafo = document.getElementById("errores");
    parrafo.innerHTML = errores;
}

function boton_modificar(clase){
    var className = "." + clase
    $(className).toggle()

}

function esconder_errores(){
    $("#errores").hide()
}