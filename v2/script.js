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

const collisionAudio = new Audio('src/collision.mp3');
let stopwatchInterval;
let seconds = 0;

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

            if (detectCollision(comet, document.getElementById('cat1-container'))) {
                frozenCats['cat1'] = true;
                comet.remove();
                document.getElementById('cat1').classList.add('blackout');
                collisionAudio.play();
                clearInterval(fallInterval);
            }
            if (detectCollision(comet, document.getElementById('cat2-container'))) {
                frozenCats['cat2'] = true;
                comet.remove();
                document.getElementById('cat2').classList.add('blackout');
                collisionAudio.play();
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
    stopwatchInterval = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const displaySeconds = seconds % 60;
        document.getElementById('stopwatch').textContent = `${minutes.toString().padStart(2, '0')}:${displaySeconds.toString().padStart(2, '0')}`;
    }, 1000);
}

setInterval(createFallingComet, 1000);
startStopwatch();
