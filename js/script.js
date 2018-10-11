//
// Blackjack Game
// by Joan Perez Lozano
//

// Card Variables
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'],
    values = ['Ace', 'King', 'Queen', 'Jack', 
            'Ten', 'Nine', 'Eight', 'Seven', 'Six',
            'Five', 'Four', 'Three', 'Two'];

// DOM Variables
let textArea = document.getElementById('text-area'),
    newGameButton = document.getElementById('new-game-button'),
    hitButton = document.getElementById('hit-button'),
    stayButton = document.getElementById('stay-button');

// Game Variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];

hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();

hitButton.addEventListener('click', function(){
    playerCards.push(getNextCard());
    checkForEndOfGame();
    showStatus();
});

stayButton.addEventListener('click', function(){
    gameOver = true;
    checkForEndOfGame();
    showStatus();
});

newGameButton.addEventListener('click', function() {
    gameStarted = true;
    gameOver = false;
    playerWon = false;

    deck = createDeck();
    shuffleDeck(deck);

    dealerCards = [ getNextCard(), getNextCard() ];
    playerCards = [ getNextCard(), getNextCard() ];

    newGameButton.style.display = 'none';
    hitButton.style.display = 'inline';
    stayButton.style.display = 'inline';
    showStatus();
});

function checkForEndOfGame(){
    updateScores();
    if(gameOver) {
        while(dealerScore < playerScore && dealerScore <= 21 && playerScore <= 21){
            dealerCards.push(getNextCard());
            updateScores();
        }
    }

    if (playerScore > 21) {
        playerWon = false;
        gameOver = true;
    } else if (dealerScore > 21){
        playerWon = true;
        gameOver = true;
    } else if (gameOver) {
        if (playerScore > dealerScore){
            playerWon = true;
        } else {
            playerWon = false;
        }
    }
}

function createDeck() {
    let deck = [];
    for(let i = 0; i < suits.length; i++) {
        for(let j = 0; j < values.length; j++) {
            let card = {
                suit: suits[i],
                value: values[j]   
            };
            deck.push(card);
        }
    } 
    return deck;
}

function shuffleDeck(deck) {
    for(let i = 0; i < deck.length; i++) {
        let rIndex = Math.trunc(Math.random() * deck.length);
        let temp = deck[rIndex];
        deck[rIndex] = deck[i];
        deck[i] = temp;
    }
}

function getCardString(card) {
    return card.value + ' of ' + card.suit;
}

function getNextCard() {
    return deck.shift();
}

function showStatus() {
    if(!gameStarted){
        textArea.innerText = 'Welcome to Blackjack!!';
        return;
    }
    // for(var i = 0; i < deck.length; i++) {
    //     console.log(deck[i]);
    // }
    let dealerCardString = '';
    for(let i = 0; i < dealerCards.length; i++){
        dealerCardString += getCardString(dealerCards[i]) + '\n';
    }
    
    let playerCardString = '';
    for(let i = 0; i < playerCards.length; i++){
        playerCardString += getCardString(playerCards[i]) + '\n';
    }

    updateScores();

    textArea.innerText = 
                        'Dealer Has: \n' + 
                        dealerCardString + 
                        'Score: ' + dealerScore + '\n\n'+          
                        
                        'Player Has: \n' +
                        playerCardString +
                        'Score: ' + playerScore + '\n\n'; 
    if(gameOver) {
        if(playerWon){
            textArea.innerText += 'You Win!';
        } else {
            textArea.innerText += 'Dealer Wins!';
        }
        newGameButton.style.display = 'inline';
        hitButton.style.display = 'none';
        stayButton.style.display = 'none';
    }
}

function updateScores(){
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}

function getScore(cardsPicked){
    let score = 0;
    let hasAce = false;
    console.log('Sumando Valores');
    for(let i = 0; i < cardsPicked.length; i++) {
        let card = cardsPicked[i];
        score += getCardNumericValue(card);
        console.log(score);
        if(card.value === 'Ace') {
            hasAce = true;
        }
    }    
    if(hasAce && score + 10 <= 21) {
        return score + 10;
    }
    return score;
}

function getCardNumericValue(card) {
    switch(card.value){
        case 'Ace':
            return 1;
        case 'Two': 
            return 2;
        case 'Three': 
            return 3;
        case 'Four': 
            return 4;
        case 'Five': 
            return 5;
        case 'Six': 
            return 6;
        case 'Seven': 
            return 7;
        case 'Eight': 
            return 8;
        case 'Nine': 
            return 9;
        default: 
            return 10;
    }
}