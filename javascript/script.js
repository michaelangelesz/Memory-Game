// the memory cards
const cards = document.querySelectorAll(".memory-card");

// sound effects
const flipSound = new Audio("assets/cardflip.mp3");
flipSound.volume = 0.5;
flipSound.playbackRate = 2;
const unflipSound = new Audio("assets/unflip.mp3");
unflipSound.volume = 0.3;
unflipSound.playbackRate = 2;

// player lives
const playerLivesCount = document.querySelector("span");
let playerLives = 12;

// link text
playerLivesCount.textContent = playerLives;

// game variables
let intialFlip = false;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// flip card function
function flipCard() {
  if (!intialFlip) {
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

// card match count
let count = 0;

// check for match function
function checkForMatch() {
  // ternary operator is if/else statement in one line
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  // condition ? true : false
  isMatch ? disableCards() : unflipCards();

  // if cards match, disable them
  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    // count each time a match is made, needed for win function
    count++;
    console.log("Function has been called " + count + " times.");
    if (count === 9) {
      winGame();
    }
    resetBoard();
  }

  // if cards don't match, unflip them
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
    // subtract a life for each mismatch
    playerLives--;
    playerLivesCount.textContent = playerLives;
    if (playerLives === 0)
      setTimeout(() => {
        gameOver();
      }, 500);
  }

  // reset board function
  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }
}

// immediately invoked function expression (IIFE)
(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 18);
    card.style.order = randomPos;
  });
})();

// game over function
function gameOver() {
  lockBoard = true;
  const text = "Egads! 😵‍💫 Foiled again!";
  setTimeout(() => {
    const messageDiv = document.createElement("div");
    messageDiv.setAttribute("id", "message");
    messageDiv.textContent = text;

    // create play again button
    const playAgainBtn = document.createElement("button");
    playAgainBtn.textContent = "New Game";
    playAgainBtn.addEventListener("click", () => {
      newGame();
      messageDiv.style.opacity = "0";
      setTimeout(() => {
        messageDiv.remove();
      }, 300);
    });

    // add play again button to message div
    messageDiv.appendChild(playAgainBtn);
    document.body.appendChild(messageDiv);

    // animate message div
    messageDiv.style.opacity = "1";
  }, 500);
}

// win game function
function winGame() {
  const text = "🤩 Awesome! You win! 🤩";
  setTimeout(() => {
    // create message div
    const messageDiv = document.createElement("div");
    messageDiv.setAttribute("id", "message");
    messageDiv.textContent = text;

    // create play again button
    const playAgainBtn = document.createElement("button");
    playAgainBtn.textContent = "Play Again";
    playAgainBtn.addEventListener("click", () => {
      newGame();
      messageDiv.style.opacity = "0";
      setTimeout(() => {
        messageDiv.remove();
      }, 300);
    });

    // add play again button to message div
    messageDiv.appendChild(playAgainBtn);
    document.body.appendChild(messageDiv);

    // animate message div
    messageDiv.style.opacity = "1";
  }, 500);
  console.log("Count has reached 9.");
}

// new game function
function newGame() {
  location.reload();
}

// add event listener to each card
cards.forEach((card) => card.addEventListener("click", flipCard));
