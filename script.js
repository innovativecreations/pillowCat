document.getElementById('throw-pillow').addEventListener('click', throwPillow);

function throwPillow() {
    const pillow = document.createElement('div');
    pillow.className = 'pillow';
    document.getElementById('game-area').appendChild(pillow);

    animatePillow(pillow);
}

function animatePillow(pillow) {
    let bottom = 50;
    const interval = setInterval(() => {
        bottom += 5;
        pillow.style.bottom = bottom + 'px';
        if (bottom >= 350) {
            clearInterval(interval);
            checkCollision(pillow);
        }
    }, 30);
}

function checkCollision(pillow) {
    const pillowRect = pillow.getBoundingClientRect();
    const cat1Rect = document.getElementById('cat1').getBoundingClientRect();
    const cat2Rect = document.getElementById('cat2').getBoundingClientRect();

    if (isColliding(pillowRect, cat1Rect) || isColliding(pillowRect, cat2Rect)) {
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
