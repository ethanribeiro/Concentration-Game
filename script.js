// Essential variables 
const cardsContainer = document.querySelector(".cards");
const images = {
  Ace: "imgs/ace.png",
  2: "imgs/two.png",
  3: "imgs/three.png",
  4: "imgs/four.png",
  5: "imgs/five.png",
  6: "imgs/six.png",
  7: "imgs/seven.png",
  8: "imgs/eight.png",
  9: "imgs/nine.png",
  10: "imgs/10.png",
  Joker: "imgs/joker.png",
  Queen: "imgs/queen.png",
  King: "imgs/king.png",
  Heart: "imgs/heart.png",
  Diamond: "imgs/diamond.png"
}; // Object containing key value pairs to name and reference different card values with their respected images
const deckers = [
    images.Ace, 
    images[2], 
    images[3], 
    images[4], 
    images[5], 
    images[6], 
    images[7], 
    images[8], 
    images[9], 
    images[10], 
    images.Joker, 
    images.Queen, 
    images.King, 
    images.Heart, 
    images.Diamond
]; // Array variable containing object variables as references to the 'images' object.
const deckList = [...deckers, ...deckers]; // creating a new array with a spread operator to nest the deckers array twice, that spreads the elements of the array, thus making them individual elements in the new array.
// [...deckers] creates a new array that contains all the elements of the original deckers array.
const cardCount = deckList.length; // constant that contains the numerical value of the length of the deckList constant array that will always equal to 30. Since 'deckers' contains 15 elements, and 'deckList' contains the array element values of 'deckers' twice, the length will return a value of 30 elements contained in the deckList constant array.

// Game states
let revealedCount = 0;
let activeCard = null;
let awaitingEndOfMove = false;
let scoreTurns = 0; // number of turns the player has taken
let scoreErrors = 0; // number of incorrect matches the player has made
let scoreMatches = 0; // number of correct matches the player has made

let scoreboard = document.querySelector(".scoreboard");
console.log(scoreboard);

let turnScoreEl = scoreboard.appendChild(document.createElement("h3"));
turnScoreEl.setAttribute('id', 'turn-score');

let errorsScoreEl = scoreboard.appendChild(document.createElement("h3"));
errorsScoreEl.setAttribute('id', 'error-score');

let MatchScoreEl = scoreboard.appendChild(document.createElement("h3"));
MatchScoreEl.setAttribute('id', 'match-score');

let gameOver = false;

// let turnScoreTag = document.querySelector
// let errorsScoreTag = 
// let matchScoreTag = 

console.log(scoreboard);

// Functions
function buildDeck(decker) {
  const element = document.createElement("div");

  element.classList.add("card");
  element.setAttribute("data-card", decker);
  element.setAttribute("data-revealed", "false");

  element.addEventListener("click", () => {
    const revealed = element.getAttribute("data-revealed");
    
    if (awaitingEndOfMove || revealed === "true" || element === activeCard) {
      console.log(awaitingEndOfMove);
      return;
    }
    element.innerHTML = `<img src=${decker} />`;

    // document.createElement()

    if (!activeCard) {
      activeCard = element;
      scoreTurns ++;
      console.log("Score of Turns:", scoreTurns);
      turnScoreEl.innerHTML = "Turns: " + scoreTurns;

      return;
    }

    const cardToMatch = activeCard.getAttribute("data-card");

    if (cardToMatch === decker) {
      activeCard.setAttribute("data-revealed", "true");
      element.setAttribute("data-revealed", "true");
      scoreMatches ++;
      console.log("Score of Matches:", scoreMatches + "/15");
      MatchScoreEl.innerHTML = "Matches: " + scoreMatches + "/15";
      
      awaitingCard = false;
      activeCard = null;
      revealedCount += 2;

      if (revealedCount === cardCount) {
        alert("You win! Refresh to play again.");
      }

      return;
    } else {
        scoreErrors ++;
        console.log("Score of Errors:", scoreErrors + "/15");
        errorsScoreEl.innerHTML = "Errors: " + scoreErrors + "/15";
        if (scoreErrors >= 15) {
            gameOver = true;

            if (gameOver) {
                awaitingCard = false;
                activeCard = null;
            }
        }
    }
    
    // console.log(element);
    awaitingEndOfMove = true;

    setTimeout(() => {
      element.innerHTML = null;
      activeCard.innerHTML = null;

      awaitingEndOfMove = false;
      activeCard = null;
    }, 1000);
  });

  return element;
}

// Build up cards
// The for loop continues to execute until the condition, 'i < cardCount' becomes false.
// In each iteration, a random card is selected, and its corresponding card element is added to the cardsContainer element.
for (let i = 0; i < cardCount; i++) {
  const randomIndex = Math.floor(Math.random() * deckList.length); // Generates a random number between 0 to the length of what deckList is equal to. This random number will be used to pick a random card from deckList.
  const decker = deckList[randomIndex]; // Selects the card from the randomly chosen randomIndex from the deckList array and assigns it to the constant variable decker.
  const card = buildDeck(decker); // The buildDeck function is being called with the constant variable 'decker' being passed as an argument to invoke the creation of a card's element, based on the card image, and returns it.
  
  deckList.splice(randomIndex, 1); // Removes the card that was just selected from the deckList array to ensure it'll not be selected again.
  cardsContainer.appendChild(card); // Appends the card element to the cardsContainer element.
}

// let turnScoreEl = scoreboard.appendChild(document.createElement("h3"));
// turnScoreEl.setAttribute('id', 'turn-score');
// turnScoreEl.innerHTML = "Turns: " + scoreTurns;

// let errorsScoreEl = scoreboard.appendChild(document.createElement("h3"));
// errorsScoreEl.setAttribute('id', 'error-score');
// errorsScoreEl.innerHTML = "Errors: " + scoreErrors + "/15";

// let MatchScoreEl = scoreboard.appendChild(document.createElement("h3"));
// MatchScoreEl.setAttribute('id', 'match-score');
// MatchScoreEl.innerHTML = "Matches: " + scoreMatches + "/15";

// End