/*
    2C = Two of Clubs (Dos de Treboles)
    2D = Two fo Diamonds (Dos de Diamantes)
    2H = Two of Hearts (Dos de Corazones)
    2S = Two of Spades (Dos de Espadas)

*/

let deck = [];
const tipos = ['C','D','H','S']
const especiales = ['A','J','Q','K']

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
    console.log(deck);
    return deck;
    
}
crearDeck();

// esta funcion me permite tomar una carta
const pedirCarta = () => {

    if (deck.length === 0 ){
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();

    console.log(carta);
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

 const valor = valorCarta(pedirCarta());
 console.log({valor});



