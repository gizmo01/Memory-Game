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

function reAssign() {
  shuffle(icons);
  for (let i = 0; i < icons.length; i++) {
    cards[i].className = icons[i];
  }
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
  if (event.target.classList.contains('card')) {
    // Do something...
    showCard();
  }
}, false);

function showCard() {
  event.target.classList.toggle('show');
  event.target.classList.toggle('open');
  addCardToList();
}

openCards = [];

function addCardToList() {
  openCards.push(event.target);
  if ((openCards.length == 2) && (openCards[0].innerHTML === openCards[1].innerHTML)) {
    // console.log("spaziale");
    lockedState();
    moveCounter();
  } else if (((openCards.length == 2) && (openCards[0].innerHTML !== openCards[1].innerHTML))) {
    setTimeout(reHideCards, 1000);
    moveCounter();
  }
  if (document.getElementsByClassName('match').length > 6) {
    setTimeout(finalScore, 500);
  }
}

function lockedState() {
  for (let openCard of openCards) {
    openCard.classList.toggle('show');
    openCard.classList.toggle('open');
    openCard.classList.add('match');
    openCards = []; //empties the Array containing the clicked cards
  }
}

function reHideCards() {
  for (let openCard of openCards) {
    openCard.classList.toggle('show');
    openCard.classList.toggle('open');
    openCards = []; //empties the Array containing the clicked cards
  }
}
