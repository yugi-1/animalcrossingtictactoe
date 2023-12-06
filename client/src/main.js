//title screen
let gameScreen = document.getElementById('gameContent');
let title = document.getElementById('containerTitle');
title.onclick = function startGame() {
    title.setAttribute('class', 'title');
    gameScreen.style.display = 'block';
}