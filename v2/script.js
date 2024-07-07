document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

const keysPressed = {};
const step = 2;
let animationFrameId;

function handleKeyDown(event) {
    keysPressed[event.key] = true;
    if (!animationFrameId) {
        moveCats();
    }
}

function handleKeyUp(event) {
    keysPressed[event.key] = false;
    if (!Object.values(keysPressed).includes(true)) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
}

function moveCats() {
    const cat1 = document.getElementById('cat1');
    const cat2 = document.getElementById('cat2');

    if (keysPressed['a']) {
        moveCat(cat1, -step);
        cat1.classList.add('flip-horizontal');
    }
    if (keysPressed['d']) {
        moveCat(cat1, step);
        cat1.classList.remove('flip-horizontal');
    }
    if (keysPressed['ArrowLeft']) {
        moveCat(cat2, -step);
        cat2.classList.remove('flip-horizontal');
    }
    if (keysPressed['ArrowRight']) {
        moveCat(cat2, step);
        cat2.classList.add('flip-horizontal');
    }

    animationFrameId = requestAnimationFrame(moveCats);
}

function moveCat(cat, step) {
    const currentLeft = parseInt(window.getComputedStyle(cat).left, 10) || 0;
    const newLeft = currentLeft + step;
    const maxWidth = document.getElementById('game-area').offsetWidth - cat.offsetWidth;

    if (newLeft >= 0 && newLeft <= maxWidth) {
        cat.style.left = newLeft + 'px';
    }
}
