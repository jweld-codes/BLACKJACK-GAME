/*
    2C = Two of Clubs (Dos de Treboles)
    2D = Two fo Diamonds (Dos de Diamantes)
    2H = Two of Hearts (Dos de Corazones)
    2S = Two of Spades (Dos de Espadas)

*/

let deck = [];

const tipos = ['C','D','H','S']
const especiales = ['A','J','Q','K']

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

// console.log(deck);
deck = _.shuffle(deck);
console.log(deck);
return deck;
    
}

crearDeck();





