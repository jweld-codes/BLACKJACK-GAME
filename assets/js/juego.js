const  miModulo = (() => {
    'use strict'

    let deck = [];
    const tipos = ['C','D','H','S'],
          especiales = ['A','J','Q','K']

    let puntosJugadores = [];
   
    // referencias
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    const puntosHTML = document.querySelectorAll('small'),
          divCartasJugadores = document.querySelectorAll('.divCartas');

    // inicializa el juego
    const inicializarJuego = ( numJugadores = 2) => {
        deck = crearDeck();

        puntosJugadores = [];
        for( let i = 0; i< numJugadores; i++ ) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach( elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;
        
    }

    // Crea nueva baraja de cartas
    const crearDeck = () =>{
      
        deck = [];
        for(let i = 2; i <= 10; i++){
            for(let tipo of tipos){
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos){
            for(let esp of especiales){
                deck.push(esp + tipo);
            }
        }
        return  _.shuffle(deck);;
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
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];

    }

    const crearCarta = ( carta, turno ) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append( imgCarta );

    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputador] = puntosJugadores;

        setTimeout( () => {
            if(puntosComputador === puntosMinimos){
            alert('Nadie gana');

            }else if (puntosMinimos > 21){
            alert('La computadora gana');

            }else if (puntosComputador > 21){
            alert('Jugador Gana');
            } else {
                alert('Compuatdora Gana');
            }
        }, 100);
    }

    //evento para la computadora
    const turnoComputador = (puntosMinimos) => {

        let puntosComputador = 0;

        do {
            const carta = pedirCarta();
            puntosComputador = acumularPuntos(carta, puntosJugadores.length-1 );
            crearCarta(carta, puntosJugadores.length-1 );
        
        } while ( (puntosComputador < puntosMinimos) && (puntosMinimos <= 21 ) );
        
        determinarGanador();

        
    }

    btnPedir.addEventListener('click',() => {
        
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);
        
        crearCarta( carta, 0);

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

        turnoComputador(puntosJugadores[0]);

    });

    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
    })

    return {
        nuevoJuego: inicializarJuego
    };

})();
