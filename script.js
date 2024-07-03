let isFrozen = false;
let score = 0;
let catDirection = -1;
let initialCatSpeed = 2;
let catSpeed = initialCatSpeed;
const freezeTime = 2000; 
const speedIncreaseInterval = 3000;
const speedIncreaseAmount = 0.09;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('cat1').addEventListener('click', throwPillow);
    document.getElementById('restart-game').addEventListener('click', restartGame);

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
        const endX = 570;
        const endY = 50;
        const duration = 2000;
        const gravity = 0.0005;

        const velocityX = (endX - startX) / duration;
        const initialVelocityY = ((endY - startY) + (0.5 * gravity * duration * duration)) / duration;

        const startTime = Date.now();

        function updatePillow() {
            if (isFrozen) {
                requestAnimationFrame(updatePillow);
                return;
            }

            const currentTime = Date.now();
            const timeElapsed = currentTime - startTime;

            const x = startX + velocityX * timeElapsed;
            const y = startY + initialVelocityY * timeElapsed - 0.5 * gravity * timeElapsed * timeElapsed;

            pillow.style.left = x + 'px';
            pillow.style.bottom = y + 'px';

            if (checkCollision(pillow)) {
                return;
            }

            if (x >= 800 - pillow.offsetWidth || y <= 0 || y >= 500 - pillow.offsetHeight) {
                pillow.remove();
                endGame();
                return;
            }

            requestAnimationFrame(updatePillow);
        }

        updatePillow();
    }

    function moveCat2() {
        const cat2 = document.getElementById('cat2');
        cat2.style.left = '750px';
        const startPos = 750;
        const endPos = 400;

        function updateCat2() {
            if (isFrozen) {
                requestAnimationFrame(updateCat2);
                return;
            }

            const currentLeft = parseFloat(cat2.style.left) || startPos;
            const newLeft = currentLeft + catDirection * catSpeed;

            if (newLeft <= endPos || newLeft >= startPos) {
                catDirection *= -1;
                cat2.style.transform = catDirection === 1 ? 'scaleX(-1)' : 'scaleX(1)';
            }

            cat2.style.left = newLeft + 'px';
            requestAnimationFrame(updateCat2);
        }

        updateCat2();
    }

    function increaseCatSpeed() {
        catSpeed += speedIncreaseAmount;
    }

    setInterval(increaseCatSpeed, speedIncreaseInterval);

    moveCat2();

    function checkCollision(pillow) {
        const pillowRect = pillow.getBoundingClientRect();
        const cat2Rect = document.getElementById('cat2').getBoundingClientRect();

        const cat2MiddleStart = cat2Rect.top + cat2Rect.height * 0.15;
        const cat2MiddleEnd = cat2Rect.bottom - cat2Rect.height * 0.15;

        if (
            pillowRect.left < cat2Rect.left + cat2Rect.width &&
            pillowRect.left + pillowRect.width > cat2Rect.left &&
            pillowRect.top < cat2MiddleEnd &&
            pillowRect.bottom > cat2MiddleStart
        ) {
            playMeowSound();
            flipCatVertically();
            pillow.remove();
            increaseScore();
            freezeMotion();
            return true;
        }
        return false;
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
        }, freezeTime);
    }

    function freezeMotion() {
        isFrozen = true;

        setTimeout(() => {
            isFrozen = false;
        }, freezeTime);
    }

    function increaseScore() {
        score++;
        document.getElementById('score').innerText = score;
    }

    function endGame() {
        document.getElementById('final-score').innerText = score;
        document.getElementById('game-over-card').style.display = 'block';
        isFrozen = true;
    }

    function restartGame() {
        score = 0;
        catSpeed = initialCatSpeed;
        document.getElementById('score').innerText = score;
        document.getElementById('game-over-card').style.display = 'none';
        isFrozen = false;

        const pillows = document.getElementsByClassName('pillow');
        while (pillows.length > 0) {
            pillows[0].parentNode.removeChild(pillows[0]);
        }

        moveCat2();
    }
});
