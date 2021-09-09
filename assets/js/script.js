'use strict';

// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.getElementsByClassName('dice')[0];

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const winningScore = 100;
const scores = [0, 0];
let currentScore, activePlayer, playing;

const init = () => {
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};
const switchPlayer = () => {
  //resetting last active player current score
  //updating UI for the same
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  //changing active player
  //updating UI for the same
  activePlayer = 1 - activePlayer;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
const finishGame = () => {
  //finish the game - current player wins
  playing = false;
  btnRoll.disabled = true;
  btnHold.disabled = true;
  diceEl.classList.add('hidden');
  //update UI for the same
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
};

init();

// Rolling dice functionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    //generate a random dice roll (1-6)
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    //display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `./assets/images/dice-${diceNumber}.png`;

    //check for roll : 1
    if (diceNumber === 1) {
      //switch to next player
      switchPlayer();
    } else {
      //add dice to current score
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});
// Holding score functionality
btnHold.addEventListener('click', () => {
  if (playing) {
    //add current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= winningScore) {
      finishGame();
    } else {
      switchPlayer();
    }
  }
});
// Reset Game functionality
btnNew.addEventListener('click', init);

// Displaying/Hiding Game Rules
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnShowModal = document.querySelector('.rules-icon');
const btnCloseModal = document.querySelector('.close-modal');
const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
const showModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
btnShowModal.addEventListener('click', showModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !modal.classList.contains('hidden'))
    closeModal();
});
