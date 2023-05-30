

function show_artista() {
    //No aparece la opción de artistas si no se ha iniciado sesión
    let input = document.getElementById('search2').value
    input=input.toLowerCase();
    let x = document.getElementsByClassName('boton__artista');

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