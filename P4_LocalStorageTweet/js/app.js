//variables
const formulario = document.querySelector('#formulario');
const listaTweetsContainer = document.querySelector('#lista-tweets');
let listaTweets = [];

//event listeners
eventListeners();

function eventListeners(){
    formulario.addEventListener('submit',agregarTweet);

    //para que se muestren aunque recarguen la pagina o cierren
    document.addEventListener('DOMContentLoaded',()=>{
        listaTweets=JSON.parse(localStorage.getItem('listaTweets')) || []; //en caso de que este vacio no peta diciendo que es null si no que estara vacio
        crearHTML();
    });
}

//funciones
function agregarTweet(e){
    e.preventDefault();

    //text area domde el usuario escribe
    const tweet = document.querySelector('#tweet').value.trim();
    
    //validacion
    if(tweet.trim()==''){
        mostrarError('Un mensaje no puede ir vacio');
        return;
    }

    const tweetObj={
        id:Date.now(), //es una forma de darle un identificador unico a cada mensaje sin base de datos
        tweet, //poner eso es igual a poner tweet: tweet 
    }

    //añadir al array de listaTweeets
    listaTweets=[...listaTweets,tweetObj];
    
    //vamos a crear el html una vez agredgado
    crearHTML();

    //reiniciar el formulario
    formulario.reset();

}

function mostrarError(mensaje){
    let mensajeError = document.createElement('P');
    mensajeError.textContent=mensaje;
    mensajeError.classList.add('error');

    //insertar en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //eliminamos la alerta
    setTimeout(()=>{
        mensajeError.remove();
    },2000);
}

function crearHTML(){
    limpiarHTML();

    if(listaTweets.length>0){
        listaTweets.forEach(tweet=>{
            //agregar un boton de eliminar
            const btnEliminarIdea=document.createElement('a');
            btnEliminarIdea.classList.add('borrar-tweet');
            btnEliminarIdea.innerText = ' X';

            //añadir la funcion de eliminar
            btnEliminarIdea.onclick = () =>{
                borrarTweet(tweet.id);
            }

            //crear html
            const li=document.createElement('li');
            li.innerText=tweet.tweet;
            li.appendChild(btnEliminarIdea);

            listaTweetsContainer.appendChild(li);
        });
    }

    sincronizarLocalStorage();
}

/**
 * nos alamcena las variables en el alamcenamiento local
 */
function sincronizarLocalStorage(){
    localStorage.setItem('listaTweets',JSON.stringify(listaTweets));
}

function borrarTweet(id){
    listaTweets= listaTweets.filter(tweet=>tweet.id!==id);
    crearHTML();
}

function limpiarHTML(){
    while(listaTweetsContainer.firstChild){
        listaTweetsContainer.removeChild(listaTweetsContainer.firstChild);
    }
}