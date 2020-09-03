import Game from "./game.js";

const $logs = document.querySelector('#logs')

function addLogRow(input) {
    const $p = document.createElement('p')

    $p.innerHTML = input

    $logs.insertBefore($p, $logs.children[0])
}

const game = new Game
game.startGame()





