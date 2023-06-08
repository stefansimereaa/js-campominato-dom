console.log('JS Ok');

// Recupero elementi dal DOM
const grid = document.getElementById('grid');
const button = document.getElementById('play');
const selectedLevel = document.getElementById('levels');
const scoreElement = document.getElementById('score');
const explosionSound = document.getElementById('explosion-sound');
const winSound = document.getElementById('win-sound');
const loseSound = document.getElementById('lose-sound');
const winImage = document.getElementById('win');
const loseImage = document.getElementById('lose');

let rows;
let cols;
let totalCells;
let bombs;
let score;
let gameEnded;


// Funzione per la creazione delle celle
const createCell = () => {
  const cell = document.createElement('div');
  cell.className = 'cell hidden';

  // Controllo click sulla cella
  const clickControl = () => {
    if (!gameEnded) {
      const cellNumber = parseInt(cell.innerText);
      if (bombs.includes(cellNumber)) {
        cell.classList.add('bomb');
        endGame(false);
      } else {
        cell.classList.add('clicked');
        cell.removeEventListener('click', clickControl);
        updateScore();
      }
    }
  };
  cell.addEventListener('click', clickControl);
  return cell;
};

// Funzione per resettare il gioco
const resetGame = () => {
  grid.innerHTML = '';
  score = 0;
  gameEnded = false;
};

// Funzione per generare le bombe
const generateBombs = () => {
  bombs = [];
  while (bombs.length < 16) {
    const randomNumber = Math.floor(Math.random() * totalCells) + 1;
    if (!bombs.includes(randomNumber)) {
      bombs.push(randomNumber);
    }
  }
  console.log('Bombs:', bombs);
};

// Funzione per incrementare il punteggio
const updateScore = () => {
  score++;
  scoreElement.innerText = 'Score: ' + score;
  checkGameEnd();
};

// Funzione per verificare la fine del gioco
const checkGameEnd = () => {
    if (score === totalCells - bombs.length) {
      endGame(true);
    }
};

// Funzione per mostrare a fine partita tutte le celle
const revealCells = () => {
    const cells = grid.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      cell.classList.remove('hidden');
      if (bombs.includes(parseInt(cell.innerText))) {
        cell.classList.add('bomb');
      } else {
        cell.classList.add('clicked');
      }
    }
};

// Funzione per terminare il gioco
const endGame = (isWin) => {
  gameEnded = true;
  scoreElement.innerText = 'Score: ' + score;
  const result = document.getElementById('result');

  if (isWin) {
    winImage.style.display = 'block';
    winSound.play();
    loseImage.style.display = 'none';
  }else {
    loseImage.style.display = 'block';
    loseSound.play();
    winImage.style.display = 'none';
  }

  revealCells();
  explosionSound.play();
};

// Controllo Click del pulsante Play
button.addEventListener('click', function () {

    //Controllo difficolta livello della griglia
    const valueLevel = selectedLevel.value;
    switch (valueLevel) {
        case 'superhard':
        rows = 7;
        cols = 7;
        break;
        case 'hard':
        rows = 9;
        cols = 9;
        break;
        case 'normal':
        default:
        rows = 10;
        cols = 10;
    }
    totalCells = rows * cols;

    //Richiamo funzioni
    resetGame();
    generateBombs();

    //Cambio dimensioni griglia
    const root = document.querySelector(':root');
    root.style.setProperty('--cols', cols);

    for (let i = 0; i < totalCells; i++) {
        const cell = createCell();
        cell.innerText = i + 1;
        grid.appendChild(cell);
    }
});
