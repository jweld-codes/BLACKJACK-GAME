/*
    2C = Two of Clubs (Dos de Treboles)
    2D = Two fo Diamonds (Dos de Diamantes)
    2H = Two of Hearts (Dos de Corazones)
    2S = Two of Spades (Dos de Espadas)

*/

let deck = [];
const tipos = ['C','D','H','S']
const especiales = ['A','J','Q','K']
 
let puntosJugador = 0 , 
    puntosComputador = 0;

// referencias

const btnPedir = document.querySelector('#btnPedir');
const puntosHTML = document.querySelectorAll('small');

const divCartasJugador = document.querySelector('#jugador-cartas');

// Crea nueva baraja de cartas
const crearDeck = () =>{
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
    deck = _.shuffle(deck);
    return deck;
}
crearDeck();

// esta funcion me permite tomar una carta
const pedirCarta = () => {
    if (deck.length === 0 ){
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
     return carta;
}
pedirCarta();

// esta funcion le assigna el valor númerico a la carta
 const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length-1);
    return (isNaN(valor) )?
            (valor === 'A') ? 11:10
            : valor * 1;
 }

// Eventos

btnPedir.addEventListener('click',() => {
    
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');

    divCartasJugador.append( imgCarta );

    if (puntosJugador > 21){
        console.warn('Jugador Perdió');
        btnPedir.disabled = true;
    }else if (puntosJugador === 21){
        console.warn('Gano');
        btnPedir.disabled = true;
    }
})


