const cards = document.querySelectorAll('.memory-card');
const flipSound = new Audio('assets/cardflip.mp3');
flipSound.volume = 0.5;
flipSound.playbackRate = 2;

let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard() {
    flipSound.play();
this.classList.add('flip');
if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    console.log({hasFlippedCard, firstCard});
}
}

cards.forEach(card => card.addEventListener('click', flipCard));