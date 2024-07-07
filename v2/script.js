document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

const keysPressed = {};
const step = 0.5;
const moveInterval = 50;

function handleKeyDown(event) {
    keysPressed[event.key] = true;
    moveCats();
}

function handleKeyUp(event) {
    keysPressed[event.key] = false;
}

function moveCats() {
    const cat1 = document.getElementById('cat1');
    const cat2 = document.getElementById('cat2');

    let cat1Moved = false;
    let cat2Moved = false;

    if (keysPressed['a']) {
        moveCat(cat1, -step);
        cat1.classList.add('flip-horizontal');
        cat1Moved = true;
    }
    if (keysPressed['d']) {
        moveCat(cat1, step);
        cat1.classList.remove('flip-horizontal');
        cat1Moved = true;
    }
    if (keysPressed['ArrowLeft']) {
        moveCat(cat2, -step);
        cat2.classList.remove('flip-horizontal');
        cat2Moved = true;
    }
    if (keysPressed['ArrowRight']) {
        moveCat(cat2, step);
        cat2.classList.add('flip-horizontal');
        cat2Moved = true;
    }

    if (cat1Moved || cat2Moved) {
        setTimeout(moveCats, moveInterval);
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