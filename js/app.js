document.addEventListener("DOMContentLoaded", function(event) {
  createArr()
  reAssign();
});

/*
 * Create a list that holds all of your cards
 */
let cards = document.querySelectorAll('.card .fa');
let icons = [];

function createArr() {
  for (let card of cards) {
    icons.push(card.className);
  }
}
//icons array is made out of cards classNames strings

let clearCards = document.getElementsByClassName('card');

function reAssign() {
  shuffle(icons);
  for (let i = 0; i < icons.length; i++) {
    cards[i].className = icons[i];
  }
  for (let clearCard of clearCards) {
    clearCard.classList.remove('match');
    //hide all the cards again at each new game start
  }
  numberOfMoves = 0;
  document.querySelector('.moves').innerText = numberOfMoves;
  //clears the number of moves
  clearTimeout(t);
  startingTime = 0;
  document.querySelector('.seconds').innerText = startingTime;
  //clears the timer
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('open')) {
    event.preventDefault();
    //prevents the matching of the same card with itself
  } else if (event.target.classList.contains('card')) {
    showCard(event);
    addCardToList(event);
  }
}, false);

function showCard(event) {
  event.target.classList.add('show', 'open');
}

openCards = [];

function addCardToList(event) {
  openCards.push(event.target);
  if ((openCards.length == 2) && (openCards[0].innerHTML === openCards[1].innerHTML)) {
    lockedState();
    moveCounter();
  } else if (((openCards.length == 2) && (openCards[0].innerHTML !== openCards[1].innerHTML))) {
    setTimeout(reHideCards, 1000);
    moveCounter();
  }
  if (document.getElementsByClassName('match').length == 16) {
    setTimeout(finalScore, 500);
  }
}

function lockedState() {
  for (let openCard of openCards) {
    openCard.classList.remove('show', 'open');
    openCard.classList.add('match');
    openCards = []; //empties the Array containing the clicked cards
  }
}

function reHideCards() {
  for (let openCard of openCards) {
    openCard.classList.remove('show', 'open');
    openCards = []; //empties the Array containing the clicked cards
  }
}

let numberOfMoves = Number(document.querySelector('.moves').innerText);

function moveCounter() {
  numberOfMoves += 1;
  document.querySelector('.moves').innerText = numberOfMoves;
}
//increases the counter by 1 at each move
function finalScore() {
  if (confirm(`
    CONGRATULATIONS!
    YOU HAVE WON THE GAME WITH ${numberOfMoves} MOVES!

    WANNA PLAY AGAIN?`)) {
    reAssign();
  }

};

let startingTime = 0;
let t;

function timer() {
  document.querySelector('.seconds').innerText = startingTime;
  startingTime++;
  t = setTimeout(timer, 1000);
}
