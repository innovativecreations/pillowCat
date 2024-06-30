document.getElementById('throw-pillow').addEventListener('click', throwPillow);

function throwPillow() {
    const pillow = document.createElement('div');
    pillow.className = 'pillow';
    document.getElementById('game-area').appendChild(pillow);

    animatePillow(pillow);
}

function animatePillow(pillow) {
    const startX = 75;
    const startY = 80;
    const endX = 525;
    const duration = 2000;
    const gravity = 0.001;
    const velocityX = (endX - startX) / duration;
    const velocityY = -0.4; 

    const startTime = Date.now();

    function updatePillow() {
        const currentTime = Date.now();
        const timeElapsed = currentTime - startTime;

        if (timeElapsed < duration) {
            const progress = timeElapsed / duration;
            const x = startX + velocityX * timeElapsed;
            const y = startY + velocityY * timeElapsed + 0.5 * gravity * timeElapsed * timeElapsed;

            pillow.style.left = x + 'px';
            pillow.style.bottom = y + 'px';

            requestAnimationFrame(updatePillow);
        } else {
            pillow.style.left = endX + 'px';
            pillow.style.bottom = '80px';
            checkCollision(pillow);
        }
    }

    updatePillow();
}

function checkCollision(pillow) {
    const pillowRect = pillow.getBoundingClientRect();
    const cat2Rect = document.getElementById('cat2').getBoundingClientRect();

    if (isColliding(pillowRect, cat2Rect)) {
        pillow.style.backgroundColor = 'red';
    } else {
        pillow.style.backgroundColor = 'blue';
    }
}

function isColliding(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}