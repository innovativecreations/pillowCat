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
    const cat1 = document.getElementById('cat1');
    const cat2 = document.getElementById('cat2');

    if (key === 'a' && !frozenCats['cat1']) {
        moveCat(cat1, -step);
        cat1.classList.add('flip-horizontal');
    }
    if (key === 'd' && !frozenCats['cat1']) {
        moveCat(cat1, step);
        cat1.classList.remove('flip-horizontal');
    }
    if (key === 'ArrowLeft' && !frozenCats['cat2']) {
        moveCat(cat2, -step);
        cat2.classList.remove('flip-horizontal');
    }
    if (key === 'ArrowRight' && !frozenCats['cat2']) {
        moveCat(cat2, step);
        cat2.classList.add('flip-horizontal');
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

            if (detectCollision(comet, document.getElementById('cat1'))) {
                frozenCats['cat1'] = true;
                comet.remove();
                document.getElementById('hit-text-cat1').style.display = 'block';
                clearInterval(fallInterval);
            }
            if (detectCollision(comet, document.getElementById('cat2'))) {
                frozenCats['cat2'] = true;
                comet.remove();
                document.getElementById('hit-text-cat2').style.display = 'block';
                clearInterval(fallInterval);
            }
        }
    }, 20);
}

function detectCollision(comet, cat) {
    const cometRect = comet.getBoundingClientRect();
    const catRect = cat.getBoundingClientRect();

    return !(
        cometRect.top > catRect.bottom ||
        cometRect.bottom < catRect.top ||
        cometRect.left > catRect.right ||
        cometRect.right < catRect.left
    );
}

setInterval(createFallingComet, 1000);
