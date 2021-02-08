'use strict';
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const playerSocre1 = document.getElementById('score--0');
const playerSocre2 = document.getElementById('score--1');
const currentSocre1 = document.getElementById('current--0');
const currentSocre2 = document.getElementById('current--1');
const diceNum1 = new Array(
  'dice-1.png',
  'dice-2.png',
  'dice-3.png',
  'dice-4.png',
  'dice-5.png',
  'dice-6.png'
);
const diceNum2 = new Array(
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
let diceImage1 = document.querySelector('.dice1');
let diceImage2 = document.querySelector('.dice2');

function getRandom1() {
  return Math.floor(Math.random() * diceNum1.length + 1);
}
function getRandom2() {
  return Math.floor(Math.random() * diceNum2.length + 1);
}
//get a random number from the dice
let randomDice1;
let randomDice2;

//changing the image of the dice
function changeDiceImage1(num) {
  diceImage1.src = diceNum1[num - 1];
}
function changeDiceImage2(num) {
  diceImage2.src = diceNum2[num - 1];
}
// changeDiceImage(randomDice);

let score, currentSocre, activePlayer, playing;

//starting conditions
const init = function () {
  score = [0, 0];
  currentSocre = 0;
  activePlayer = 0;
  playing = true;
  randomDice1 = getRandom1();
  randomDice2 = getRandom2();
  changeDiceImage1(randomDice1);
  changeDiceImage2(randomDice2);

  playerSocre1.textContent = 0;
  playerSocre2.textContent = 0;
  currentSocre1.textContent = 0;
  currentSocre2.textContent = 0;

  activePlayer1();
  diceImage1.classList.add('hidden');
  diceImage2.classList.add('hidden');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
};

init();
function currentAdding(randomDice1, randomDice2, currentNum) {
  if (randomDice1 === 1 || randomDice2 === 1) {
    return 0;
  } else {
    let diceNum = Number(randomDice1) + Number(randomDice2);
    return (currentNum += Number(diceNum));
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
    randomDice1 = getRandom1();
    randomDice2 = getRandom2();
    changeDiceImage1(randomDice1);
    changeDiceImage2(randomDice2);

    if (randomDice1 !== 1 || randomDice2 !== 1) {
      currentSocre = currentAdding(randomDice1, randomDice2, currentSocre);
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
  if (score[activePlayer] >= 50) {
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
