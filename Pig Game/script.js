'use strict';

// Selecting the elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');

const dice = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Initial conditions
score0.textContent = 0;
score1.textContent = 0;

dice.classList.add('hidden');

let currentScore, activePlayer, playing, scores;

// Reusable function for initializing/resetting values
const init = function () {
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  dice.classList.add('hidden');

  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scores = [0, 0];
};

init();

// Reusable function for switching players
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${diceNum}.png`;
    if (diceNum !== 1) {
      currentScore += diceNum;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// Reset game functionality
btnNew.addEventListener('click', init);
