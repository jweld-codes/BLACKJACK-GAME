/*
    2C = Two of Clubs (Dos de Treboles)
    2D = Two fo Diamonds (Dos de Diamantes)
    2H = Two of Hearts (Dos de Corazones)
    2S = Two of Spades (Dos de Espadas)

*/

let deck = [];
let nuevoDeck = [];
const tipos = ['C','D','H','S'],
      especiales = ['A','J','Q','K']
 
//let puntosJugador = 0 , 
  //  puntosComputador = 0;

let puntosJugadores = [];

// referencias

const btnPedir = document.querySelector('#btnPedir'),
      btnDetener = document.querySelector('#btnDetener'),
      btnNuevo = document.querySelector('#btnNuevo');

const puntosHTML = document.querySelectorAll('small'),
      divCartasJugador = document.querySelector('#jugador-cartas'),
      divCartasComputador = document.querySelector('#computador-cartas');

      // inicializa el juego
const inicializarJuego = ( numJugadores = 2) =>{
    crearDeck();

    for(let i = 0; i < numJugadores; i++){
        puntosJugadores.push(0);
    }
    console.log(puntosJugadores)
}
// Crea nueva baraja de cartas
const crearDeck = () =>{

    deck = [];
    for(i = 2; i <= 10; i++){
        for(let tipo of tipos){
            deck.push(i + tipo);
        }
    }

    for (let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp + tipo);
        }
    }
    return _.shuffle(deck);
}


// Esta funcion me permite tomar una carta
const pedirCarta = () => {
    if (deck.length === 0 ){
        throw 'No hay cartas en el deck';
    }
     return deck.pop();
}

// Esta funcion le assigna el valor númerico a la carta
 const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length-1);
    return (isNaN(valor) )?
            (valor === 'A') ? 11:10
            : valor * 1;
 }

// Eventos

//acumulacion de puntos del jugador

const acumularPuntos = () => {

}
//evento para la computadora
const turnoComputador = (puntosMinimos) => {

    do {
        const carta = pedirCarta();
        puntosComputador = puntosComputador + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputador;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');

        divCartasComputador.append( imgCarta );

       if (puntosComputador > 21){
            console.warn('Computadora Perdió');
            btnPedir.disabled = true;
        }else if (puntosComputador === 21){
            console.warn('Computadora Gano');
            btnPedir.disabled = true;
        }

        if(puntosMinimos > 21){
            break;
        }
    
    } while ( (puntosComputador < puntosMinimos) && (puntosMinimos <= 21 ) );

    setTimeout( () => {
        if(puntosComputador === puntosMinimos){
        alert('Nadie gana');

        }else if (puntosMinimos > 21){
        alert('La computadora gana');

        }else if (puntosComputador > 21){
        alert('Jugador Gana');
        } else {
            alert('Computadora Gana');
        }
    }, 10);
}

btnPedir.addEventListener('click',() => {
    
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');

    divCartasJugador.append( imgCarta );

    console.log(deck);

    if (puntosJugador > 21){
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputador(puntosJugador);

    }else if (puntosJugador === 21){
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputador(puntosJugador);
    }
});

btnDetener.addEventListener('click', () =>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputador(puntosJugador);

});

btnNuevo.addEventListener('click', () => {

    console.clear();

    btnPedir.disabled = false;
    btnDetener.disabled = false;

    //deck = [];
    //deck = crearDeck();
    inicializarJuego();
    puntosHTML[0].innerText = '0';
    puntosHTML[1].innerText = '0';

    puntosComputador = 0;
    puntosJugador = 0;

    divCartasJugador.innerHTML = '';
    divCartasComputador.innerHTML = '';
});