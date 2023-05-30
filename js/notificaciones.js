
function cargar_notifiaciones() {
    var notificaciones = JSON.parse( localStorage.getItem("notificaciones"));
    // Crea una notificacion en html para todas las notificaciones que ha recibido el usuario
    for (j = 0; j < notificaciones.length ; j++) {
        crear_notificacion(notificaciones[j]);
    }
    // Ventana para cuando el usuario no tiene ninguna notificacion
    if (notificaciones.length != 0){
        $(".ventana_no_noti").hide();
    }
    
}

function crear_notificacion(notificacion) {
    const notificacion_contenedor = document.createElement("div");
    notificacion_contenedor.className = "notificacion_contenedor";
    const parrafo = document.createElement("p");
    var canciones = ""
    // Se prepara un string con todas las canciones de la playlist
    for (i=0; i<notificacion[1][1].length; i++){
        if (i == 0){
            canciones = canciones + " " + notificacion[1][1][i];
        }
        else {
        canciones = canciones + ", " + notificacion[1][1][i];
        }
    }
    // Se añade el mensaje de la notificacion
    parrafo.textContent = notificacion[0] + " ha compartido la playlist " + notificacion[1][0] + " contigo. La playlist contiene estas canciones: " + canciones + "¿Quieres agregarla a tus playlist?"
    // Html del boton de aceptar
    const boton_aceptar = document.createElement("button");
    boton_aceptar.className = "boton";
    boton_aceptar.textContent = "Añadir";
    boton_aceptar.onclick = aceptar(notificacion , notificacion[1][0]);
    // Html del boton de cancelar
    const boton_cancelar = document.createElement("button");
    boton_cancelar.className = "boton";
    boton_cancelar.textContent = "Rechazar";
    boton_cancelar.onclick = rechazar(notificacion);
    // Se añaden todos los elementos al html
    notificacion_contenedor.appendChild(parrafo);
    notificacion_contenedor.appendChild(boton_aceptar);
    notificacion_contenedor.appendChild(boton_cancelar);
    const div_notificaciones = document.getElementById("notificaciones");
    div_notificaciones.appendChild(notificacion_contenedor);
}

function rechazar_notificacion(notificacion){
    var notificaciones = JSON.parse( localStorage.getItem("notificaciones"));
    var nuevas_notificaciones = notificaciones;
    // Se busca la notificacion y se elimina 
    for (noti = 0 ; noti < notificaciones.length ; noti++){
        if (notificaciones[noti][0] == notificacion[0] && notificaciones[noti][1][0] == notificacion[1][0]){
            nuevas_notificaciones.splice(noti, 1);
            break;
        }
    }

    // Se sube al localstorage la nueva lista de notificaciones
    localStorage.setItem ("notificaciones", JSON.stringify ( nuevas_notificaciones ) );
    // Se actualiza la pagina para que vuelvan a cargar las notificaciones
    window.location.href = "notificaciones.html";
}

function aceptar_notificacion(notificacion , nombre){
    repetido = nombre_repetido(nombre);
    if (repetido == true){
        const boton = document.getElementById("boton_nombre");
        boton.onclick = confirmar_nombre(notificacion);
        $(".ventana_nombre").show();
    }
    else{
        var playlist = JSON.parse( localStorage.getItem("play_list"));
        // Se eliminara la notificacion como si se hubiera rechazado
        rechazar_notificacion(notificacion);
        // Se añade la playlist enviada
        playlist_nueva = notificacion[1];
        playlist_nueva[0] = nombre;
        playlist.push(playlist_nueva);
        localStorage.setItem ("play_list", JSON.stringify ( playlist ) );

    }
}

// Funcion que cierra la ventana para cambiar el nombre de la playlist
function cerrar_ventana_nombre (){
    $(".ventana_nombre").hide();
}

// Funcion onclick para rechazar la notificacion
function rechazar(notificacion){
    return function(){rechazar_notificacion(notificacion)}
}

// Funcion onclick para aceptar la notificacion
function aceptar(notificacion , nombre){
    return function(){aceptar_notificacion(notificacion , nombre)}
}

function confirmar_nombre(notificacion){
    return function(){nombre_repetido_correcto(notificacion)}
}

function nombre_repetido_correcto(notificacion){
    nombre_introducido = document.getElementById("nombre_introducido").value;
    if (nombre_repetido(nombre_introducido) == false){
        aceptar_notificacion(notificacion , nombre_introducido);
        cerrar_ventana_nombre ();
    }
}

