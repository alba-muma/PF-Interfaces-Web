/*Función con listado de canciones de nuestra página*/
nombres_canciones = {
    "AlAndalus": "Al Andalus",
    "Believer" : "Believer",
    "ComeAndGetYourLove" : "Come and Get Your Love",
    "ComoCamaron" : "Como camaron",
    "ElCuartetoDeIbai" : "El cuarteto De Ibai",
    "GameOver" : "Game over",
    "HijoDeLaLuna" : "Hijo de la luna",
    "LaLaLa" : "La la la",
    "LoseYourself" : "Lose Yourself",
    "Overwhelmed" : "Overwhelmed",
    "RapContraElRacismo" : "Rap contra el racismo",
    "Rema" : "Rema",
    "SoldaditoMarinero" : "Soldadito Marinero",
    "Sugar" : "Sugar",
    "TillICollapse": "Till I Collapse"
}

nombre_genero = [["AlAndalus", "pop"], ["Believer", "indie"], ["ComeAndGetYourLove", "rock"],
                ["ComoCamaron", "rock"], ["ElCuartetoDeIbai", "cumbia"], ["GameOver", "rap"],
                ["HijoDeLaLuna", "pop"], ["LaLaLa", "indie"], ["LoseYourself", "rap"],
                ["Overwhelmed", "indie"], ["RapContraElRacismo", "rap"], ["Rema", "rap"],
                ["SoldaditoMarinero", "pop_rock"], ["Sugar", "pop"], ["TillICollapse", "rap"]]


lista_vacia = [];
/*Si no se ha dado like a ninguna canción la lista está vacía*/
if ( localStorage.getItem ("like") == null) {
    localStorage.setItem ("like", JSON.stringify ( lista_vacia ) );
}

function add_canciones_genero(){
    if (nombre_introducido != "" && nombre_introducido != null){
    var user_generos = JSON.parse( localStorage.getItem ( "generos" ));
    var indexgeneros = 0;
    var added_songs = [];
    // Si el usuario no ha seleccionado ningún género se le añaden unas canciones por defecto
    if (user_generos.length == 0){
        for (i = 0; i < 5; i++){
            var cancion = document.createElement("div");
            cancion.className = "cancion";
            var imagencancion = document.createElement("img");
            imagencancion.className = "imagen_cancion";
            imagencancion.alt = "img-cancion";
            imagencancion.src = "images/" + nombre_genero[i][0] + ".jfif"
            var play = document.createElement("img");
            play.className = "play";
            play.src = "images/play.png";
            play.alt = "play";
            play.onclick = crear_play_cancion(nombre_genero[i][0]);
            play.id = nombre_genero[i][0];
            var titulo = document.createElement("h3");
            titulo.textContent = nombres_canciones[nombre_genero[i][0]]
            cancion.appendChild(imagencancion);
            cancion.appendChild(play);
            cancion.appendChild(titulo);
            const fila = document.getElementById("parati");
            fila.appendChild(cancion);

        }
    }
    else{
        var rondas_sin_añadir = 0;
        var canciones_añadidas = 0;
        
        
        while (canciones_añadidas < 5){
            var añadida_iteracion = 0;
            //Si en una iteración no se añaden canciones significa que no hay más canciones que añadir de ese género
            var canciones_añadidas_iteracion = 0;
            for (n = 0; n < nombre_genero.length; n++){
                if (nombre_genero[n][1] == user_generos[indexgeneros] && added_songs.includes(nombre_genero[n][0]) === false && añadida_iteracion == 0){
                    var cancion = document.createElement("div");
                    cancion.className = "cancion";
                    var imagencancion = document.createElement("img");
                    imagencancion.className = "imagen_cancion";
                    imagencancion.alt = "img-cancion";
                    imagencancion.src = "images/" + nombre_genero[n][0] + ".jfif"
                    var play = document.createElement("img");
                    play.className = "play";
                    play.src = "images/play.png";
                    play.alt = "play";
                    play.onclick = crear_play_cancion(nombre_genero[n][0]);
                    play.id = nombre_genero[n][0];
                    var titulo = document.createElement("h3");
                    titulo.textContent = nombres_canciones[nombre_genero[n][0]]
                    cancion.appendChild(imagencancion);
                    cancion.appendChild(play);
                    cancion.appendChild(titulo);
                    const fila = document.getElementById("parati");
                    fila.appendChild(cancion);
                    canciones_añadidas_iteracion++;
                    canciones_añadidas++;
                    added_songs.push(nombre_genero[n][0]);
                    añadida_iteracion = 1;
                    rondas_sin_añadir = 0;

                }
            }

            if (canciones_añadidas_iteracion == 0){
                rondas_sin_añadir++;

            }
            //Si no se añaden canciones en un número de rondas seguidas iguales a todos los géneros que tiene el usuario
            //Significa que no quedan canciones por añadir y por lo tanto se añadiran unas por defecto hasta completarlo
            if (rondas_sin_añadir == user_generos.length){
                var indice_canciones = 0;
                while(canciones_añadidas < 5){
                    if (added_songs.includes(nombre_genero[indice_canciones][0]) === false){
                        var cancion = document.createElement("div");
                        cancion.className = "cancion";
                        var imagencancion = document.createElement("img");
                        imagencancion.className = "imagen_cancion";
                        imagencancion.alt = "img-cancion";
                        imagencancion.src = "images/" + nombre_genero[indice_canciones][0] + ".jfif"
                        var play = document.createElement("img");
                        play.className = "play";
                        play.src = "images/play.png";
                        play.alt = "play";
                        play.onclick = crear_play_cancion(nombre_genero[indice_canciones][0]);
                        play.id = nombre_genero[indice_canciones][0];
                        var titulo = document.createElement("h3");
                        titulo.textContent = nombres_canciones[nombre_genero[indice_canciones][0]]
                        cancion.appendChild(imagencancion);
                        cancion.appendChild(play);
                        cancion.appendChild(titulo);
                        const fila = document.getElementById("parati");
                        fila.appendChild(cancion);
                        canciones_añadidas++;
                        added_songs.push(nombre_genero[indice_canciones][0]);
    
                    }
                    indice_canciones++;

                }

            }
            if (indexgeneros == user_generos.length - 1){
                indexgeneros = 0;
            }
            else{
                indexgeneros ++;

            }
            
        }
    }

    }}

function crear_play_cancion(id){
    return function(){play__cancion(id)}
}
function search__song() {
    /*Es el buscador de canciones*/
    let input = document.getElementById('search2').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('boton__cancion');
    /*Si no se ha escrito nada no aparece ninguna canción */
    if (input == "" || input==null){ 
        for (i = 0; i < x.length; i++) { 
            x[i].style.display="none";
        }
   }

    else{
        /*detecta que se ha introducido alguna letra y busca las canciones con esa letra*/
        for (i = 0; i < x.length; i++) { 
            if (!x[i].textContent.toLowerCase().includes(input)) {
                x[i].style.display="none";
            }
            else {
                x[i].style.display="list-item";                 
            }
        }
    }
}

$(".reproductor").hide();

if (localStorage.getItem ("like") == null) {
    localStorage.setItem ("like" , JSON.stringify(lista_vacia));
}

function play__cancion(id){
    //Primero se comprueba si el usuario ya le habia dado like
    actualizar__cabecera();
    usuario = localStorage.getItem("usuario");
    lista_likes = JSON.parse ( localStorage.getItem ( "like" ));
    encontrado = 0;
    if(usuario != ""  && usuario != null){
        for (i=0; i < lista_likes.length; i++){
            //Comprueba si se ha dado like a la canción
            if (lista_likes[i] == id)
                encontrado = 1;
        }
        if (encontrado == 1){
            //En caso de que se haya dado like se enseña el corazón rojo
            $(".like_active").show();
            $(".no_like").hide();
        } else {
            //En caso contrario el corazón negro
            $(".like_active").hide();
            $(".no_like").show();
        }
    }
    //Muestra el reproductor correspondiente
    path_cancion = "audio/" + id + ".mp3";
    path_imagen = "images/" + id + ".jfif";
    document.getElementById("audio").src = path_cancion;
    document.getElementById("audio").class = id;
    document.getElementById("reproductor__imagen").src = path_imagen;
    
    $(".reproductor").show();
    audio = document.getElementsByClassName("reproductor_audio");
    //Suena la canción correspondiente
    audio[0].load();
    audio[0].play();
    

}


function dar_like(){
    //Se obtiene el audio que se quiere dar like
    cancion = document.getElementById("audio").class;
    //se añade a la lista de likes la canción
    lista_likes = JSON.parse(localStorage.getItem ( "like" ));
    lista_likes.push(cancion);
    localStorage.setItem ("like", JSON.stringify ( lista_likes ) );
    //Se muestra el corazón en rojo
    $(".like_active").show();
    $(".no_like").hide();

}

function quitar_like(){
    //Camino inverso de la operación anterior
    cancion = document.getElementById("audio").class;
    lista_likes = JSON.parse(localStorage.getItem ( "like" ));
    var pos = 0;
    for (i = 0; i < lista_likes.length ; i++){
        if (lista_likes[i] == cancion){
            pos = i
        }
    };
    //Esta función elimina el elemento
    lista_likes.splice( pos , 1 );
    localStorage.setItem ("like", JSON.stringify ( lista_likes ) );
    $(".like_active").hide();
    $(".no_like").show();

}

$(".ventana_eliminar").hide();
//Eliminar canciones
function cancelar_eliminado(){
    $(".ventana_eliminar").hide();
}

//Mensaje que aparece cuando se presiona el cerrar sesión
$(".ventana_cerrar_sesion").hide();
function esconder_mensaje(){
    $(".ventana_cerrar_sesion").hide();
}

function aparecer_mensaje(){
    $(".ventana_cerrar_sesion").show();
}


function cerrar_sesion(){
    //Cuando se cierra sesiónse eliminan los datos de las variables respectivas de usuario actual
        guardar_modificado(localStorage.getItem( "usuario" ));
        localStorage.setItem( "usuario", "");
        localStorage.setItem( "contrasena", "");
        localStorage.setItem( "nombre", "");
        localStorage.setItem( "nacimiento", "");
        localStorage.setItem( "email", "");
        localStorage.setItem( "pfp", "");
        localStorage.setItem( "like", "");
        localStorage.setItem( "play_list", "");
        localStorage.setItem( "generos", "");
        localStorage.setItem( "notificaciones", "");
        window.location.href = "home.html";
        actualizar__cabecera();
}

function actualizar_pagina(){
    //Aparición y desaparición de  botón de la canción
    let x = document.getElementsByClassName('boton__cancion');
    for (i = 0; i < x.length; i++) { 
        x[i].style.display="none";
    }
    $(".lyrics").hide();
    actualizar__cabecera();
    $(".reproductor").hide();

}

function actualizar__cabecera(){
    nombre_introducido = localStorage.getItem("usuario") 
    if (nombre_introducido == "" || nombre_introducido == null){
        /*Cuando no está iniciada la sesión*/
        $(".iniciada").hide()
        $(".no_iniciada").show()
        $(".main__footer").show()
    }
    else {
        /* Cuando está iniciada la sesión*/
        $(".iniciada").show()
        $(".no_iniciada").hide()
        $(".main__footer").hide()
        const nombre_header = document.getElementById("nombre_header");
        nombre_header.innerHTML = nombre_introducido;
        imagen = localStorage.getItem("pfp");
        if (imagen != null && imagen != ""){
            document.getElementById("imagen_perfil").src = imagen;
        }
        else {
            document.getElementById("imagen_perfil").src = "/images/foto_perfil.webp";
        }
    }
}

function guardar_modificado(usuario){
    //Se añade a la lista de usuarios registrados el usuario actual
    personas = JSON.parse( localStorage.getItem ( "personas" ));
    posicion_persona = ""
    for (let i = 0; i<personas.length; i++) {
        //Se comprueba si el usuario está ya guardado
        if (usuario == personas[i].nombreUsuario) {
                posicion_persona = i
            }
        }
        //En caso de  que esté ya guardado se borra de la lista
        personas.splice(posicion_persona , (posicion_persona+1))
        //Se crea la nueva persona y se añade a la lista de personas
        var persona = {
            nombreCompleto: localStorage.getItem("nombre"),
            nombreUsuario: localStorage.getItem("usuario"),
            contrasenaUsuario: localStorage.getItem("contrasena"),
            fechaNacimiento: localStorage.getItem("nacimiento"),
            emailUsuario: localStorage.getItem("email"),
            pfpUsuario: localStorage.getItem("pfp"),
            like: localStorage.getItem("like"),
            play_list: localStorage.getItem("play_list"),
            follow: localStorage.getItem("follow"),
            generos: localStorage.getItem("generos"),
            notificaciones: localStorage.getItem("notificaciones")
        };
        personas.push(persona)
        localStorage.setItem ("personas", JSON.stringify ( personas ) );
}

function completar_cuenta(){
    actualizar__cabecera()
    $(".oculto").hide()
    //Se obtienen los valores que se han rellenado en los campos de registro
    var usuario_campo = document.getElementById("usuario_campo");
    usuario_campo.innerHTML = localStorage.getItem("usuario");

    var email_campo = document.getElementById("email_campo");
    email_campo.innerHTML = localStorage.getItem("email");

    var contrasena_campo = document.getElementById("contrasena_campo");
    contrasena_campo.innerHTML = localStorage.getItem("contrasena");

    var fecha_campo = document.getElementById("nacimiento_campo");
    fecha_campo.innerHTML = localStorage.getItem("nacimiento");

    var nombre_campo = document.getElementById("nombre_campo");
    nombre_campo.innerHTML = localStorage.getItem("nombre");

    foto = localStorage.getItem("pfp")
    if (foto != null && foto != "") {
        document.getElementById("pfp_campo").src = foto
    }

}

$(".errores").hide();
function cerrar_mensaje_errores(){
    $(".errores").hide();
    $(".error").remove();
}

function validar_correo(email){
    //Comprueba que el correo electrónico es válido, en caso contrario almacena el mensaje de error
    regex_mail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
    if  ( ! regex_mail.test(email)){
        errores.push ("El correo no es válido");
    }

    personas = JSON.parse( localStorage.getItem ( "personas" ));
    if (email == localStorage.getItem("email")) {
        errores.push ("El correo introducido es el mismo de antes ");
    } else {
    for (let i = 0; i<personas.length; i++) {
        if (email == personas[i].emailUsuario) {
            errores.push( "El correo ya tiene una cuenta asignada " );
        }
    }}
}

function validar_usuario(usuario){
    //comprueba que el nombre de usuario es válido y no es repetido
    if ((usuario.length < 3) || (usuario.length > 15)){
        errores.push ("El nombre no es válido");
    }
    personas = JSON.parse( localStorage.getItem ( "personas" ));
    if (usuario == localStorage.getItem("usuario")) {
        errores.push("El usuario introducido es el mismo de antes ");
    }else{
    for (let i = 0; i<personas.length; i++) {
        if (usuario == personas[i].nombreUsuario) {
            console.log(usuario)
            console.log(personas[i].nombreUsuario)
            errores.push("El usuario ya tiene una cuenta asignada ");
        }
    }
}
}

function validar_contrasena(contrasena) {
    //Comprueba que la contraseña sea correcta
    regex_cont = /^[a-z0-9]{2,8}$/
    if ( ! regex_cont.test(contrasena)){
        errores.push ( "La contraseña no es válida");
    }
}

function aparecer_lyrics(){
    cancion = document.getElementById("audio").class;
    lyrics = document.getElementById("lyrics");
    if (lyrics.textContent ==""){
        $(".lyrics").show();
        if (cancion == "AlAndalus"){
            lyrics.innerHTML = `Esta es la historia de una diosa <br>
            Como nunca hubo ninguna <br>
            Corria el arte en su mirada de color verde aceituna <br>
            De padre moro y de mujer cristiana <br>
            Con piel de reina y cuerpo de sultana <br>
            Movía sus manos como una gitana <br>
            Y su embrujo te robaba el alma <br>
            Cuentan que hubo mucho que intentaron conquistarla <br>
            Y otros tanto se quedaron hechizado solo con mirarla <br>
            Aunque hace tiempo nadie ha vuelto a verla <br>
            Yo sé que ella no es una leyenda <br>
            Y sé muy bien dónde podré encontrarla <br>
            A esa que todos llamaban <br>
            Al Andalus, Al Andalus <br>
            Llevo tu nombre de norte a sur <br>
            Al Andalus, eres la luz <br>
            Que deja ciego al que te mira <br>
            Al Andalus, Al Andalus <br>
            Grito tu nombre en la multitud <br>
            Eres deseo, Al Andalus <br>
            Y estoy soñando con hacerte mía <br>
            Dicen que la vieron paseando por la Alhambra <br>
            Y que en la ria de Huelva se lavo la cara <br>
            Luego, que si en la Giralda la oyeron cantando <br>
            Camino a Jaén <br>
            Y una Malagueña le contó que la buscaba <br>
            Y una Cordobesa confundí con su mirada<br>
            En Cadiz supe que yo la quería<br>
            Y en Almería yo la hice mía<br>
            Ahora sé dónde podré encontrarla<br>
            A la que todos llamaran<br>
            Al Andalus, Al Andalus<br>
            Llevo tu nombre de norte a sur<br>
            Al Andalus eres la luz<br>
            Que deja ciego al que te mira<br>
            Al Andalus, Al Andalus<br>
            Grito tu nombre en la multitud<br>
            Eres deseo Al Andalus<br>
            Y estoy soñando con hacerte mía<br>
            Al Andalus, Al Andalus, Al Andalus<br>
            (Oye, vamonos) no, no, no<br>
            Al Andalus me vuelves loco<br>
            Dame tu cielo, pero poco a poco<br>
            Al Andalus, me vuelves loco<br>
            Dame tu cielo, pero poco a poco<br>
            Al Andalus, me vuelves loco<br>
            Dame tu cielo, pero poco a poco<br>
            Al Andalus, me vuelves loco<br>
            Dame tu cielo pero poco a poco<br>
            Al Andalus, Al Andalus<br>
            Al Andalus, eres la luz<br>
            Que deja ciego al que te mira<br>
            Al Andalus, Al Andalus<br>
            Grito tu nombre en la multitud<br>
            Eres deseo, Al Andalus<br>
            Y no hay frontera pa' hacerte mia<br>
            Ah-aaah-aah<br>
            Ah-aaa-andalus<br>
            Al Andalus, me vuelves loco<br>
            Dame tu cielo, pero poco a poco<br>
            Al Andalus, me vuelves loco<br>
            Dame tu cielo pero poco a poco<br>
            Andalus`
        }
        if (cancion == "AmoresExtranos"){
            lyrics.innerHTML = `Mi dispiace devo andare via<br>
            Ma sapevo che era una bugia<br>
            Quanto tempo perso dietro a lui<br>
            Che promette e poi non cambia mai<br>
            Strani amori<br>
            Mettono nei guai<br>
            Ma, in realtà, siamo noi<br>
            E lo aspetti ad un telefono<br>
            Litigando che sia libero<br>
            Con il cuore nello stomaco<br>
            Un gomitolo nell'angolo<br>
            Lì da sola, dentro un brivido<br>
            Ma perché lui non c'è<br>
            E sono<br>
            Strani amori che<br>
            Fanno crescere e sorridere<br>
            Fra le lacrime<br>
            Quante pagine lì da scrivere<br>
            Sogni e lividi da dividere<br>
            Sono amori che spesso a questa età<br>
            Si confondono dentro a quest'anima<br>
            Che si interroga senza decidere<br>
            Se è un amore che fa per noi<br>
            E quante notti perse a piangere<br>
            Rileggendo quelle lettere<br>
            Che non riesci più a buttare via<br>
            Dal labirinto della nostalgia<br>
            Grandi amori che finiscono<br>
            Ma perché restano nel cuore<br>
            Strani amori che<br>
            Vanno e vengono<br>
            Nei pensieri che li nascondono<br>
            Storie vere che ci appartengono<br>
            Ma si lasciano come noi<br>
            Strani amori, fragili<br>
            Prigionieri, liberi<br>
            Strani amori mettono nei guai<br>
            Ma in realtà, siamo noi<br>
            Strani amori, fragili<br>
            Prigionieri liberi<br>
            Strani amori che non sanno vivere<br>
            E si perdono dentro noi<br>
            Mi dispiace devo andare via<br>
            Questa volta l'ho promesso a me<br>
            Perché ho voglia di un amore vero<br>
            Senza te`
        }
        if (cancion == "Believer"){
            lyrics.innerHTML =`First things first<br>
            I'ma say all the words inside my head<br>
            I'm fired up and tired of the way that things have been, oh-ooh<br>
            The way that things have been, oh-ooh<br>
            Second thing second<br>
            Don't you tell me what you think that I could be<br>
            I'm the one at the sail, I'm the master of my sea, oh-ooh<br>
            The master of my sea, oh-ooh<br>
            I was broken from a young age<br>
            Taking my sulking to the masses<br>
            Writing my poems for the few<br>
            That look at me, took to me, shook to me, feeling me<br>
            Singing from heartache from the pain<br>
            Taking my message from the veins<br>
            Speaking my lesson from the brain<br>
            Seeing the beauty through the...<br>
            Pain!<br>
            You made me a, you made me a believer, believer<br>
            Pain!<br>
            You break me down and build me up, believer, believer<br>
            Pain!<br>
            Oh, let the bullets fly, oh, let them rain<br>
            My life, my love, my drive, it came from...<br>
            Pain!<br>
            You made me a, you made me a believer, believer<br>
            First things first<br>
            Can you imagine what's about to happen?<br>
            It's Weezy the Dragon, I link with the Dragons<br>
            And we gon' get ratchet, no need for imaginin'<br>
            This is what's happenin'<br>
            Second thing second, I reckon immaculate<br>
            Sound about accurate<br>
            I know that strength, it don't come, don't come without strategy<br>
            I know the sweet, it don't come without cavities<br>
            I know the passages come with some traffic<br>
            I start with from the basement, end up in the attic<br>
            And third thing third<br>
            Whoever call me out, they simply can't count<br>
            Let's get mathematic, I'm up in this, huh<br>
            Is you a believer?<br>
            I get a unicorn out of a zebra<br>
            I wear my uniform like a tuxedo<br>
            This dragon don't hold his breath, don't need no breather<br>
            Love you Ms. Cita, the son of a leader<br>
            I know the bloomin' don't come without rain<br>
            I know the losin' don't come without shame<br>
            I know the beauty don't come without hurt<br>
            Hol' up, hol' up, last thing last<br>
            I know that Tunechi don't come without Wayne<br>
            I know that losin' don't come without game<br>
            I know that glory don't come without...<br>
            Don't come without...<br>
            Pain!<br>
            You made me a, you made me a believer, believer<br>
            Pain!<br>
            You break me down and build me up, believer, believer<br>
            Pain<br>
            Oh, let the bullets fly, oh, let them rain<br>
            My life, my love, my drive, it came from...<br>
            Pain!<br>
            You made me a, you made me a believer, believer<br>
            Last things last<br>
            By the grace of fire and flames<br>
            You're the face of the future, the blood in my veins, oh-ooh<br>
            The blood in my veins, oh-ooh<br>
            But they never did, ever lived, ebbing and flowing<br>
            Inhibited, limited 'til it broke open and rained down<br>
            It rained down, like...<br>
            Pain!<br>
            You made me a, you made me a believer, believer<br>
            Pain!<br>
            You break me down and build me up, believer, believer<br>
            Pain<br>
            Oh, let the bullets fly, oh, let them rain<br>
            My life, my love, my drive, it came from...<br>
            Pain!<br>
            You made me a, you made me a believer, believer`
        }
        if (cancion == "Bones"){
            lyrics.innerHTML =`Gimme, gimme, gimme some time to think<br>
            I'm in the bathroom, looking at me<br>
            Face in the mirror is all I need (ooh)<br>
            Wait until the reaper takes my life<br>
            Never gonna get me out alive<br>
            I will live a thousand million lives (ooh)<br>
            My patience is waning<br>
            Is this entertaining?<br>
            Our patience is waning<br>
            Is this entertaining?<br>
            I-I-I got this feeling, yeah, you know<br>
            Where I'm losing all control<br>
            'Cause there's magic in my bones<br>
            I-I-I got this feeling in my soul<br>
            Go ahead and throw your stones<br>
            'Cause there's magic in my bones<br>
            Playing with a stick of dynamite<br>
            There was never gray in black and white<br>
            There was never wrong 'til there was right (ooh, oh)<br>
            Feeling like a boulder hurtling<br>
            Seeing all the vultures circling<br>
            Burning in the flames I'm working in<br>
            Turning in a bed that's darkening<br>
            My patience is waning<br>
            Is this entertaining?<br>
            Our patience is waning<br>
            Is this entertaining?<br>
            I-I-I got this feeling, yeah, you know<br>
            Where I'm losing all control<br>
            'Cause there's magic in my bones (in my bones)<br>
            I-I-I got this feeling in my soul<br>
            Go ahead and throw your stones<br>
            'Cause there's magic in my bones<br>
            'Cause there's magic in my bones<br>
            Look in the mirror of my mind<br>
            Turning the pages of my life<br>
            Walking the path so many paced a million times<br>
            Drown out the voices in the air<br>
            Leaving the ones that never cared<br>
            Picking the pieces up and building to the sky<br>
            My patience is waning<br>
            Is this entertaining?<br>
            My patience is waning<br>
            Is this entertaining?<br>
            I-I-I got this feeling, yeah, you know<br>
            Where I'm losing all control<br>
            'Cause there's magic in my bones (magic in my bones)<br>
            I-I-I got this feeling in my soul (soul)<br>
            Go ahead and throw your stones<br>
            'Cause there's magic in<br>
            There goes my mind (I-I-I)<br>
            Don't mind<br>
            There goes my mind (there it goes, there it goes)<br>
            There goes my mind (I-I-I)<br>
            Don't mind (there it goes)<br>
            There goes my mind<br>
            'Cause there's magic in my bones`
        }
        if (cancion == "ComeAndGetYourLove"){
            lyrics.innerHTML =`Hey (hey) what's the matter with your head, yeah<br>
            Hey (hey) what's the matter with your mind and your sign and oh<br>
            Hey (hey) nothin' the matter with your head<br>
            Baby, find it, come on and find it<br>
            Bear with it, baby, 'cause you're fine<br>
            And you're mine, and you look so divine<br>
            Come and get your love<br>
            Come and get your love<br>
            Come and get your love<br>
            Come and get your love<br>
            Hey (hey) what's the matter with you, feel right?<br>
            Don't you feel right, baby?<br>
            Hey (hey) all right, get it from the main vine, all right<br>
            I said-a find it, find it, go on and love it if you like it, yeah<br>
            Hey (hey) it's your business if you want some, take some<br>
            Get it together, baby<br>
            Come and get your love<br>
            Come and get your love<br>
            Come and get your love<br>
            Come and get your love<br>
            Come and get your love, come and get your love<br>
            Come and get your love, now<br>
            Come and get your love, come and get your love<br>
            Come and get your love, now<br>
            Come and get your love, come and get your love<br>
            Come and get your love, now<br>
            Come and get your love, come and get your love<br>
            Come and get your love, now<br>
            Come and get your love<br>
            Come and get your love<br>
            Come and get your love<br>
            Come and get your love<br>
            Hey (hey) what's the matter with you, feel right?<br>
            Don't you feel right, baby?<br>
            Hey (hey) all right, get it from the main vine, all right<br>
            Come and get your love<br>
            Come and get your love<br>
            Come and get your love<br>
            Come and get your love<br>
            Come and get your love`
        }
        if (cancion == "ComoCamaron"){
            lyrics.innerHTML =`Superior a mí<br>
            Es la fuerza que me lleva en el pulso<br>
            Que mantengo con la oscuridad<br>
            Que tiñen de oscuro tus ojos negros<br>
            Y que me cuentas del tiempo<br>
            Que pasa en tu pestañeo<br>
            Y que me trae por esta calle<br>
            De amargura y de lamento<br>
            Que yo sé que la sonrisa<br>
            Que se dibuja en mi cara<br>
            Tiene que ver con la brisa<br>
            Que abanica tu mirada<br>
            Tan despacio y tan deprisa<br>
            Tan normal y tan extraño<br>
            Yo me parto la camisa<br>
            Como camarón<br>
            Tú me rompes las entrañas<br>
            Me trepas como una araña<br>
            Bebes del sudor que empaña<br>
            El cristal de mi habitación<br>
            Y después por la mañana<br>
            Despierto y no tengo alas<br>
            Llevo diez horas durmiendo<br>
            Y mi almohada está empapada<br>
            Todo había sido un sueño<br>
            Muy real y muy profundo<br>
            Tus ojos no tienen dueño<br>
            Porque no son de este mundo<br>
            Que no te quiero mirar<br>
            Pero es que cierro los ojos<br>
            Y hasta te veo por dentro<br>
            Te veo en un lado y en otro<br>
            En cada foto, en cada espejo<br>
            Y en las paradas del metro<br>
            Y en los ojos de la gente<br>
            Hasta en las sopas más calientes<br>
            Loco yo me estoy volviendo<br>
            Que yo sé que la sonrisa<br>
            Que se dibuja en mi cara<br>
            Tiene que ver con la brisa<br>
            Que abanica tu mirada<br>
            Tan despacio y tan deprisa<br>
            Tan normal y tan extraño<br>
            Yo me parto la camisa<br>
            Como camarón<br>
            Tú me rompes las entrañas<br>
            Me trepas como una araña<br>
            Bebes del sudor que empaña<br>
            El cristal de mi habitación<br>
            Y después por la mañana<br>
            Despierto y no tengo alas<br>
            Llevo diez horas durmiendo<br>
            Y mi almohada está empapada<br>
            Todo había sido un sueño<br>
            Muy real y muy profundo<br>
            Tus ojos no tienen dueño<br>
            Porque no son de este mundo<br>
            Y a veces me confundo<br>
            Y pico a tu vecina<br>
            Esa del segundo que vende cosas finas<br>
            Y a veces te espero<br>
            En el bar de la esquina<br>
            Con la mirada fija en tu portería<br>
            Y a veces me como de un bocao el mundo<br>
            Y a veces te siento<br>
            Y a veces te tumbo<br>
            A veces te leo un beso en los labios<br>
            Y como yo no me atrevo<br>
            Me corto y me abro<br>
            Que yo sé que la sonrisa<br>
            Que se dibuja en mi cara<br>
            Tiene que ver con la brisa<br>
            Que abanica tu mirada<br>
            Tan despacio y tan deprisa<br>
            Tan normal y tan extraño<br>
            Yo me parto la camisa<br>
            Como camarón<br>
            Tú me rompes las entrañas<br>
            Me trepas como una araña<br>
            Bebes del sudor que empaña<br>
            El cristal de mi habitación<br>
            Y después por la mañana<br>
            Despierto y no tengo alas<br>
            Llevo diez horas durmiendo<br>
            Y mi almohada está empapada<br>
            Todo había sido un sueño<br>
            Muy real y muy profundo<br>
            Tus ojos no tienen dueño<br>
            Porque no son de este mundo`
        }
        if (cancion == "Demons"){
            lyrics.innerHTML =`When the days are cold<br>
            And the cards all fold<br>
            And the saints we see are all made of gold<br>
            When your dreams all fail<br>
            And the ones we hail<br>
            Are the worst of all, and the blood's run stale<br>
            I wanna hide the truth<br>
            I wanna shelter you<br>
            But with the beast inside<br>
            There's nowhere we can hide<br>
            No matter what we breed<br>
            We still are made of greed<br>
            This is my kingdom come<br>
            This is my kingdom come<br>
            When you feel my heat, look into my eyes<br>
            It's where my demons hide<br>
            It's where my demons hide<br>
            Don't get too close, it's dark inside<br>
            It's where my demons hide<br>
            It's where my demons hide<br>
            At the curtain's call<br>
            It's the last of all<br>
            When the lights fade out, all the sinners crawl<br>
            So they dug your grave<br>
            And the masquerade<br>
            Will come calling out at the mess you've made<br>
            Don't wanna let you down<br>
            But I am hell-bound<br>
            Though this is all for you<br>
            Don't wanna hide the truth<br>
            No matter what we breed<br>
            We still are made of greed<br>
            This is my kingdom come<br>
            This is my kingdom come<br>
            When you feel my heat, look into my eyes<br>
            It's where my demons hide<br>
            It's where my demons hide<br>
            Don't get too close, it's dark inside<br>
            It's where my demons hide<br>
            It's where my demons hide<br>
            They say it's what you make<br>
            I say it's up to fate<br>
            It's woven in my soul<br>
            I need to let you go<br>
            Your eyes, they shine so bright<br>
            I wanna save that light<br>
            I can't escape this now<br>
            Unless you show me how<br>
            When you feel my heat, look into my eyes<br>
            It's where my demons hide<br>
            It's where my demons hide<br>
            Don't get too close, it's dark inside<br>
            It's where my demons hide<br>
            It's where my demons hide`
        }
        if (cancion == "ElCuartetoDeIbai"){
            lyrics.innerHTML =`Toxicidad, fuera, mala vibra, fuera<br>
            ¿Me llamas gordo? Te doy la mano<br>
            Toxicidad, fuera, mala vibra, fuera<br>
            ¿No te hago gracia? Te doy la mano<br>
            Déjame tranquilo, de verdad<br>
            Quiero estar con mi gente, viendo a Óscar cocinar salmón<br>
            Jugar al Among Us<br>
            Y dormir tranquilo con mi perro<br>
            Déjame tranquilo<br>
            Lo primero que quiero comentar<br>
            Hay una página que no me está gustando ahora mismo<br>
            Me gusta el trabajo que hace<br>
            Pero que a mí el tema de las estadísticas<br>
            Ya me está generando toxicidad (producciones Lucas Requena)<br>
            La gente ya empieza a compararte<br>
            ¿Quién es el uno, quién es el dos, quién es el tres?<br>
            Me la suda, me la suda<br>
            Toxicidad, fuera, mala vibra, fuera<br>
            ¿Me llamas gordo? Te doy la mano<br>
            Toxicidad, fuera, mala vibra, fuera<br>
            ¿No te hago gracia? Te doy la mano<br>
            Déjame tranquilo, de verdad<br>
            Quiero estar con mi gente, viendo a Óscar cocinar salmón<br>
            Jugar al Among Us<br>
            Y dormir tranquilo con mi perro<br>
            Déjame tranquilo<br>
            Auronplay es el número uno en Twitch (y yo que me alegro)<br>
            No hay nadie que mueva tanta gente como él<br>
            Se pone con esos pelos que tiene<br>
            Es que encima mirad cómo va peinado<br>
            Que da asco, se pone sentado, medio dormido<br>
            Y tiene cien mil personas hablando de un árbol<br>
            Eso no lo hace nadie<br>
            Toxicidad, fuera, mala vibra, fuera<br>
            ¿Me llamas gordo? Te doy la mano<br>
            Toxicidad, fuera, mala vibra, fuera<br>
            ¿No te hago gracia? Te doy la mano<br>
            Déjame tranquilo, de verdad<br>
            Quiero estar con mi gente, viendo a Óscar cocinar salmón<br>
            Jugar al Among Us<br>
            Y dormir tranquilo con mi perro<br>
            Déjame tranquilo<br>
            Y yo que me alegro<br>
            Déjame tranquilo<br>
            Y yo que me alegro<br>
            Déjame tranquilo`
        }
        if (cancion == "Enemy"){
            lyrics.innerHTML =`I wake up to the sounds of the silence that allows<br>
            For my mind to run around with my ear up to the ground<br>
            I'm searching to behold the stories that are told<br>
            When my back is to the world that was smiling when I turned<br>
            Tell you you're the greatest<br>
            But once you turn, they hate us<br>
            Oh, the misery<br>
            Everybody wants to be my enemy<br>
            Spare the sympathy<br>
            Everybody wants to be my enemy<br>
            (Look out for yourself)<br>
            My enemy (look, look, look, look)<br>
            (Look out for yourself)<br>
            But I'm ready<br>
            Your words up on the wall as you're praying for my fall<br>
            And the laughter in the halls and the names that I've been called<br>
            I stack it in my mind and I'm waiting for the time<br>
            When I show you what it's like to be words spit in a mic<br>
            Tell you you're the greatest<br>
            But once you turn, they hate us (huh)<br>
            Oh, the misery<br>
            Everybody wants to be my enemy<br>
            Spare the sympathy<br>
            Everybody wants to be<br>
            My enemy (look, look, look, look)<br>
            (Look out for yourself)<br>
            My enemy (look, look, look, look)<br>
            (Look out for yourself)<br>
            Uh, look<br>
            Okay, I'm hoping that somebody pray for me<br>
            I'm praying that somebody hope for me<br>
            I'm staying where nobody 'posed to be<br>
            P-P-Posted, being a wreck of emotions<br>
            Ready to go whenever, just let me know<br>
            The road is long, so put the pedal into the floor<br>
            The enemy on my trail, my energy unavailable<br>
            I'ma tell 'em hasta luego<br>
            They wanna plot on my trot to the top<br>
            I've been outta shape, thinkin' out the box, I'm an astronaut<br>
            I blasted off the planet rock to cause catastrophe<br>
            And it matters more because I had it not<br>
            Had I thought about wreaking havoc on an opposition<br>
            Kinda shocking they wanted static with precision, I'm automatic<br>
            Quarterback, I ain't talkin' sacking<br>
            Pack it, pack it up, I don't panic<br>
            Batter, batter up, who the baddest?<br>
            It don't matter 'cause we at your throat<br>
            Everybody wants to be my enemy<br>
            Spare the sympathy<br>
            Everybody wants to be<br>
            My enemy<br>
            Oh, the misery<br>
            Everybody wants to be my enemy<br>
            Spare the sympathy<br>
            Everybody wants to be my enemy<br>
            Pray it away, I swear<br>
            I'll never be a saint, no way<br>
            My enemy<br>
            Pray it away, I swear<br>
            I'll never be a saint`
        }
        if (cancion == "EntreLaEspadaYLaPared"){
            lyrics.innerHTML =`Entre lo amargo del café<br>
            Quedó el aroma y el calor<br>
            Lo que me dio, me lo dejó<br>
            Cuando se fue<br>
            Con la certeza y la razón<br>
            De sabe Dios quién sabe qué<br>
            Que lo invisible existe sólo porque no se ve<br>
            No soy la foto del carnet<br>
            No soy la luz en el balcón<br>
            Yo solo soy el que llegó<br>
            Y el que se fue<br>
            No sé muy bien a dónde voy<br>
            Para encontrarme búscame<br>
            En algún sitio entre la espada y la pared<br>
            Las nubes con el viento siempre están cambiando<br>
            Quizás podamos ver el sol de vez en cuando<br>
            Puede ser que todo vuelva a ser<br>
            Cuando es tarde para responder<br>
            Que nunca más<br>
            Voy a quedarme en este mar<br>
            Aunque me estrelle entre las rocas<br>
            Aunque me pise el mismo pie<br>
            Que antes beso mi boca<br>
            No encontrar el equilibro Y agarrarse<br>
            Lo contrario de vivir es no arriesgarse<br>
            O quien sabe qué<br>
            Oh no no no<br>
            Maldita noche que pasé<br>
            No sé muy bien por qué razón<br>
            Que sin dormirme te soñé<br>
            Me pareció escuchar tu voz<br>
            Toda la culpa es del café<br>
            Que me recuerda tu sabor<br>
            Y fue la voz que no escuché<br>
            Y fue el silencio el que me despertó<br>
            Toda la culpa fue del aire que rozó mi piel<br>
            De la piel que me guardó el calor<br>
            El mismo con el que forjé<br>
            Mi oxidado corazón<br>
            Las cosas que no pueden ser<br>
            Son todas las que he sido yo<br>
            Las mezclas no me salen bien<br>
            Sexo, drogas, rock & roll<br>
            Sexo, drogas, rock & rol`
        }
        if (cancion == "EntreTuYMilMares"){
            lyrics.innerHTML =`Ya no tengo miedo de ti<br>
            Ya toda mi vida eres tú<br>
            Vivo tu respiro que queda aquí<br>
            Que consumo día trás día<br>
            No puedo dividirme ya entre tú y mil mares<br>
            No puedo ahora estarme quieta y esperarte<br>
            Yo que habría estado por ti<br>
            En un cualquier lejana ciudad<br>
            Sola, por instinto sabiendo amarte<br>
            Sola y siempre ya junto a ti<br>
            No puedo dividirme ya entre tú y mil mares<br>
            No puedo ahora estar cansada de esperarte<br>
            No mi vida no, no aguanto amor<br>
            O regresas o quedate<br>
            No vivo ya, no sueño ya<br>
            Tengo miedo ayudame<br>
            Mi vida no te creo amor<br>
            Te me vas y todavía<br>
            Me juras que es la última<br>
            Es mejor si no me fio<br>
            Busco en la noche<br>
            En cada estrella tu reflejo<br>
            Mas todo esto no me basta<br>
            Ahora crezco<br>
            Oh, no mi vida no<br>
            No aguanto amor<br>
            O regresas o quedate<br>
            No vivo ya, no sueño ya<br>
            Tengo miedo, ayudame<br>
            Mi vida, no te creo amor<br>
            Te me vas y todavía<br>
            Me juras que es la última<br>
            Es mejor si no me fio<br>
            Es mejor si no me fio<br>
            No puedo dividirme ya entre tú y mil mares<br>
            No puedo ahora estarme quieta y esperarte<br>
            No, no puedo dividirme ya entre tú y mil mares<br>
            No puedo dividirme ya entre tú y mil mares`
        }
        if (cancion == "GameOver"){
            lyrics.innerHTML =`Bryant Myers<br>
            Jhayco, tú no la tienes<br>
            Jhayco, tú no la tienes<br>
            Cabrón, tú cantabas baladas<br>
            Y si no es un feat tú no grabas<br>
            Me pasas por lado sin mirarme a la cara<br>
            El más duro barra por barra<br>
            Tiré cuando necesitaba<br>
            Cuando te pille te voy a dar en la cara<br>
            Sí, sí, sí, si, sí (sí)<br>
            Ya te escribí par de barras (Barras)<br>
            Cinco años de ventaja, cabrón<br>
            Y como quiera no me agarras (No me agarras)<br>
            P.R. Sabe la que hay (Hay)<br>
            Tú eres un chihuahua que ladra (Ladra)<br>
            ¿Quién te dijo que tú puedes entonar como si cantaras?<br>
            Tu voz es una mierda, te voy a dar la mía (Yo no sé)<br>
            Te puse a tirarme en tres días<br>
            Llámate a Jamby, le debes regalías<br>
            Vete para Miami en lo que esto se enfría (Jajaja)<br>
            Busca el recogedor para la barrida (Barrida)<br>
            Tú corres por batería<br>
            Patrocinas insectería pero insecto fue el que te dijo que tú le metías (Ah)<br>
            Estás luciendo feo<br>
            Pendiente a todo lo que tuiteo<br>
            Y tú no ves nada cuando miras al espejo<br>
            Yo nunca me dejo de ningún de pendejo (No)<br>
            Y yo no te la creo<br>
            Y, cabrón, todavía no lo creo<br>
            Pero tú estabas apagado<br>
            Y te pegué de nuevo cuando hicimos "Deseos"<br>
            Ya sabemos de eso (Eso)<br>
            Te gusta que te den con todo el peso<br>
            Que limpien el piso, volaron los sesos<br>
            Cabrón, tú eres chota, por eso no caíste preso (Ajá)<br>
            Y a mí no me importa (No), ese culo es tuyo<br>
            No me gustan, pero si nos vamos musical (Sí)<br>
            Yo te lo destruyo (Destruyo)<br>
            Casa, carro, salda, saldo (Wuh)<br>
            Sí, tú tienes una ganga pero no tienes respaldo (Nah)<br>
            Y, te tengo un par de letras, a ver si te las guardo<br>
            Y si hablamos de escribir<br>
            Más de tres horas yo nunca me tardo (No)<br>
            Ponme una Ley 54 (Cuatro)<br>
            Porque yo soy un abusador (Jaja)<br>
            Sí, el género te bajó el dedo y yo les hice el favor (Favor)<br>
            Quédate low-key, tú no eres ganga<br>
            Tú no eres jodedor (Nah)<br>
            ¿Por qué no te matas y a todo nosotros nos haces el favor? (Jajaja)<br>
            Si esto fuera una iglesia, yo fuera el profeta<br>
            Cabrón, me respetas (Respetas)<br>
            O si no yo estuviera en el coro<br>
            Pero tú fueras una pandereta (Sí)<br>
            Y tengo una amiga que es una loca, que es una insecta<br>
            Que me tiró y tripeando me dijo, cabrón<br>
            Que a ti el bicho te apesta, apesta, apesta<br>
            Sin bañar tú te acuestas<br>
            Son cinco minutos, dime, ¿qué te cuesta? (Sí)<br>
            ¿En qué carajo grabaste eso?<br>
            ¿En un micrófono de los noventas? (Noventas)
            Te hiciste los dientes, te haces el pelo, te haces las cejas (Cejas)<br>
            Cabrón, sabemos muy bien que ya mismo te haces la combi completa (Jaja)<br>
            Chocha, culo, teta (Jajaja)<br>
            Mera, cabrón, y deja de estar hablando de las mujeres de los demás<br>
            No me hagas recordarte lo que te pasó en Hobie, cabrón<br>
            Papi, te la voy a decir a la una, ¿estás hablando mierda de mi mujer?<br>
            Chico, no, chico, yo no estoy hablando con tu mujer<br>
            Papi, te la voy a decir a las dos, ¿estás hablando mierda de mi mujer?<br>
            Chico, no, en verdad<br>
            Pera, ca-<br>
            Mere, cabrón, jajaja<br>
            De-de Bayamón a Santurce (Santurce)<br>
            Y de Carolina hasta Cagua (Cagua)<br>
            Cabrón, yo me paro en todos lados<br>
            Porque yo estoy más claro que el agua (Que el agua)<br>
            Y ya te maté<br>
            Te pareces a mí, te pareces a Jamby, cabrón, te pareces a Anuel (Anuel)<br>
            En verdad, en verdad, tú eres un frappe (Jajaja)<br>
            Y, le fallaste a Puerto Rico<br>
            En verdad le fallaste a tu gente<br>
            Explica esa mierda de pista, si ya estamos en el 2020<br>
            Te comparaste con Coscu y con Kendo<br>
            Cabrón, los estás ofendiendo (Jajaja)<br>
            Y ellos se abochornan de ti<br>
            ¿Grabaste en el celu o grabaste en Nuendo?<br>
            ¿Cómo tú estás en el piso y te vuelves a caer? (Caer)<br>
            Y si tú a mí me pones un dedo encima<br>
            Te vas a tener que esconder (Esconder)<br>
            Y después de esta yo no tiro más nada<br>
            Tú no las tienes para responder (Responder)<br>
            Cabrón, yo no le puedo dar a lo que yo no puedo ver<br>
            Y Pancho Villa, aquí la jodedera está que estilla<br>
            Si hay babilla y ahora están haciendo cucharilla<br>
            ¿Viste que en P.R. Los maquillan?<br>
            No hablo con los "craftman"<br>
            Papi, yo hablo con los cabecillas (Cabecillas)<br>
            Un par de gente bien encabronda<br>
            Y ahí es que yo siempre me luzco (Me luzco)<br>
            Yo miro el DM por encimita, yo nunca lo rebusco<br>
            Ven que estás molesto porque no te di la entrevista, ya yo lo deduzco (Ajá)<br>
            Es que entre los medios tenía que escoger entre tú, Rapetón o Molusco<br>
            Duda aclarada, con esta cerramos la temporada (Temporada)<br>
            El enano de portada (Sí)<br>
            ¿Te hiciste completo o faltó las entradas? (Ey)<br>
            Tu vida es piloca (¿Ah?)<br>
            Te hiciste los dientes de foca<br>
            Y ahora tienes braces, cabrón<br>
            Tienes un descojón en la boca (Jaja)<br>
            Tremendas andanas (sí)<br>
            Un tatuaje por muerto se hacen mis panas (Ah)<br>
            Te hablo la clara (Sí)<br>
            Tu forma de hacerlo es una forma rara (yeah)<br>
            Se te olvidó y me hiciste hacer que te lo recordara<br>
            Que por cada galleta, cabrón, que te dan<br>
            Tú te haces un tatuaje en la cara<br>
            Vamos disco a disco (Disco)<br>
            A ver cuánto vendo (Vendo)<br>
            Antes de tirarte (Ah)<br>
            Yo siempre prendo (Prendo)<br>
            Yo soy "El Demonio de la tinta", como dice Kendo (¡Ah!)<br>
            Dale play a la segunda que en lo que tú escuchas voy a escuchar el disco de Ñengo<br>
            Jajaja<br>
            Vamos a dejarlo musical que así se ve bonito, chico<br>
            Hasta salimos en los Billboard los otros días, ¿oíste?<br>
            Ah, y eso que estoy apagado<br>
            Yo no la tengo<br>
            Fara, M. De la Cruz, Mvsis<br>
            Artillery, House of Haze<br>
            Jhayco, Jhay Cortez, La Presión<br>
            Tu papá, ¿oíste? Jaja<br>
            Ahora mismo en P.R. Yo soy como Kobe en L.A<br>
            ¿Me sigues?<br>
            "Timeless", pronto`
        }
        if (cancion == "HijoDeLaLuna"){
            lyrics.innerHTML =`Tonto el que no entienda<br>
            Cuenta una leyenda<br>
            Que una hembra gitana<br>
            Conjuró a la luna hasta el amanecer<br>
            Llorando pedía<br>
            Al llegar el día<br>
            Desposar un calé<br>
            "Tendrás a tu hombre, piel morena"<br>
            Desde el cielo habló la luna llena<br>
            "Pero a cambio quiero<br>
            El hijo primero<br>
            Que le engendres a él<br>
            Que quien su hijo inmola<br>
            Para no estar sola<br>
            Poco le iba a querer"<br>
            Luna quieres ser madre<br>
            Y no encuentras querer<br>
            Que te haga mujer<br>
            Dime, luna de plata<br>
            ¿Qué pretendes hacer con un niño de piel?<br>
            Ah-ah-ah-ah, ah-ah-ah-ah<br>
            Hijo de la luna<br>
            De padre canela nació un niño<br>
            Blanco como el lomo de un armiño<br>
            Con los ojos grises en vez de aceituna<br>
            Niño albino de luna<br>
            "Maldita su estampa, este hijo es de un payo<br>
            Y yo no me lo cayo"<br>
            Luna quieres ser madre<br>
            Y no encuentras querer que te haga mujer<br>
            Dime, luna de plata<br>
            ¿Qué pretendes hacer con un niño de piel?<br>
            Ah-ah-ah-ah, ah-ah-ah-ah<br>
            Hijo de la luna<br>
            Gitano al creerse deshonrado<br>
            Se fue a su mujer, cuchillo en mano<br>
            "¿De quién es el hijo? Me has engañao' fijo"<br>
            Y de muerte la hirió<br>
            Luego se hizo al monte con el niño en brazos<br>
            Y allí le abandonó<br>
            Luna quieres ser madre<br>
            Y no encuentras querer que te haga mujer<br>
            Dime, luna de plata<br>
            ¿Qué pretendes hacer con un niño de piel?<br>
            Ah-ah-ah-ah, ah-ah-ah-ah<br>
            Hijo de la luna<br>
            Y las noches que haya luna llena<br>
            Será porque el niño esté de buenas<br>
            Y si el niño llora<br>
            Menguará la luna para hacerle una cuna<br>
            Y si el niño llora<br>
            Menguará la luna para hacerle una cuna`
        }
        if (cancion == "LaCasaPorElTejado"){
            lyrics.innerHTML =`Ahora sí<br>
            Parece que ya empiezo a entender<br>
            Las cosas importantes aquí<br>
            Son las que están detrás de la piel<br>
            Y todo lo demás<br>
            Empieza donde acaban mis pies<br>
            Después de mucho tiempo aprendí<br>
            Que hay cosas que es mejor no aprender<br>
            El colegio poco me enseñó<br>
            Si es por esos libros, nunca aprendo<br>
            A coger el cielo con las manos<br>
            A reír y a llorar lo que te canto<br>
            A coser mi alma rota<br>
            A perder el miedo a quedar como un idiota<br>
            Y a empezar la casa por el tejado<br>
            A poder dormir, cuando tú no estás a mi lado<br>
            Menos mal que fui un poco granuja<br>
            Todo lo que sé, me lo enseñó una bruja<br>
            Ruinas<br>
            ¿No ves que, por dentro, estoy en ruinas?<br>
            Mi cigarro va quemando el tiempo<br>
            Tiempo que se convirtió en ceniza<br>
            Raro<br>
            No digo diferente, digo raro<br>
            Ya no sé si el mundo está al revés<br>
            O soy yo el que está cabeza abajo<br>
            El colegio poco me enseñó<br>
            Si es por el maestro, nunca aprendo<br>
            A coger el cielo con las manos<br>
            A reír y a llorar lo que te canto<br>
            A coser mi alma rota<br>
            A perder el miedo a quedar como un idiota<br>
            Y a empezar la casa por el tejado<br>
            A poder dormir, cuando tú no estás a mi lado<br>
            Menos mal que fui un poco granuja<br>
            Todo lo que sé me lo enseñó una bruja<br>
            Y en el sur de tu cuerpo sé dónde ir (no estás)<br>
            Yo sé que esa estúpida sonrisa (no estás)<br>
            Que mi cara refleja (no estás)<br>
            Los días de lluvia y tormenta (no estás)<br>
            Como colgados a mal (no estás)<br>
            Seré un pobre infeliz<br>
            Si me falta el jardín de las delicias y to' (no estás)<br>
            Bajo tu falda aunque, sé de buena tinta (no estás)<br>
            Que no es solo para mí (no estás)<br>
            Cuentan maravillas, mis amigos, de ti (no estás a mi lado)<br>
            No estás a mi lado<br>
            No estás a mi lado<br>
            No estás a mi lado<br>
            (No estás a mi lado)<br>
            No estás a mi lado<br>
            No estás a mi lado<br>
            (No estás a mi lado)<br>
            No estás a mi lado<br>
            (No estás a mi lado)<br>
            No estás a mi lado<br>
            No estás a mi lado<br>
            (No estás a mi lado)<br>
            No estás a mi lado<br>
            (No estás a mi lado)<br>
            No estás a mi lado<br>
            (No estás a mi lado)`
        }
        if (cancion == "LaLaLa"){
            lyrics.innerHTML =`La la, la la la la la na na na na na<br>
            La la na na, la la la la la na na na na na<br>
            La la, la la la la la na na na na na<br>
            La la na na, la la la la la na na na na na<br>
            Hush, don't speak<br>
            When you spit your venom, keep it shut I hate it<br>
            When you hiss and preach<br>
            About your new messiah 'cause your theories catch fire<br>
            I can't find your silver lining<br>
            I don't mean to judge<br>
            But when you read your speech, it's tiring<br>
            Enough is enough<br>
            I'm covering my ears like a kid<br>
            When your words mean nothing, I go la la la<br>
            I'm turning up the volume when you speak<br>
            'Cause if my heart can't stop it<br>
            I find a way to block it, I go<br>
            La la, la la la la la na na na na na<br>
            La la na na, la la la la la na na na na na<br>
            I find a way to block it, I go<br>
            La la na na, la la la la la na na na na na<br>
            La la na na, la la la la la na na na na na<br>
            If our love is running out of time<br>
            I won't count the hours, rather be a coward<br>
            When our worlds collide<br>
            I'm gonna drown you out before I lose my mind<br>
            I can't find your silver lining<br>
            I don't mean to judge<br>
            But when you read your speech, it's tiring<br>
            Enough is enough<br>
            I'm covering my ears like a kid<br>
            When your words mean nothing, I go la la la<br>
            I'm turning up the volume when you speak<br>
            'Cause if my heart can't stop it<br>
            I find a way to block it, I go<br>
            La la, la la la la la na na na na na<br>
            La la na na, la la la la la na na na na na<br>
            I find a way to block it, I go<br>
            La la, la la la la la na na na na na<br>
            La la na na, la la la la la na na na na na<br>
            I find a way to block it, oh<br>
            La la, la la la la la na na na na na<br>
            La la na na, la la la la la na na na na na<br>
            I find a way to block it, I go<br>
            La la na na, la la la la la na na na na na<br>
            La la na na, la la la la la na na na na na<br>
            I'm covering my ears like a kid<br>
            When your words mean nothing, I go la la la<br>
            I'm turning up the volume when you speak<br>
            'Cause if my heart can't stop it<br>
            I find a way to block it, I go<br>
            I'm covering my ears like a kid<br>
            When your words mean nothing, I go la la la<br>
            I'm turning up the volume when you speak<br>
            'Cause if my heart can't stop it<br>
            I find a way to block it, I go<br>
            La la, la la la la la na na na na na<br>
            La la na na, la la la la la na na na na na<br>
            La la na na, la la la la la na na na na na<br>
            La la na na, la la la la la na na na na na`
        }
        if (cancion == "LoseYourself"){
            lyrics.innerHTML =`Look<br>
            If you had<br>
            One shot<br>
            Or one opportunity<br>
            To seize everything you ever wanted<br>
            In one moment<br>
            Would you capture it<br>
            Or just let it slip?<br>
            Yo<br>
            His palms are sweaty, knees weak, arms are heavy<br>
            There's vomit on his sweater already, mom's spaghetti<br>
            He's nervous, but on the surface he looks calm and ready<br>
            To drop bombs, but he keeps on forgettin'<br>
            What he wrote down, the whole crowd goes so loud<br>
            He opens his mouth, but the words won't come out<br>
            He's chokin', how, everybody's jokin' now<br>
            The clocks run out, times up, over, blaow<br>
            Snap back to reality, ope there goes gravity<br>
            Ope, there goes Rabbit, he choked<br><br>
            He's so mad, but he won't give up that easy? No<br>
            He won't have it, he knows his whole back's to these ropes<br>
            It don't matter, he's dope, he knows that, but he's broke<br>
            He's so stagnant, he knows, when he goes back to this mobile home, that's when it's<br>
            Back to the lab again, yo, this whole rhapsody<br>
            Better go capture this moment and hope it don't pass him<br>
            You better lose yourself in the music, the moment<br>
            You own it, you better never let it go<br>
            You only get one shot, do not miss your chance to blow<br>
            This opportunity comes once in a lifetime<br>
            You better lose yourself in the music, the moment<br>
            You own it, you better never let it go<br>
            You only get one shot, do not miss your chance to blow<br>
            This opportunity comes once in a lifetime<br>
            You better<br>
            His soul's escaping, through this hole that is gaping<br>
            This world is mine for the taking<br>
            Make me king, as we move toward a New World Order<br>
            A normal life is borin', but super stardom's close to post mortem<br>
            It only grows harder, only grows hotter<br>
            He blows, it's all over, these hoes is all on him<br>
            Coast to coast shows, he's known as the Globetrotter<br>
            Lonely roads, God only knows, he's grown farther from home, he's no father<br>
            He goes home and barely knows his own daughter<br>
            But hold your nose 'cause here goes the cold water<br>
            These hoes don't want him no mo', he's cold product<br>
            They moved on to the next schmo who flows, he nose dove and sold nada<br>
            So the soap opera is told and unfolds, I suppose it's old partna, but the beat goes on<br>
            Da-da-dum, da-dum, da-da<br>
            You better lose yourself in the music, the moment<br>
            You own it, you better never let it go<br>
            You only get one shot, do not miss your chance to blow<br>
            This opportunity comes once in a lifetime<br>
            You better lose yourself in the music, the moment<br>
            You own it, you better never let it go<br>
            You only get one shot, do not miss your chance to blow<br>
            This opportunity comes once in a lifetime<br>
            You better<br>
            No more games, I'ma change what you call rage<br>
            Tear this motherfuckin' roof off like two dogs caged<br>
            I was playin' in the beginnin', the mood all changed<br>
            I been chewed up and spit out and booed off stage<br>
            But I kept rhymin' and stepped right in the next cypher<br>
            Best believe somebody's payin' the Pied Piper<br>
            All the pain inside amplified by the<br>
            Fact that I can't get by with my nine to<br>
            Five and I can't provide the right type of<br>
            Life for my family 'cause man, these goddamn food stamps don't buy diapers<br>
            And its no movie, there's no Mekhi Phifer<br>
            This is my life and these times are so hard<br>
            And it's getting even harder tryna feed and water my seed, plus<br>
            Teeter totter, caught up between bein' a father and a prima donna<br>
            Baby mama drama, screamin' on her, too much<br>
            For me to wanna stay in one spot, another day of monotony's<br>
            Gotten me to the point, I'm like a snail I've got<br>
            To formulate a plot or end up in jail or shot<br>
            Success is my only motherfuckin' option, failure's not<br>
            Mom, I love you, but this trailer's got to go, I cannot grow old in Salem's Lot<br>
            So here I go, is my shot<br>
            Feet, fail me not, this may be the only opportunity that I got<br>
            You better lose yourself in the music, the moment<br>
            You own it, you better never let it go<br>
            You only get one shot, do not miss your chance to blow<br>
            This opportunity comes once in a lifetime<br>
            You better lose yourself in the music, the moment<br>
            You own it, you better never let it go<br>
            You only get one shot, do not miss your chance to blow<br>
            This opportunity comes once in a lifetime<br>
            You better<br>
            You can do anything you set your mind to, man`
        }
        if (cancion == "MeEquivocariaOtraVez"){
            lyrics.innerHTML =`Se torció el camino, tú ya sabes que no puedo volver<br>
            Son cosas del destino, siempre me quiere morder<br>
            El horizonte se confunde con un negro telón<br>
            Y puede ser como decir que se acabó la función<br>
            
            Ha sido divertido, me equivocaría otra vez<br>
            Quisiera haber querido lo que no he sabido querer<br>
            Quieres bailar conmigo, puede que te pise los pies<br>
            No soñaré solo porque me he queda'o dormido<br>
            
            No voy a despertarme porque salga el Sol<br>
            Ya sé llorar una vez por cada vez que río<br>
            No sé restar<br>
            No sé restar tu mitad a mi corazón<br>
            
            Puede ser que la respuesta sea no preguntarse por qué<br>
            Perderse por los bares donde se bebe sin sed<br>
            Virgen de la locura, nunca más te voy a rezar<br>
            Que me he enterado de los pecados que me quieres quitar<br>

            Será más divertido cuando no me toque perder<br>
            Sigo apostando al 5, y cada 2 por 3, sale 6<br>
            Yo bailaría contigo, pero es que estoy sordo de un pie<br>
            No soñaré solo porque me he queda'o dormido<br>
            
            No voy a despertarme porque salga el Sol<br>
            Ya sé llorar una vez por cada vez que río<br>
            No sé restar<br>
            No sé restar tu mitad a mi corazón<br>
            
            Ha sido divertido, me equivocaría otra vez<br>
            Quisiera haber querido lo que no he sabido querer<br>
            Quieres bailar conmigo, puede que te pise los pies<br>
            No soñaré solo porque me he queda'o dormido<br>
            
            No voy a despertarme porque salga el Sol<br>
            Ya sé llorar una vez por cada vez que río<br>
            No sé restar<br>
            No sé restar tu mitad a mi corazón<br>
            No sé restar tu mitad a mi corazón<br>
            No sé restar tu mitad a mi corazón`
        }
        if (cancion == "NadieHaDicho"){
            lyrics.innerHTML =`E tu cosa aspettavi<br>
            A dirmi quello che dovevi dire<br>
            A non rischiare niente<br>
            Non vai all'inferno e neanche sull'altare<br>
            E noi così distanti<br>
            A sopportarci con educazione<br>
            La colpa non esiste<br>
            Ma ognuno prenda la sua direzione<br>
            Perdonami per questi giorni<br>
            Non li ho saputi raccontare<br>
            Avevo l'indirizzo nuovo e un posto per scappare<br>
            E non è detto che mi manchi sempre<br>
            Le cose cambiano improvvisamente<br>
            E certi angoli di notte non avranno luce mai<br>
            E non è detto che non provo niente<br>
            Se tengo gli occhi sul tuo sguardo assente<br>
            E se mi fido della forza di un ricordo, casomai<br>
            Prenditi l'ombrello, che sia il riparo sotto la tempesta<br>
            Se quello che ti devo<br>
            È avere il cuore dalla parte giusta<br>
            Perdonami per questi giorni<br>
            Non li ho saputi raccontare<br>
            Ho un treno verso l'aeroporto e un volo tra due ore<br>
            E non è detto che mi manchi sempre<br>
            Le cose cambiano improvvisamente<br>
            E certi angoli di notte non avranno luce mai<br>
            E non è detto che non provo niente<br>
            Se tengo gli occhi sul tuo sguardo assente<br>
            Perché mi fido della forza di un ricordo casomai<br>
            E non è detto<br>
            (E non è detto)<br>
            E non è detto<br>
            Ma chi l'ha detto che non provo niente<br>
            Quello che è stato rimarrà importante<br>
            Come la piccola speranza che ci serve e che ti dai<br>
            Perdonami per questi giorni<br>
            Non ho saputo come fare`
        }
        if (cancion == "Overwhelmed"){
            lyrics.innerHTML =`To report suspicious activity<br>
            (You can call 9-1-1 for immediate response)<br>
            (And there's still no working cure for the virus)<br>
            Turn off the T.V, it's starting to freak me<br>
            Out it's so loud, it's like my ears are bleeding<br>
            What am I feeling? Can't look at the ceiling<br>
            Light is so bright, it's like I'm over-heating<br>
            This mind isn't mine, who am I to judge?<br>
            Oh, I should be fine, but it's all too much<br>
            I get overwhelmed so easily<br>
            My anxiety creeps inside of me<br>
            Makes it hard to breathe<br>
            What's come over me?<br>
            Feels like I'm somebody else<br>
            I get overwhelmed so easily<br>
            My anxiety keeps me silent<br>
            When I try to speak<br>
            What's come over me?<br>
            Feels like I'm somebody else<br>
            I get overwhelmed<br>
            All of these faces who don't know what space is<br>
            And crowds are shut down, I'm over-stimulated<br>
            Nobody gets it, say I'm too sensitive<br>
            I can't listen 'cause I'm eyeing the exits<br>
            This mind isn't mine, who am I to judge?<br>
            Oh, I should be fine, but it's all too much<br>
            I get overwhelmed so easily<br>
            My anxiety creeps inside of me<br>
            Makes it hard to breathe<br>
            What's come over me?<br>
            Feels like I'm somebody else<br>
            I get overwhelmed so easily<br>
            My anxiety keeps me silent<br>
            When I try to speak<br>
            What's come over me?<br>
            Feels like I'm somebody else<br>
            I get overwhelmed<br>
            I get overwhelmed<br>
            I should be fine, but it's all too much<br>
            I should be fine, but I'm not (not)<br>
            I get overwhelmed so easily<br>
            My anxiety creeps inside of me<br>
            Makes it hard to breathe<br>
            What's come over me?<br>
            Feels like I'm somebody else<br>
            I get overwhelmed so easily<br>
            Keeps me silent<br>
            (Keeps me silent)<br>
            What's come over me?<br>
            Somebody, somebody else<br>
            I get overwhelmed`
        }
        if (cancion == "PorLaBocaViveElPez"){
            lyrics.innerHTML =`Algo, lo que me invade<br>
            Todo viene de dentro<br>
            Nunca lo que me sacie<br>
            Siempre quiero, lobo hambriento<br>
            Todo me queda grande<br>
            Para no estar contigo<br>
            Sabes, quisiera darte<br>
            Siempre un poco más de lo que te pido<br>
            Sabes que soñaré<br>
            Si no estás, que me despierto contigo<br>
            Sabes que quiero más<br>
            No sé vivir solo con cinco sentidos<br>
            Este mar cada vez guarda más barcos hundidos<br>
            Tú eres aire, yo papel<br>
            Donde vayas yo me iré<br>
            Si me quedo a oscuras<br>
            Luz de la locura ven y alúmbrame<br>
            Alguien dijo alguna vez<br>
            "Por la boca vive el pez"<br>
            Y yo lo estoy diciendo<br>
            Te lo estoy diciendo otra vez<br>
            Dime por qué preguntas<br>
            Cuánto te he echao' de menos<br>
            Si en cada canción que escribo, corazón<br>
            Eres tú el acento<br>
            No quiero estrella errante<br>
            No quiero ver la aurora<br>
            Quiero mirar tus ojos del color de la Coca Cola<br>
            Sabes que soñaré<br>
            Si no estás, que me despierto contigo<br>
            Sabes que quiero más<br>
            No sé vivir solo con cinco sentidos<br>
            Este mar cada vez guarda más barcos hundidos<br>
            Tú estás conmigo siempre que te canto<br>
            Hago canciones para estar contigo<br>
            Porque escribo igual que sangro<br>
            Porque sangro todo lo que escribo<br>
            Me he dado cuenta cada vez que canto<br>
            Que si no canto no sé lo que digo<br>
            La pena está bailando con el llanto<br>
            Y cuando quiera bailará conmigo<br>
            La vida eterna solo dura un rato<br>
            Y es lo que tengo para estar contigo<br>
            Para decirte lo que nunca canto<br>
            Para cantarte lo que nunca digo` 
        }
        if (cancion == "RapContraElRacismo"){
            lyrics.innerHTML =`El subidon de estar aqui todos unidos,<br> se pierde un poco cuando piensas en el motivo,<br> todos distintos con su rollo y con su estilo,<br> pero es hip-hop y hay que dejarlo bien clarito.<br>
            ¿Te has parado alguna vez a hablar contigo mismo?<br> la vida puede ser de otro color si se habla del<br> racismo no vengo a dar un discurso de derechos humanos ni<br> vengo a contaros una de romanos es la lucidez frente a la estupided que existe<br> yo me pregunto donde empieza y acaba el chiste buen desplandente <br>al vendedor ambulante que es otro currante con familia y futuro por delante.
            Cada uno es unico de su especie no hay motivo<br> ni razón para que se desprecie es el temor y la igualdad y<br> a ignorar lo diferente pues, nos separa una absurda clase social<br> permanente maximo odio por la minima razón no hay color, no <br>hay comparación tan solo otro episodio donde el más intorelante es el fasismo no se <br>cura ni leyendo y el racismo viajando tampoco.
            Por muchas canciones que hagamos por mucho que <br>nos manifestemos por muchas victimas que sufran no caigan <br>a lo largo del terreno no nos concienciamos y así nos va y en el <br>articulo numero uno escrito esta nacemos libres iguales en derecho y dignidad. <br>A ver ¿Por qué esta dificil llevarlo acabo fuera del papel?
            Alto-feo-guapo-negro-blanco<br> ¿Qué mas da? dentro de 100 años todos calvos bajo tiera ¿Va?
            ¿No as probado nunca conocer a un extrajero?<br>
            Fijate en los niños ellos saben de que van este juego,<br> y es que la raza humana es un crisol
            El que no pueda ver la belleza en esto no merece ver el sol paso el relevo al compañero,<br> para este mundo nuevo el de triunfo del amor contra el miedo.
            Cuando la bestia racista siente rabia y muerde cuando la fobia se contagia y hierve acusandote de no ser igual, <br>cuando el mundo global el buscar comida en otra tierra te convierte ilegal, <br>cuando la ley extrajeria te atrapa sin motivo y la hipocresia tapa sus ojos y sus oidos,<br> racismo y marginación cuando solo ven la piel y se olvidan de mirar el corazón.
            Nadie te pide que salves el mundo de su color todos perdimos la fé en un futuro mejor,<br> esta vida esta cruel y<br> tan canalla que lo entiendo aveces ser honrrado<br> es como mear contra el viento pero no mires el color de mi piel<br> si realmente lo que quieres es saber el color de mis billetes,<br> terremotos, huracanes, guerra,<br> hambre el racismo esta en los bolsillos del hombre.
            Respira del todo esta brisa<br>
            Ponte en la piel del otro a ver cuanto dura tu sonrisa<br>
            Mostrar respeto al desigual por sexo, ideologia o cultura<br>
            Para que afecto y sensibilidad rodeen la estructura<br>
            Porque con intelorancia muestras deficit en cerebro y corazon<br>
            Hoy comparto mi voz y mi amor contra la sinrazon y el dolor<br>
            Y la falta de inteligencia y comunicacion.<br>
            Tu no eres racista, tio eres imbecil<br>
            Por culpa de unos padres ignorantes eres docil<br>
            Hace ya muchos años que no existen los paises<br>
            La frontera esta en la piel de cada uno<br>
            Y todos nuestros nietos seran grises<br>
            Como quieres que te recuerde como aquel que decia que<br>
            Odiava negros pero se escondia por si muerden<br>
            Cobarde sin actitud, si algun dia te enfrentas a tus demonios<br>
            Veras que son blancos como tu.<br>
            Porque coño le miras con esa cara<br>
            Si luego tu eres el primero en comprarle DVDs piratas<br>
            Apoco por la amistad de las razas, dificil en este puto mundo<br>
            Intolerante de ratas<br>
            Ningun ser humano puede ser ilegal<br>
            Lo ilegal es que un ser humano no tenga dignidad<br>
            Yo apoyo al negro, al chino, al arabe incluso al marciano<br>
            Por mi parte bienvenido a mi tierra romano.<br>
            Superando al treintena de edad<br>
            Me escribi la de los niños<br>
            Esta va por el papa<br>
            Que lanza insultos un domingo en el bar<br>
            Cuando el negro al que idolatra no consigue marcar<br>
            El partido esta perdido al entrar<br>
            El efecto secundario es que tu hijo sea un problema social<br>
            El futuro es que tu hija exiga dinero pal cine<br>
            Y se valla con el hijo del que te vendia clinex .<br>
            Realidad difusa haciendo menesteres<br>
            ¿Viste quien soy yo? dime tu quien eres<br>
            Cobrando en papeles denegando los placeres<br>
            De hombres y mujeres, heroes de tal desafio<br>
            De luchar por tal desafio, de luchar por su amor propio<br>
            Para que sus hijos no crezcan vacios<br>
            Nueva generacion con principios<br>
            Dando una buena educacion sin prejuicios.<br>
            Cuando el dolor cobre el pecho<br>
            Un corazon aguanta lo que le echen<br>
            Pero dependiendo de los hechos<br>
            Licho por algo mejor, por derechos<br>
            Y las palabras se las lleva el viento<br>
            ¿Estas? no, entre oceanos hay una razon<br>
            Que arrastra lagrimas al decir bros<br>
            Yo solo me fijo en la persona<br>
            O tu juzgate antes de juzgar a cualquier otro.<br>
            No, no es el tono de la piel lo que interesa<br>
            Es el tono con el que te expresas, racistas se quejan<br>
            El extranjero les quita horas en la empresa<br>
            Mas horas les quita la consola y es japonesa<br>
            Pon atencion luchar por la libertad<br>
            Es algo mas que odiar al opresor<br>
            Pido comprension pues el pan se parte con las manos<br>
            Pero se reparte con el corazon.<br>
            Por un lado me apena que sea necesario esto<br>
            Por otro me alegra oir a mis compañeros<br>
            No se me ocurre un mensaje mas tonto ni mas logico ni mas omvio ni mas serio<br>
            El problema viene cuando no ven el problemo<br>
            Y el problema se queda cuando lo niegan<br>
            Supongo que no hacia falta ni decirlo<br>
            Les queda claro ¿No? el rap esta contra el racismo.`
        }
        if (cancion == "Rema"){
            lyrics.innerHTML =`Tiene que haber aquí una verdad paralela,<br>
        
            Por qué esta ya no cuela,<br>
            
            A todos el karma nos la mente entera,<br>
            
            Siéntate y espera,<br>
            
            Será fallo mío que algo dentro no va bien,<br>
            
            Que por mi aniquilaba a la población entera,<br>
            
            Primero me hace llorar, luego me la pela,<br>
            
            Tengo la indiferencia como bandera,<br>
            
            Tú, si, tú... que solo te crees al sol si hay luz,<br>
            
            Claro que te subes al barco si navega, fiera,<br>
            
            Se rompe la vela y saltas fuera,<br>
            
            Valiente cobarde que dice que rema,<br>
            
            Pero si no ve el horizonte se frena,<br>
            
            Se quejan de todo pero no hacen nada,<br>
            
            Me dijo el psicólogo "Tú no estás bien",<br>
            
            Y yo le respondí ¿Y quién? Dime quién",<br>
            
            Si tienes que vender hasta los aros de tu abuela,<br>
            
            Para pagar una mierda de comida para la boca,<br>
            
            Toda la vida pagando para acabar en la banca rota,<br>
            
            Solo, viejo, y sobras,<br>
            
            Mil pavos al mes por una habitación,<br>
            
            Y los que nos roban van a una mansión de prisión,<br>
            
            Decepción, depresión, un cañón en la sien,<br>
            
            Y acabas suicidándote solo para estar bien,<br>
            
            Así que contéstame psicólogo ¿quién?,<br>
            
            ¿Quién está bien aquí, quien está loco?,<br>
            
            Lo estoy yo y lo está todo el mundo,<br>
            
            Yo lo digo pero no soy el único,<br>
            
            Me quejo de la vida, tú la crees como un estúpido,<br>
            
            Ya ves que no me ubico, luego me llaman subido,<br>
            
            Pero te cuento la realidad como ningún músico,<br>
            
            Que para mí también sería muy fácil decir nada,<br>
            
            Ponerme el autotune y hablar de que mojo bragas,<br>
            
            Pero es que lo fácil no me representa nada,<br>
            
            Es lo que tiene una mente complicada,<br>
            
            (Estribillo)<br>
            
            Por todo aquel que no todo le vale,<br>
            
            Que sabe lo que es vivir a la deriva,<br>
            
            Sin tener miedo a los mares, solo sabe remar,<br>
            
            Puta vida de problemas,<br>
            
            Me paso el día, rema, rema,<br>
            
            Puta vida como quema,<br>
            
            No hay más camino, joderte y remar.<br>
            
            Nadie daba por mí un duro,<br>
            
            Que lo que yo hacía poco dura,<br>
            
            Me hicieron ver la vida más oscura,<br>
            
            Nadie me ha callado jamás,<br>
            
            Y lo mandé todo a la mierda, dije nunca te calles,<br>
            
            Diles a esos hipócritas lo que ves en la calle,<br>
            
            Recuerdo a mi padre, diciéndome: "No falles",<br>
            
            Si llegas arriba como tú nunca habrá nadie,<br>
            
            Porque cojo todas las cosas malas del mundo,<br>
            
            Las uso para hacer temas que te cambian en segundos,<br>
            
            Es la paradoja, cuanto más me hundo,<br>
            
            Puedo escribir la letra que te llegue más profundo,<br>
            
            Ahora te vas a poner delante mía, chico,<br>
            
            Y me vas a hacer una lista de todos los que imito,<br>
            
            No puedo imitar a quien no tiene mi cabeza,<br>
            
            Quien no conoce a Dios a cualquier rapper le reza,<br>
            
            Yo voy a la clave, hablo del machismo,<br>
            
            De la sociedad mismo, no confundo a chavales,<br>
            
            Si esto lo pusieran en los bares serían templos,<br>
            
            Que aparte de copas tomarían más ejemplo,<br>
            
            Pero no interesa no, no no no,<br>
            
            Pero no interesa,<br>
            
            Cuidado con el B.L.K que hace pensar,<br>
            
            Peligra mi empresa de tontos viral,<br>
            
            Este man no interesa, hay que fichar,<br>
            
            A quien no hable de nada pero haga bailar,<br>
            
            Crearemos un producto de engaño,<br>
            
            Lo venderemos como el artista del año,<br>
            
            ¿Si no tiene talento? tranquilo, lo amaño,<br>
            
            Lo meto al estudio, contento al rebaño.<br>
            
            (Estribillo)<br>
            
            Por todo aquel que no todo le vale,<br>
            
            Que sabe lo que es vivir a la deriva,<br>
            
            Sin tener miedo a los mares, solo sabe remar,<br>
            
            Puta vida de problemas,<br>
            
            Me paso el día, rema, rema,<br>
            
            Puta vida como quema,<br>
            
            No hay más camino, joderte y remar`
        }
        if (cancion == "SoldaditoMarinero"){
            lyrics.innerHTML =`Él camina despacito que las prisas no son buenas<br>
            En su brazo dobladita, con cuidado la chaqueta<br>
            Luego pasa por la calle dónde los chavales juegan<br>
            Él también quiso ser niño pero le pilló la guerra<br>
            Soldadito marinero conociste a una sirena<br>
            De esas que dicen te quiero si ven la cartera llena<br>
            Escogiste a la más guapa y a la menos buena<br>
            Sin saber como ha venido te ha cogido la tormenta<br>
            Él quería cruzar los mares y olvidar a su sirena<br>
            La verdad, no fue difícil cuando conoció a Mariela<br>
            Que tenía los ojos verdes y un negocio entre las piernas<br>
            Hay que ver que puntería, no te arrimas a una buena<br>
            Soldadito marinero conociste a una sirena<br>
            De esas que dicen te quiero si ven la cartera llena<br>
            Escogiste a la más guapa y a la menos buena<br>
            Sin saber como ha venido te ha cogido la tormenta<br>
            Después de un invierno malo, una mala primavera<br>
            Dime por que estas buscando una lágrima en la arena<br>
            Después de un invierno malo, una mala primavera<br>
            Dime por que estas buscando una lágrima en la arena<br>
            Después de un invierno malo, una mala primavera<br>
            Dime por que estas buscando una lágrima en la arena<br>
            Después de un invierno malo`
        }
        if (cancion == "Sugar"){
            lyrics.innerHTML =`I'm hurting, baby, I'm broken down<br>
            I need your loving, loving<br>
            I need it now<br>
            When I'm without you, I'm something weak<br>
            You got me begging, begging<br>
            I'm on my knees<br>
            
            I don't wanna be needing your love<br>
            I just wanna be deep in your love<br>
            And it's killing me when you're away<br>
            Ooh, baby, 'cause I really don't care where you are<br>
            I just wanna be there where you are<br>
            And I gotta get one little taste<br>
            
            Sugar, yes, please<br>
            Won't you come and put it down on me?<br>
            I'm right here, 'cause I need<br>
            Little love and little sympathy<br>
            Yeah, you show me good loving<br>
            Make it alright<br>
            Need a little sweetness in my life<br>
            Sugar, yes, please<br>
            Won't you come and put it down on me?<br>
            
            My broken pieces, you pick them up<br>
            Don't leave me hanging, hanging<br>
            Come give me some<br>
            When I'm without ya, I'm so insecure<br>
            You are the one thing, one thing<br>
            I'm living for<br>
            
            I don't wanna be needing your love<br>
            I just wanna be deep in your love<br>
            And it's killing me when you're away<br>
            Ooh, baby, 'cause I really don't care where you are<br>
            I just wanna be there where you are<br>
            And I gotta get one little taste<br>
            
            Sugar, yes, please<br>
            Won't you come and put it down on me?<br>
            I'm right here, 'cause I need<br>
            Little love and little sympathy<br>
            Yeah, you show me good loving<br>
            Make it alright<br>
            Need a little sweetness in my life<br>
            Sugar, yes, please<br>
            Won't you come and put it down on me?<br>
            
            Yeah<br>
            I want that red velvet<br>
            I want that sugar sweet<br>
            Don't let nobody touch it<br>
            Unless that somebody's me<br>
            I gotta be a man<br>
            There ain't no other way<br>
            'Cause, girl, you're hotter than<br>
            The southern California bay<br>
            I don't wanna play no games<br>
            I don't gotta be afraid<br>
            Don't give all that shy shit<br>
            No make up on, that's my<br>
            
            Sugar, yes, please<br>
            Won't you come and put it down on me?<br>
            I'm right here, 'cause I need<br>
            Little love and little sympathy<br>
            Yeah, baby, you show me good loving<br>
            Make it alright<br>
            Need a little sweetness in my life<br>
            Sugar, yes, please<br>
            Won't you come and put it down on me?<br>
            
            Sugar, yes, please<br>
            Won't you come and put it down on me?<br>
            I'm right here, 'cause I need<br>
            Little love and little sympathy<br>
            Yeah, you show me good loving<br>
            Make it alright<br>
            Need a little sweetness in my life<br>
            Sugar, yes, please<br>
            Won't you come and put it down on me?<br>
            
            Down on me, down on me, ooh`
        }
        if (cancion == "Thunder"){
            lyrics.innerHTML =`Just a young gun with a quick fuse<br>
            I was uptight, wanna let loose<br>
            I was dreaming of bigger things and<br>
            Wanna leave my own life behind<br>
            Not a "Yes sir", not a follower<br>
            Fit the box, fit the mold<br>
            Have a seat in the foyer, take a number<br>
            I was lightning before the thunder<br>
            Thunder, thunder<br>
            Thunder, thun-, thunder<br>
            Thun-thun-thunder, thunder<br>
            Thunder, thunder, thun-, thunder<br>
            Thun-thun-thunder, thunder<br>
            Thunder, feel the thunder<br>
            Lightning and the thunder<br>
            Thunder, feel the thunder<br>
            Lightning and the thunder<br>
            Thunder, thunder<br>
            Thunder<br>
            Kids were laughing in my classes<br>
            While I was scheming for the masses<br>
            Who do you think you are?<br>
            Dreaming 'bout being a big star<br>
            They say, "You're basic", they say, "You're easy"<br>
            You're always riding in the backseat<br>
            Now I'm smiling from the stage while<br>
            You were clapping in the nosebleeds<br>
            Thunder, thunder, thun-<br>
            Thunder, thun-thun-thunder<br>
            Thunder, thunder<br>
            Thunder, thun-, thunder<br>
            Thun-thun-thunder, thunder<br>
            Thunder, feel the thunder<br>
            Lightning and the thunder<br>
            Thunder, feel the thunder<br>
            Lightning and the thunder<br>
            Thunder<br>
            Thunder, feel the thunder<br>
            Lightning and the thunder, thunder<br>
            Thunder, feel the thunder<br>
            Lightning and the thunder, thunder<br>
            Thunder, feel the thunder<br>
            Lightning and the thunder, thunder<br>
            Thunder, feel the thunder (never give up, never give up)<br>
            Lightning and the thunder, thunder (never give up, never give up)<br>
            Thunder, feel the thunder (never give up, never give up)<br>
            Lightning and the thunder, thunder (never give up)<br>
            Thunder, thunder, thun-<br>
            Thunder, thun-thun-thunder, thunder<br>
            Thunder, thunder, thun-<br>
            Thunder, thun-thun-thunder, thunder<br>
            Thunder, thunder, thun-<br>
            Thunder, thun-thun-thunder, thunder<br>
            Thunder, thunder, thun-, thunder<br>
            Thun-thun-thunder, thunder<br>
            `
        }
        if (cancion == "TillICollapse"){
            lyrics.innerHTML =`'Cause sometimes you just feel tired, feel weak<br>
            And when you feel weak, you feel like you wanna just give up<br>
            But you got to search within you, and try to find that inner strength<br>
            And just pull that shit out of you<br>
            And get that motivation to not give up, and not be a quitter<br>
            No matter how bad you wanna just fall flat on your face and collapse<br>
            'Till I collapse I'm spilling these raps long as you feel 'em<br>
            'Till the day that I drop you'll never say that I'm not killing 'em<br>
            'Cause when I am not, then I'ma stop penning 'em<br>
            And I am not Hip-Hop and I'm just not Eminem<br>
            Subliminal thoughts, when I'ma stop sending 'em?<br>
            Women are caught in webs, spin 'em and hock venom<br>
            Adrenalin shots, the penicillin could not get the illing to stop<br>
            Amoxicillin's just not real enough<br>
            The criminal cop-killing hip hop villain<br>
            A minimal swap to cop millions of Pac listeners<br>
            You're coming with me, feel it or not you're gonna fear it<br>
            Like I showed you the spirit of God lives in us<br>
            You hear it a lot, lyrics to shock<br>
            Is it a miracle or am I just product of pop fizzing up?<br>
            For shizzle my wizzle, this is the plot, listen up<br>
            You bizzles forgot, Slizzle does not give a fuck!<br>
            'Till the roof comes off, 'till the lights go out<br>
            'Till my legs give out, can't shut my mouth<br>
            'Till the smoke clears out, am I high? Perhaps<br>
            I'ma rip this shit, 'till my bone collapse<br>
            'Till the roof comes off, 'till the lights go out<br>
            'Till my legs give out, can't shut my mouth<br>
            'Till the smoke clears out, am I high? Perhaps<br>
            I'ma rip this shit, 'till my bone collapse<br>
            Music is like magic, there's a certain feeling you get<br>
            When you real and you spit and people are feeling your shit<br>
            This is your moment, and every single minute you spend<br>
            Tryna hold on to it 'cause you may never get it again<br>
            So while you're in it, try to get as much shit as you can<br>
            And when your run is over just admit when it's at its end<br>
            Because I'm at the end of my wits with half the shit gets in<br>
            I got a list, here's the order of my list that it's in<br>
            It goes Reggie, Jay-Z, 2Pac and Biggie<br>
            Andre from OutKast, Jada, Kurupt, Nas and then me<br>
            But in this industry I'm the cause of a lot of envy<br>
            So when I'm not put on this list, the shit does not offend me<br>
            That's why you see me walking 'round like nothing's bothering me<br>
            Even though half you people got a fuckin' problem with me<br>
            You hate it but you know respect you got to give me<br>
            The press's wet dream like Bobby and Whitney, Nate, hit me<br>
            'Till the roof comes off, 'till the lights go out<br>
            'Till my legs give out, can't shut my mouth<br>
            'Till the smoke clears out, am I high? Perhaps<br>
            I'ma rip this shit, 'till my bone collapse<br>
            'Till the roof comes off, 'till the lights go out<br>
            'Till my legs give out, can't shut my mouth<br>
            'Till the smoke clears out, am I high? Perhaps<br>
            I'ma rip this shit, 'till my bone collapse<br>
            Soon as a verse starts, I eat at an MC's heart<br>
            What is he thinking? How not to go against me, smart<br>
            And it's absurd, how people hang on every word<br>
            I'll probably never get the props I feel I ever deserve<br>
            But I'll never be served, my spot is forever reserved<br>
            If I ever leave Earth, that would be the death of me first<br>
            'Cause in my heart of hearts I know nothing could ever be worse<br>
            That's why I'm clever when I put together every verse<br>
            My thoughts are sporadic, I act like I'm an addict<br>
            I rap like I'm addicted to smack like I'm Kim Mathers<br>
            But I don't want to go forth and back in constant battles<br>
            The fact is I would rather sit back and bomb some rappers<br>
            So this is like a full blown attack I'm launching at 'em<br>
            The track is on some battling raps who want some static?<br>
            'Cause I don't really think that the fact that I'm Slim matters<br>
            A plaque and platinum status is wack if I'm not the baddest, so<br>
            'Till the roof comes off, 'till the lights go out<br>
            'Till my legs give out, can't shut my mouth<br>
            'Till the smoke clears out, am I high? Perhaps<br>
            I'ma rip this shit, 'till my bone collapse<br>
            'Till the roof comes off, 'till the lights go out<br>
            'Till my legs give out, can't shut my mouth<br>
            'Till the smoke clears out, am I high? Perhaps<br>
            I'ma rip this shit, 'till my bone collapse<br>
            Until the roof (until the roof)<br>
            The roof comes off (the roof comes off)<br>
            Until my legs (until my legs)<br>
            Give out from underneath me<br>
            I, I will not fall, I will stand tall<br>
            Feels like no one can beat me`
        }
        if (cancion == "Viveme"){
            lyrics.innerHTML =`No necesito más de nada ahora que<br>
            Me iluminó tu amor inmenso fuera y dentro<br>
            Créeme esta vez, créeme porque<br>
            Créeme y verás no acabará más<br>
            Tengo un deseo escrito en alto que vuela ya<br>
            Mi pensamiento no depende de mi cuerpo<br>
            Créeme esta vez, créeme porque<br>
            Me haría daño ahora, ya lo sé<br>
            Hay gran espacio y tú y yo<br>
            Cielo abierto que ya<br>
            No se cierra a los dos<br>
            Pues sabemos lo que es necesidad<br>
            Víveme sin miedo ahora<br>
            Que sea una vida o sea una hora<br>
            No me dejes libre aquí desnudo<br>
            Mi nuevo espacio que ahora es tuyo, te ruego<br>
            Víveme sin más vergüenza<br>
            Aunque esté todo el mundo en contra<br>
            Deja la apariencia y toma el sentido<br>
            Y siente lo que llevo dentro<br>
            Y te transformas en un cuadro dentro de mí<br>
            Que cubre mis paredes blancas y cansadas<br>
            Créeme esta vez, créeme porque<br>
            Me haría daño una y otra vez<br>
            Sí, entre mi realidad<br>
            Hoy yo tengo algo más<br>
            Que jamás tuve ayer<br>
            Necesitas vivirme un poco más<br>
            Víveme sin miedo ahora<br>
            Que sea una vida o sea una hora<br>
            No me dejes libre aquí desnudo<br>
            Mi nuevo espacio que ahora es tuyo, te ruego<br>
            Víveme sin más vergüenza<br>
            Aunque esté todo el mundo en contra<br>
            Deja la apariencia y toma el sentido<br>
            Y siente lo que llevo dentro<br>
            Has abierto en mí la fantasía<br>
            Me esperan días de una ilimitada dicha<br>
            Es tu guión la vida mía<br>
            Me enfocas, me diriges, pones las ideas<br>
            Víveme sin miedo ahora<br>
            Aunque esté todo el mundo en contra<br>
            Deja la apariencia, toma el sentido<br>
            Y siente lo que llevo dentro`
        }


    }
    else{
        $(".lyrics").hide();
        lyrics.textContent = ""
    }
}

function cancelar_playlist(){
    $(".ventana_playlist").hide();
}

function nombre_repetido(nombre) {
    var playlist = JSON.parse( localStorage.getItem("play_list"));
    for ( i = 0; i < playlist.length; i++){
        if (playlist[i][0] == nombre){
            return true;
        }
    }
    return false;
}






