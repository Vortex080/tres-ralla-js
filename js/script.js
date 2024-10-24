// Variables globales
let jugadorActual = 'X'; // 'X' o 'O'
let tablero = Array(3).fill().map(() => Array(3).fill(0)); // Representa el tablero
let contadorX = 0; // Partidas ganadas por X
let contadorO = 0; // Partidas ganadas por O

// Selección de elementos del DOM
const jugadorActualSpan = document.getElementById('jugadorActual');
const ganadasXSpan = document.getElementById('ganadasX');
const ganadasOSpan = document.getElementById('ganadasO');
const celdas = document.querySelectorAll('.cell');
const eligeX = document.getElementById('chooseX');
const eligeO = document.getElementById('chooseO');

// Función para seleccionar jugador
eligeX.addEventListener('click', () => seleccionarJugador('X'));
eligeO.addEventListener('click', () => seleccionarJugador('O'));

function seleccionarJugador(opcion) {
    jugadorActual = opcion; // Cambiar entre 'X' y 'O'
    jugadorActualSpan.textContent = jugadorActual; // Actualizar el texto en el HTML
}

// Función para hacer movimiento en la celda
celdas.forEach((celda, index) => {
    celda.addEventListener('click', () => hacerMovimiento(index, celda));
});

function hacerMovimiento(index, celda) { // Agregar celda como parámetro
    const fila = Math.floor(index / 3);
    const columna = index % 3;

    if (tablero[fila][columna] === 0) { // Verificar si la celda está vacía
        tablero[fila][columna] = jugadorActual === 'X' ? 1 : -1; // Actualizar el tablero
        celda.textContent = jugadorActual; // Pintar la celda
        celda.classList.add(jugadorActual === 'X' ? 'x' : 'o'); // Añadir clase para CSS

        if (comprobarGanador()) {
            // Actualizar contador
            if (jugadorActual === 'X') {
                contadorX++;
                alert('¡X gana!');
                ganadasXSpan.textContent = contadorX; // Actualizar contador en el HTML
            } else {
                contadorO++;
                alert('¡O gana!');
                ganadasOSpan.textContent = contadorO; // Actualizar contador en el HTML
            }
            reiniciarJuego();
        } else {
            jugadorActual = jugadorActual === 'X' ? 'O' : 'X'; // Cambiar de jugador
            jugadorActualSpan.textContent = jugadorActual; // Actualizar turno
        }
    }
}


// Función para comprobar ganador
function comprobarGanador() {
    // Comprobar filas y columnas
    for (let i = 0; i < 3; i++) {
        if (Math.abs(tablero[i].reduce((a, b) => a + b)) === 3) return true; // Fila
        if (Math.abs(tablero[0][i] + tablero[1][i] + tablero[2][i]) === 3) return true; // Columna
    }
    // Comprobar diagonales
    if (Math.abs(tablero[0][0] + tablero[1][1] + tablero[2][2]) === 3) return true;
    if (Math.abs(tablero[0][2] + tablero[1][1] + tablero[2][0]) === 3) return true;

    return false; // No hay ganador
}

// Función para reiniciar el juego
function reiniciarJuego() {
    tablero = Array(3).fill().map(() => Array(3).fill(0)); // Reiniciar tablero
    celdas.forEach(celda => {
        celda.textContent = ''; // Limpiar celdas
        celda.classList.remove('x', 'o'); // Eliminar clases de estilo
    });
    jugadorActual = 'X'; // Reiniciar jugador
    jugadorActualSpan.textContent = jugadorActual; // Restablecer turno
}
