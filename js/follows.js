function actualizar_buscador(){
    //Aparición y desaparición de  botón de la canción
    let x = document.getElementsByClassName('buscador_usuario');
    for (i = 0; i < x.length; i++) { 
        x[i].style.display="none";
    }
    actualizar__cabecera();
    $(".reproductor").hide();

}

function search_user() {
    //Busca el nombre de usuario en el buscador de usuarios
    let input = document.getElementById('search_users').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('buscador_usuario');
    user = localStorage.getItem("usuario")
    if (input == "" || input==null){ 
        //si no hay nada escrito en el buscador no aparece nadie
        for (i = 0; i < x.length; i++) { 
            x[i].style.display="none";
        }
   }

    else{
        for (i = 0; i < x.length; i++) { 
            //Aparecen los usuarios cuyo nombre tenga letras escritas en el buscador
            if (x[i].innerHTML!=user){
                if (!x[i].innerHTML.toLowerCase().includes(input)) {
                    x[i].style.display="none";
                }
                else {
                    x[i].style.display="list-item";                 
                }
            }
        }
    }
}

function añadir_follow (nombre){
    //Añade follower
    follow = JSON.parse( localStorage.getItem ( "follow" ));
    encontrado = 0;
    for (i = 0; i< follow.length; i++){
        //Comprueba si ya sigue al usuario
        if (follow[i] == nombre){
            encontrado = 1;
        }
    }
    if (encontrado == 0){
        //Se añade el usuario a la lista de usuarios seguidos en caso de que no esté ya
        follow.push(nombre);
        localStorage.setItem ("follow", JSON.stringify ( follow ) );
        añadir_follow_html(nombre);
    }
}

function añadir_follow_html (nombre){
    const usuario = document.createElement("div");
    usuario.className = "usuario";
    // Creacion de la imagen
    const imagen_usuario = document.createElement("img");
    usuarioCompleto = devolver_usuario(nombre);
    pfp = usuarioCompleto.pfpUsuario;
    if (pfp == null || pfp.length == 0){
        pfp = "/images/foto_perfil.webp";
    }

    imagen_usuario.src = pfp;
    imagen_usuario.className = "imagen_usuario";
    // Creacion del h3
    const h3_usuario = document.createElement("h3");
    h3_usuario.textContent = nombre;

    const usuarios = document.getElementById("usuarios");
    usuario.appendChild(imagen_usuario);
    usuario.appendChild(h3_usuario);
    usuarios.appendChild(usuario);
    hay_follow();
}

function devolver_usuario (nombre){
    personas = JSON.parse( localStorage.getItem ( "personas" ));
    for (let i = 0; i<personas.length; i++) {
        if (nombre == personas[i].nombreUsuario) {
            return personas[i];
        }
    }
    return false;
}

function crear_lista_follow (){
    //Cre la lista con los followers
    follow = JSON.parse( localStorage.getItem ( "follow" ));
    for (i = 0; i < follow.length ; i++){
        añadir_follow_html(follow[i]);
    }
}

$(".no_follow").hide();
function hay_follow(){
    //Si no hay nadie al que siga se muestra por pantalla un mensaje
    lista = JSON.parse(localStorage.getItem("follow"));
    if (lista.length == 0){
        $(".no_follow").show();
    }
    else{
        $(".no_follow").hide(); 
    }
}

function buscar_usuarios(){
    //Añade al buscador de usuarios los usuarios registrados
    personas = JSON.parse( localStorage.getItem ( "personas" ));
    lista_usuarios = document.getElementById("list_user_id")
    for (i=0;i<personas.length; i++){
        user = personas[i].nombreUsuario;
        li = document.createElement("li");
        li.className="follower buscador_usuario";
        li.innerHTML = user;
        li.onclick = anadir_my_follow(user);
        lista_usuarios.appendChild(li);


    }
}

function anadir_my_follow(user){
    return function(){añadir_follow(user)}
}