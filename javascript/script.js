const timeH = document.querySelector(".timer");

const cards = document.querySelectorAll(".memory-card");
const flipSound = new Audio("assets/cardflip.mp3");
flipSound.volume = 0.5;
flipSound.playbackRate = 2;
const unflipSound = new Audio("assets/unflip.mp3");
unflipSound.volume = 0.3;
unflipSound.playbackRate = 2;

// declare variables
let intialFlip = false;

let timeSecond = 60;

displayTime(timeSecond);

function startTimer() {
    let seconds = timeSecond;
    const countDown = setInterval(() => {
        seconds--;
        //timeH.innerHTML = `00:${seconds}`;
        displayTime(seconds);
        if (seconds <= 0 || seconds < 1) {
          endTime();
          clearInterval(countDown);
          setTimeout(() => {
            alert("You lose! 😭😭😭 Try again!");
          }, 333);
        }
      }, 1000);
}

function displayTime(second) {
  const min = Math.floor(second / 60);
  const sec = Math.floor(second % 60);
  timeH.innerHTML = `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
}

function endTime() {
  timeH.innerHTML = `😵‍💫 GAME OVER 😵‍💫`;
}

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (!intialFlip) {
    startTimer();
    intialFlip = true;
}
  
    // locks board so you can't click more than 2 cards at a time
  if (lockBoard) return;
  // prevents double clicking on same card
  if (this === firstCard) return;
  this.classList.add("flip");
  flipSound.play();

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // second click
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
    resetBoard();
  }

  function unflipCards() {
    // lock the board
    lockBoard = true;
    setTimeout(() => {
      unflipSound.play();
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      // unlocks board after 1.5 seconds
      resetBoard();
    }, 1500);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 18);
    card.style.order = randomPos;
  });
})();

function newGame() {
  location.reload();
}

cards.forEach((card) => card.addEventListener("click", flipCard));


// stop clock if all cards are flipped- for win
//cards[cards.length - 1].endTime();

// if (all cards are flipped <= 60s), win game
// if timer stops before all cards are clicked, lose game
