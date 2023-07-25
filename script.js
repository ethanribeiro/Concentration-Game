const cardsContainer = document.querySelector(".cards");
const images = {
  Ace: "/imgs/ace.png",
  2: "/imgs/two.png",
  3: "/imgs/three.png",
  4: "/imgs/four.png",
  5: "/imgs/five.png",
  6: "/imgs/six.png",
  7: "/imgs/seven.png",
  8: "/imgs/eight.png",
  9: "/imgs/nine.png",
  10: "/imgs/10.png",
  Joker: "/imgs/joker.png",
  Queen: "/imgs/queen.png",
  King: "/imgs/king.png",
  Heart: "/imgs/heart.png",
  Diamond: "/imgs/diamond.png"
};
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
];
const deckList = [...deckers, ...deckers];
const cardCount = deckList.length;

// Game states
let revealedCount = 0;
let activeCard = null;
let awaitingEndOfMove = false;

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

    if (!activeCard) {
      activeCard = element;

      return;
    }

    const cardToMatch = activeCard.getAttribute("data-card");

    if (cardToMatch === decker) {
      activeCard.setAttribute("data-revealed", "true");
      element.setAttribute("data-revealed", "true");
      
      awaitingCard = false;
      activeCard = null;
      revealedCount += 2;

      if (revealedCount === cardCount) {
        alert("You win! Refresh to play again.");
      }

      return;
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
for (let i = 0; i < cardCount; i++) {
  const randomIndex = Math.floor(Math.random() * deckList.length);
  const decker = deckList[randomIndex];
  const card = buildDeck(decker);
  
  deckList.splice(randomIndex, 1);
  cardsContainer.appendChild(card);
}