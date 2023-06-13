const cards = document.querySelectorAll(".memory-card");
const flipSound = new Audio("assets/cardflip.mp3");
flipSound.volume = 0.5;
flipSound.playbackRate = 2;
const unflipSound = new Audio("assets/unflip.mp3");
unflipSound.volume = 0.3;
unflipSound.playbackRate = 2;

// declare variables
let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard() {
  flipSound.play();
  this.classList.add("flip");

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  // second click
  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  // ternary operator is if/else statement in one line
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  // condition ? true : false
  isMatch ? disableCards() : unflipCards();

  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
  }

  function unflipCards() {
    setTimeout(() => {
      unflipSound.play();
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
    }, 1500);
  }
}

cards.forEach((card) => card.addEventListener("click", flipCard));
