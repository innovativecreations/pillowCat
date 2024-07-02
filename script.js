let isFrozen = false;

document.getElementById('throw-pillow').addEventListener('click', throwPillow);

function throwPillow() {
    if (isFrozen) return;

    const pillow = document.createElement('div');
    pillow.className = 'pillow';
    document.getElementById('game-area').appendChild(pillow);

    animatePillow(pillow);
}

function animatePillow(pillow) {
    const startX = 75;
    const startY = 80;
    const endX = 675;
    const endY = 80;
    const duration = 2000;
    const gravity = 0.0005;

    const velocityX = (endX - startX) / duration;
    const initialVelocityY = ((endY - startY) + (0.5 * gravity * duration * duration)) / duration;

    const startTime = Date.now();

    function updatePillow() {
        if (isFrozen) return;

        const currentTime = Date.now();
        const timeElapsed = currentTime - startTime;

        const x = startX + velocityX * timeElapsed;
        const y = startY + initialVelocityY * timeElapsed - 0.5 * gravity * timeElapsed * timeElapsed;

        pillow.style.left = x + 'px';
        pillow.style.bottom = y + 'px';

        checkCollision(pillow);

        if (x >= 800 - pillow.offsetWidth || y <= 0 || y >= 500 - pillow.offsetHeight) {
            pillow.remove();
            return;
        }

        requestAnimationFrame(updatePillow);
    }

    updatePillow();
}

function moveCat2() {
    const cat2 = document.getElementById('cat2');
    const startPos = 400;
    const endPos = 750;
    const speed = 2;
    let direction = 1;

    function updateCat2() {
        if (isFrozen) return;

        const currentLeft = parseInt(cat2.style.left, 10) || startPos;
        const newLeft = currentLeft + direction * speed;

        if (newLeft >= endPos || newLeft <= startPos) {
            direction *= -1;
        }

        if (direction === 1) {
            cat2.style.transform = 'scaleX(-1)';
        } else {
            cat2.style.transform = 'scaleX(1)';
        }

        cat2.style.left = newLeft + 'px';
        requestAnimationFrame(updateCat2);
    }

    updateCat2();
}

moveCat2();

function checkCollision(pillow) {
    const pillowRect = pillow.getBoundingClientRect();
    const cat2Rect = document.getElementById('cat2').getBoundingClientRect();

    if (isColliding(pillowRect, cat2Rect)) {
        console.log('Pillow hit the cat!');
        playMeowSound();
        flipCatVertically();
        pillow.remove();
        freezeMotion();
    }
}

function isColliding(rect1, rect2) {
    return (
        rect1.left < rect2.left + rect2.width &&
        rect1.left + rect1.width > rect2.left &&
        rect1.top < rect2.top + rect2.height &&
        rect1.top + rect1.height > rect2.top
    );
}

function playMeowSound() {
    const meowSound = document.getElementById('meow-sound');
    meowSound.play();
}

function flipCatVertically() {
    const cat2 = document.getElementById('cat2');
    cat2.style.transform += ' scaleY(-1)';

    setTimeout(() => {
        cat2.style.transform = cat2.style.transform.replace(' scaleY(-1)', '');
    }, 2000);
}

function freezeMotion() {
    isFrozen = true;

    setTimeout(() => {
        isFrozen = false;
        requestAnimationFrame(moveCat2);
        const pillows = document.getElementsByClassName('pillow');
        for (let i = 0; i < pillows.length; i++) {
            requestAnimationFrame(() => animatePillow(pillows[i]));
        }
    }, 2000);
}
