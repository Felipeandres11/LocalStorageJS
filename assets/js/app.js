//Variables
const listaTweets = document.getElementById('lista-tweets');

//Event listener

eventListeners();

function eventListeners(){

     //Cuando se envia el formulario

     document.querySelector('#formulario').addEventListener('submit', agregarTweet)
     ;

     listaTweets.addEventListener('click', borrarTweet);

     document.addEventListener('DOMContentLoaded', localStorageListo);
}

function agregarTweet(e){

    e.preventDefault();
    //LEER EL VALOR DEL TEXTAREA
    const tweet = document.getElementById('tweet').value;


    //CREAR BOTON DE ELIMINAR 
    
    const botonBorrar = document.createElement('a');

    botonBorrar.classList='borrar-tweet';
    botonBorrar.innerText = 'X';

    // 

    const li = document.createElement('li');
    li.innerText = tweet;
    //AÑADE EL BOTON DE BORRAR AL TWEET
    li.appendChild(botonBorrar);
    //AÑADE EL TWEET A LA LISTA
    listaTweets.appendChild(li);

    console.log(tweet);


    //AÑADIR A LOCALSTORAGE

    agregarTweetLocalStorage(tweet);
}

//ELIMINA EL TWEET DEL DOM
function borrarTweet(e){
    e.preventDefault();
    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.textContent)
       
    }

    console.log('diste click en la lista');
}


//MOSTRAR DATOS DE LOCALSTORAGE EN LA LISTA

function localStorageListo(){
    let tweets;

    tweets = obtenerTweetsLocalStorage();

        tweets.forEach(element => {
            //CREAR BOTON DE ELIMINAR 
        
        const botonBorrar = document.createElement('a');

        botonBorrar.classList='borrar-tweet';
        botonBorrar.innerText = 'X';

        // 

        const li = document.createElement('li');
        li.innerText = element;
        //AÑADE EL BOTON DE BORRAR AL TWEET
        li.appendChild(botonBorrar);
        //AÑADE EL TWEET A LA LISTA
        listaTweets.appendChild(li);
        });
    
}

//AGREGA TWEET A LOCAL STORAGE 
function agregarTweetLocalStorage(tweet){
    //
    let tweets;

    tweets = obtenerTweetsLocalStorage();


    //AÑADIR EL NUEVO TWEET 

    tweets.push(tweet);

    //CONVERTIR DE STRING A ARREGLO PARA LOCAL STORAGE

    localStorage.setItem('tweets', JSON.stringify(tweets));


}


function obtenerTweetsLocalStorage(){
    let tweets; 
 

    //REVISAMOS LOS VALORES DE LOCAL STORAGE

    if(localStorage.getItem('tweets') === null){
        tweets = [];
    }else {
         tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

//ELIMINAR TWEET LOCALSTORAGE

function borrarTweetLocalStorage(tweet){

    let tweets, tweetBorrar;
    //ELIMINA LA X
    tweetBorrar = tweet.substring(0, tweet.length - 1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(element, index)  {
        if(tweetBorrar === element){
            tweets.splice(index, 1);
        }
    })
    localStorage.setItem('tweets', JSON.stringify(tweets))
}
