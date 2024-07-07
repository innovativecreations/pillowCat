document.addEventListener('keydown', function(event) {
    const cat1 = document.getElementById('cat1');
    const cat2 = document.getElementById('cat2');
    const step = 10;

    switch(event.key) {
        case 'a':
            moveCat(cat1, -step);
            break;
        case 'd':
            moveCat(cat1, step);
            break;
        case 'ArrowLeft':
            moveCat(cat2, -step);
            break;
        case 'ArrowRight':
            moveCat(cat2, step);
            break;
    }
});

function moveCat(cat, step) {
    const currentLeft = parseInt(window.getComputedStyle(cat).left, 10) || 0;
    const newLeft = currentLeft + step;
    const maxWidth = document.getElementById('game-area').offsetWidth - cat.offsetWidth;
    

    cat.style.left = newLeft + 'px';

}
