'use strict';
// creating the secret number
let secretNumber = Math.trunc(Math.random() * 20) + 1;
// base score
let score = 20;
let highScore = 0;

const displayText = function (className, msg) {
  document.querySelector(`.${className}`).textContent = msg;
};

// event listener for check button
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  // if no number is entered
  if (!guess) {
    displayText('message', '⛔ No Number!');
  }
  // if guess is correct
  else if (guess === secretNumber) {
    displayText('message', '🎉 Correct Number!');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    displayText('number', secretNumber);
    if (score > highScore) {
      highScore = score;
      displayText('highscore', highScore);
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayText(
        'message',
        guess > secretNumber ? '📈 Too High!' : '📉 Too Low!'
      );
      score -= 1;
      displayText('score', score);
    } else {
      displayText('message', '😝 You Lose!');
      displayText('score', 0);
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  displayText('score', score);
  displayText('message', 'Start guessing...');
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  displayText('number', '?');
});
