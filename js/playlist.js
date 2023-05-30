const lista = document.getElementById("canciones");
var isRandom = 0;

Sortable.create(lista , {});

function activar_aleatorio(){
    var random = document.getElementsByClassName("boton_random");
    if (isRandom == 0){
        isRandom = 1;
        document.getElementById("random_off").setAttribute("id", "random_on")
    }
    else{
        isRandom = 0;
        document.getElementById("random_on").setAttribute("id", "random_off")
    }


}

function play_siguiente_cancion(){
    var lista_ahora = localStorage.getItem("lista_actual");
    var audio = document.getElementById('audio').class;
    if (lista_ahora == "like"){ //Obtencion de la playlist de likes
        var canciones = JSON.parse(localStorage.getItem ( "like" ));
    } else {  // Obtencion de cualquier playlist
        var playlist = JSON.parse( localStorage.getItem ( "play_list" ));
        for (i = 0; i < playlist.length; i++){
            if (playlist[i][0] == lista_ahora) {
                var canciones = playlist[i][1];
            }
        }
    }
    // Eliminamos lo que no nos interesa del audio
    console.log(audio);
    if (isRandom == 1){
        var nueva_cancion = audio
        // Generamos una nueva canción que debe ser distinta de la que suena actualmente
        while (nueva_cancion == audio){
        var cancionindex = Math.floor(Math.random() * canciones.length);
        nueva_cancion = canciones[cancionindex]
        play__cancion(nueva_cancion);
        }
    }
    else{
        //Busca que número de la playlist es la canción actual
        for(i = 0; i < canciones.length; i++){
            if (canciones[i] == audio){
                var cancionindex = i
            }
        }
        //Si es la última canción de la playlist pone la primera
        if (cancionindex == canciones.length - 1){
            play__cancion(canciones[0])
        }
        else{
            //Pone la siguiente canción en la playlist
            play__cancion(canciones[cancionindex + 1])
        }
    }
    


}

function crear_playlist(){
    // Ocultar el buscador para añadir canciones
    let input = document.getElementById('search_cancion').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('buscador_cancion');

    if (input == "" || input==null){ 
        for (i = 0; i < x.length; i++) { 
            x[i].style.display="none";
        }
   }

    id = localStorage.getItem("lista_actual");
    canciones = "";
    if (id == "like"){ //Obtencion de la playlist de likes
        $(".no_buscador_like").hide();
        canciones = JSON.parse(localStorage.getItem ( "like" ));
    } else {  // Obtencion de cualquier playlist
        playlist = JSON.parse( localStorage.getItem ( "play_list" ));
        for (i = 0; i < playlist.length; i++){
            if (playlist[i][0] == id) {
                canciones = playlist[i][1];
            }
        }
    }
    boton = document.getElementsByClassName("eliminar_playlist");
    boton.id = id; 
    for ( i = 0; i < canciones.length ; i++ ) {
        crear_cancion(canciones[i]);
    }
}

function añadir_cancion_playlist (id){
    lista_ahora = localStorage.getItem("lista_actual");
    var lista = [];
    if (lista_ahora != "like"){
        listas = JSON.parse( localStorage.getItem ( "play_list" ));
        for (i = 0; i < listas.length; i++){
            if (listas[i][0] == lista_ahora){
                lista_completa = listas[i];
                lista = listas[i][1];
                pos = i;
            }
        }
        listas.splice(pos , pos+1);
    }else {
        lista = JSON.parse( localStorage.getItem ( "like" ));
    }
    lista.push(id);
    if (lista_ahora == "like"){
        localStorage.setItem ("like", JSON.stringify ( lista ) );
    }else{
        console.log(lista_completa);
        lista_completa[1] = lista;
        listas.push (lista_completa)
        localStorage.setItem ("play_list", JSON.stringify ( listas ) );
    }
    crear_cancion(id);
    hay_canciones();
    /*setTimeout(function(){ alert("Hello"); }, 3000);*/
}

function crear_cancion(nombre){
    // Creacion del div cancion
    const cancion = document.createElement("div");
    cancion.className = "cancion";
    cancion.onclick = crear_play_cancion(nombre);
    // Creacion de la imagen
    const imagen_cancion = document.createElement("img");
    imagen_cancion.src = "/images/" + nombre + ".jfif";
    imagen_cancion.className = "imagen_cancion";
    imagen_cancion.alt = nombre
    // Creacion del h3
    const h3_cancion = document.createElement("h3");
    h3_cancion.id = "nombre_cancion";
    h3_cancion.textContent = nombres_canciones[nombre];
    // Creacion de play
    const play = document.createElement("img");
    play.src = "/images/play.png";
    play.className = "play";
    play.id = nombre;
    play.alt = "boton_play"

    const imagen_pl2 = document.createElement("img");
    imagen_pl2.src = "images/basura.png";
    imagen_pl2.className = "basura-cancion"
    imagen_pl2.alt = "basura"
    imagen_pl2.onclick = borrador2(nombre);

    //Añado todo a el html
    cancion.appendChild(imagen_cancion);
    cancion.appendChild(play);
    cancion.appendChild(h3_cancion);
    cancion.appendChild(imagen_pl2)
    const canciones_div = document.getElementById("canciones");
    canciones_div.appendChild(cancion);
}


$(".ventana_eliminar2").hide();
function cancelar_eliminado2(){
    $(".ventana_eliminar2").hide();
}

function borrar_cancion(id){
    localStorage.setItem("borrar_cancion", id);
    $(".ventana_eliminar2").show();
}

function borrador2(id){
    return function(){borrar_cancion(id)}
}

function eliminar_cancion(){
    //Se elimina una canción de la playlist
    const song = localStorage.getItem("borrar_cancion");
    var play_list = JSON.parse( localStorage.getItem ( "play_list" ));
    const play_list2 = localStorage.getItem("lista_actual");
    var play_list3 = 0;
    var pos = 0;
    var pos_list = 0;
    //Se obtiene la posición en la que se encuentre la canción en la lista de playlist
    if (play_list2 != "like"){
        //Se busca cuál es la playlist de la que borrar la canción
    for (i= 0; i<play_list.length; i++){
        if (play_list[i][0] == play_list2){
            play_list3 = play_list[i];
            pos_list = i;
        }
    }
    //Se obtiene la posición en la playlist de la canción
    for (i=0; i<play_list3[1].length; i++){
        if (play_list3[1][i]==song){
            pos = i;
        }
    }
    //Se elimina esa canción de la playlist
    play_list3[1].splice(pos, 1);
    play_list[pos_list] = play_list3;
    localStorage.setItem ("play_list", JSON.stringify ( play_list ) );}

    else {
        //en caso de que la canción tenga en la playlist de like la búsqueda se hace de la lista de canciones con like
        var play_like = JSON.parse( localStorage.getItem ("like"));
        var pos_like = 0;

        for (i = 0; i < play_like.length ; i++){
            if (play_like[i] == song){
                pos_like = i;
            }
        }
        play_like.splice(pos_like, 1);
        localStorage.setItem ("like", JSON.stringify ( play_like ) );
    }
    window.location.href = "playlist.html";
}

function crear_play_cancion(id){
    return function(){play__cancion(id)}
}


function buscador_playlist() {
    //Busca canción como los buscadores que hay en todos lados
    let input = document.getElementById('search_cancion').value;
    input=input.toLowerCase();
    let x = document.getElementsByClassName('buscador_cancion');

    if (input == "" || input==null){ 
        for (i = 0; i < x.length; i++) { 
            x[i].style.display="none";
        }
   }

    else{
        for (i = 0; i < x.length; i++) { 
            if (!x[i].innerHTML.toLowerCase().includes(input)) {
                x[i].style.display="none";
            }
            else {
                x[i].style.display="list-item";                 
            }
        }
    }
}

$(".no_canciones").hide();
function hay_canciones(){
    //Si no hay canción muestra un mensaje de que no hay canciones en la playlist
    play_list =  localStorage.getItem("lista_actual");
    var lista = [];
    //Obtiene la playlist en la que hay que comprobar si hay canciones añadidas
    if(play_list == "like"){
        lista = JSON.parse(localStorage.getItem("like"));
    }
    else {
        listas = JSON.parse( localStorage.getItem("play_list"));
        for (i = 0 ; i < listas.length ; i++){
            if (listas[i][0] == play_list){
                lista = listas[i][1];
            }
        }
    }
    //En caso de que no haya canciones enseña el mensaje
    if (lista.length == 0){
        $(".no_canciones").show();
    }
    else{
        $(".no_canciones").hide();
    }
}

// Aparece ventana para compartir una playlist
$(".ventana_compartir").hide();
function aparece_ventana_compartir() {
    $(".ventana_compartir").show();
}

// Desaparece ventana para compartir una playlist
function desaparece_ventana_compartir() {
    $(".ventana_compartir").hide();
}

// Añadir al selector de opciones los seguidores
function anadir_opciones_seguidos () {
    seguidos = JSON.parse( localStorage.getItem("follow"));
    // Se recorre la lista se seguidos
    var usuario = localStorage.getItem("usuario");
    for (i=0; i < seguidos.length ; i++){
        // Se añade al selector la opcion
        if (seguidos[i] != usuario ){
        anadir_opcion(seguidos[i]);
        }
    }
}

function anadir_opcion (opcion_valor) {
    // Se añade el html de la opcion
    var seleccion = document.getElementById("selecion-usuario_id");
    var opcion = document.createElement("option");
    opcion.textContent = opcion_valor;
    seleccion.appendChild(opcion);
}


function enviar_notificacion(){
    var selec = document.getElementById("selecion-usuario_id");
    var receptor = selec.value;
    var emisor = localStorage.getItem("usuario");
    var playlist_nombre = localStorage.getItem("lista_actual");

    var personas = JSON.parse( localStorage.getItem("personas"));
    var lista_playlists = JSON.parse( localStorage.getItem("play_list"));
    if (playlist_nombre == "like") {
        var playlist = ["likes de " + emisor , JSON.parse(localStorage.getItem ( "like" ))]; }
    else {
    for (j = 0; j < lista_playlists.length; j++){
        if (lista_playlists[j][0] == playlist_nombre){
            var playlist = lista_playlists[j]
        }
    }
    }
    for (i = 0; i < personas.length ; i++){
        if (personas[i].nombreUsuario == receptor){
            var lista_notificaciones = JSON.parse (personas[i].notificaciones) ;
            if (lista_notificaciones == null){
                lista_notificaciones = [];
            }
            noti_enviada = false;
            for (x = 0 ; x < lista_notificaciones.length ; x++){
                if (lista_notificaciones[x][0] == emisor && lista_notificaciones[x][1][0] == playlist[0]){
                    lista_notificaciones[x] = [emisor, playlist];
                    noti_enviada = true;
                }
            }
            if (noti_enviada == false) {
                lista_notificaciones.push([emisor, playlist]);
            }
            personas[i].notificaciones = JSON.stringify (lista_notificaciones);
            localStorage.setItem ("personas", JSON.stringify ( personas ) );
        }
    }
    desaparece_ventana_compartir();
}