const cards = document.querySelectorAll(".memory-card");
const flipSound = new Audio("assets/cardflip.mp3");
flipSound.volume = 0.5;
flipSound.playbackRate = 2;

// declare match variables
let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard() {
  flipSound.play();
  this.classList.add("flip");
  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
  } else { 
    // second click
    hasFlippedCard = false;
    secondCard = this;
    // do cards match?
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        // it's a match!
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard); 
    } else {
        // not a match
        setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        }, 1500);

    }

    console.log('function was executed!');
  }

}

cards.forEach((card) => card.addEventListener("click", flipCard));
