const timeH = document.querySelector(".timer");

const cards = document.querySelectorAll(".memory-card");
const flipSound = new Audio("assets/cardflip.mp3");
flipSound.volume = 0.5;
flipSound.playbackRate = 2;
const unflipSound = new Audio("assets/unflip.mp3");
unflipSound.volume = 0.3;
unflipSound.playbackRate = 2;


// declare variables
let countDown;
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
    }
  }, 1000);
}

function displayTime(second) {
  const min = Math.floor(second / 60);
  const sec = Math.floor(second % 60);
  timeH.innerHTML = `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
}

let intialFlip = false;
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

let count = 0;

function checkForMatch() {
  // ternary operator is if/else statement in one line
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  // condition ? true : false
  isMatch ? disableCards() : unflipCards();

  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    count++;
    console.log("Function has been called " + count + " times.");
    if (count === 9) {
        winGame();
    }
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

// (function shuffle() {
//   cards.forEach((card) => {
//     let randomPos = Math.floor(Math.random() * 18);
//     card.style.order = randomPos;
//   });
// })();

function endTime() {
  timeH.style.color = "rgb(237, 202, 176)";
  lockBoard = true;
  const text = "Egads! Foiled again! 😭";
  setTimeout(() => {
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
}

function winGame() {
  const text = "🤩 Awesome! You win! 🤩";
  setTimeout(() => {
    // make the timer stop upon winning
    clearInterval(countDown); // Call clearInterval() to stop the timer
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

function newGame() {
  location.reload();
}

cards.forEach((card) => card.addEventListener("click", flipCard));
