'use strict';
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const playerSocre1 = document.getElementById('score--0');
const playerSocre2 = document.getElementById('score--1');
const currentSocre1 = document.getElementById('current--0');
const currentSocre2 = document.getElementById('current--1');
const diceNum = new Array(
  'dice-1.png',
  'dice-2.png',
  'dice-3.png',
  'dice-4.png',
  'dice-5.png',
  'dice-6.png'
);
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');
let diceImage = document.querySelector('.dice');

function getRandom() {
  return Math.floor(Math.random() * diceNum.length + 1);
}

//get a random number from the dice
let randomDice;

//changing the image of the dice
function changeDiceImage(num) {
  diceImage.src = diceNum[num - 1];
}
// changeDiceImage(randomDice);

let score, currentSocre, activePlayer, playing;

//starting conditions
const init = function () {
  score = [0, 0];
  currentSocre = 0;
  activePlayer = 0;
  playing = true;
  randomDice = getRandom();
  changeDiceImage(randomDice);

  playerSocre1.textContent = 0;
  playerSocre2.textContent = 0;
  currentSocre1.textContent = 0;
  currentSocre2.textContent = 0;

  activePlayer1();
  diceImage.classList.add('hidden');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
};

init();
function currentAdding(randomDice, currentNum) {
  if (randomDice === 1) {
    return 0;
  } else {
    return (currentNum += Number(randomDice));
  }
}

function activePlayer1() {
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
}

const switchPlayer = function () {
  //set the pervious players current score back to 0
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentSocre = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

//roll dice
rollDice.addEventListener('click', function () {
  if (playing) {
    randomDice = getRandom();
    changeDiceImage(randomDice);

    if (randomDice !== 1) {
      currentSocre = currentAdding(randomDice, currentSocre);
      console.log(currentSocre);
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentSocre;
    } else {
      switchPlayer();
    }
  }
});

//HOLD
hold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentSocre;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
  }
  if (score[activePlayer] >= 20) {
    playing = false;
    if (activePlayer === 1) {
      player2.classList.add('player--winner');
      player1.classList.remove('player--active');
    } else {
      player1.classList.add('player--winner');
      player2.classList.remove('player--active');
    }
  } else {
    switchPlayer();
  }
});
newGame.addEventListener('click', init);
