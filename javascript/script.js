const cards = document.querySelectorAll('.memory-card');
const flipSound = new Audio('assets/cardflip.mp3');
flipSound.volume = 0.5;
flipSound.playbackRate = 2;

function flipCard() {
this.classList.toggle('flip');
flipSound.play();
}

cards.forEach(card => card.addEventListener('click', flipCard));