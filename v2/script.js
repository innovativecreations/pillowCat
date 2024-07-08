document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

const step = 5;
const keysPressed = {
    'a': false,
    'd': false,
    'ArrowLeft': false,
    'ArrowRight': false
};
const frozenCats = {
    'cat1': false,
    'cat2': false
};

const collisionAudio = new Audio('src/audio/collision.mp3');
let stopwatchInterval, timerInterval;
let stopwatchStartTime, timerStartTime;

function handleKeyDown(event) {
    if (keysPressed.hasOwnProperty(event.key) && !keysPressed[event.key]) {
        keysPressed[event.key] = true;
        moveCats(event.key);
    }
}

function handleKeyUp(event) {
    if (keysPressed.hasOwnProperty(event.key)) {
        keysPressed[event.key] = false;
    }
}

function moveCats(key) {
    const cat1 = document.getElementById('cat1-container');
    const cat2 = document.getElementById('cat2-container');

    if (key === 'a' && !frozenCats['cat1']) {
        moveCat(cat1, -step);
        cat1.querySelector('.cat').classList.add('flip-horizontal');
    }
    if (key === 'd' && !frozenCats['cat1']) {
        moveCat(cat1, step);
        cat1.querySelector('.cat').classList.remove('flip-horizontal');
    }
    if (key === 'ArrowLeft' && !frozenCats['cat2']) {
        moveCat(cat2, -step);
        cat2.querySelector('.cat').classList.remove('flip-horizontal');
    }
    if (key === 'ArrowRight' && !frozenCats['cat2']) {
        moveCat(cat2, step);
        cat2.querySelector('.cat').classList.add('flip-horizontal');
    }
}

function moveCat(cat, step) {
    const currentLeft = parseInt(window.getComputedStyle(cat).left, 10) || 0;
    const newLeft = currentLeft + step;
    const maxWidth = document.getElementById('game-area').offsetWidth - cat.offsetWidth;

    if (newLeft >= 0 && newLeft <= maxWidth) {
        cat.style.left = newLeft + 'px';
    }
}

function createFallingComet() {
    const gameArea = document.getElementById('game-area');
    const comet = document.createElement('img');
    comet.className = 'falling-comet';
    comet.src = 'src/img/comet.png';
    comet.alt = 'Falling comet';

    comet.style.left = Math.random() * (gameArea.offsetWidth - 30) + 'px';
    comet.style.top = '0px';

    gameArea.appendChild(comet);

    const fallInterval = setInterval(() => {
        const currentTop = parseInt(window.getComputedStyle(comet).top, 10);
        if (currentTop > gameArea.offsetHeight) {
            clearInterval(fallInterval);
            gameArea.removeChild(comet);
        } else {
            comet.style.top = currentTop + 2 + 'px';

            if (!frozenCats['cat1'] && detectCollision(comet, document.getElementById('cat1-container'))) {
                frozenCats['cat1'] = true;
                comet.remove();
                document.getElementById('cat1').classList.add('blackout');
                collisionAudio.play();
                clearInterval(stopwatchInterval);
                clearInterval(fallInterval);
            }
            if (!frozenCats['cat2'] && detectCollision(comet, document.getElementById('cat2-container'))) {
                frozenCats['cat2'] = true;
                comet.remove();
                document.getElementById('cat2').classList.add('blackout');
                collisionAudio.play();
                clearInterval(timerInterval);
                clearInterval(fallInterval);
            }
        }
    }, 20);
}

function detectCollision(comet, cat) {
    const cometRect = comet.getBoundingClientRect();
    const catRect = cat.getBoundingClientRect();
    const bodyRect = {
        top: catRect.top + catRect.height * 0.2,
        bottom: catRect.bottom - catRect.height * 0.2,
        left: catRect.left + catRect.width * 0.2,
        right: catRect.right - catRect.width * 0.2,
    };

    return !(
        cometRect.top > bodyRect.bottom ||
        cometRect.bottom < bodyRect.top ||
        cometRect.left > bodyRect.right ||
        cometRect.right < bodyRect.left
    );
}

function startStopwatch() {
    stopwatchStartTime = Date.now();
    stopwatchInterval = setInterval(() => {
        const elapsedTime = Date.now() - stopwatchStartTime;
        const minutes = Math.floor(elapsedTime / 60000);
        const seconds = Math.floor((elapsedTime % 60000) / 1000);
        const milliseconds = elapsedTime % 1000;
        document.getElementById('stopwatch').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
    }, 10);
}

function startTimer() {
    timerStartTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsedTime = Date.now() - timerStartTime;
        const minutes = Math.floor(elapsedTime / 60000);
        const seconds = Math.floor((elapsedTime % 60000) / 1000);
        const milliseconds = elapsedTime % 1000;
        document.getElementById('timer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
    }, 10);
}

document.getElementById('start-game').addEventListener('click', () => {
    const player1Name = document.getElementById('player1').value || 'Player 1';
    const player2Name = document.getElementById('player2').value || 'Player 2';
    
    document.getElementById('player1-name').textContent = player1Name;
    document.getElementById('player2-name').textContent = player2Name;
    
    document.getElementById('player-form').style.display = 'none';
    
    startStopwatch();
    startTimer();
});

setInterval(createFallingComet, 1000);
