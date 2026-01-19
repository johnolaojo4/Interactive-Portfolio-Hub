// 1. Game State
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = null;
let seconds = 0;


// 2. Card Data 
const cardIcons = ['HTML', 'CSS', 'JS', 'Git', 'GitHub', 'John', 'React', 'Vephla'];
const gameIcons = [...cardIcons, ...cardIcons]; 

// 3. Shuffle Function 
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 4. Start Game
function initGame() {
    const board = document.getElementById('gameBoard');
    const shuffledIcons = shuffle(gameIcons);
    board.innerHTML = "";
    
    shuffledIcons.forEach((icon, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.icon = icon;
        card.innerHTML = `
            <div class="card-face card-front">?</div>
            <div class="card-face card-back">${icon}</div>
        `;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
    
    // Reset Stats
    moves = 0;
    seconds = 0;
    document.getElementById('flips').innerText = moves;
    document.getElementById('highScore').innerText = localStorage.getItem('memoryHighScore') || 0;
}

// 5. Flip & Match Logic
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            moves++;
            document.getElementById('flips').innerText = moves;
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.icon === card2.dataset.icon) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === cardIcons.length) winGame();
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// 6. Persistence Requirement
function winGame() {
    const highScore = localStorage.getItem('memoryHighScore') || 999;
    if (moves < highScore) {
        localStorage.setItem('memoryHighScore', moves);
        alert(`New High Score! You won in ${moves} moves.`);
    } else {
        alert(`Game Over! Total moves: ${moves}`);
    }
}

initGame();

function changeDifficulty(level) {
    if (level === 'easy') {
        currentPairs = 4; 
    } else if (level === 'hard') {
        currentPairs = 8; 
    }
    resetGame(); 
}
function resetGame() {
    clearInterval(timer);
    seconds = 0;
    matchedPairs = 0;
    flippedCards = [];
    initGame();
}