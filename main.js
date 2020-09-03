import Game from "./game.js";

const $logs = document.querySelector('#logs')

function addLogRow(input) {
    const $p = document.createElement('p')

    $p.innerHTML = input

    $logs.insertBefore($p, $logs.children[0])
}

const game = new Game

const $btnStartGame = document.getElementById('start-game-btn')
const $btnResetGame = document.getElementById('reset-game-btn')

$btnStartGame.addEventListener('click', () => game.startGame())
$btnResetGame.addEventListener('click', () => game.resetGame())




