import Pokemon from "./pokemon.js";
import {random, generateBattleLog, finishGame, countButtonClick} from "./utils.js";
import {pokemons} from "./pokemons.js";

const $logs = document.querySelector('#logs')

function addLogRow(input) {
    const $p = document.createElement('p')

    $p.innerHTML = input

    $logs.insertBefore($p, $logs.children[0])
}

const pikachu = pokemons.find(item => item.name === 'Pikachu')
const player1 = new Pokemon({
    ...pikachu,
    selectorName: 'player1',
})

const $controlPlayer1 = document.querySelector('.control.player1')
const $controlPlayer2 = document.querySelector('.control.player2')

const charmander = pokemons.find(item => item.name === 'Charmander')
const player2 = new Pokemon({
    ...charmander,
    selectorName: 'player2',
})

player1.attacks.forEach(item => {
        const $btn = document.createElement('button')
        $btn.classList.add('button')
        $btn.innerText = item.name

        const btnCount = countButtonClick(item.maxCount, $btn)

        $btn.addEventListener('click', () => {
            console.log(`click button ${$btn.innerText}`)
            btnCount()

            const defender = player2
            defender.changeHP(random(item.maxDamage, item.minDamage), function (count) {
                addLogRow(generateBattleLog(player1, player2, count))
            })

            finishGame(defender)
        })

        $controlPlayer1.appendChild($btn)
    }
)

player2.attacks.forEach(item => {
        const $btn = document.createElement('button')
        $btn.classList.add('button')
        $btn.innerText = item.name

        const btnCount = countButtonClick(item.maxCount, $btn)

        $btn.addEventListener('click', () => {
            console.log(`click button ${$btn.innerText}`)
            btnCount()

            const defender = player1
            defender.changeHP(random(item.maxDamage, item.minDamage), function (count) {
                addLogRow(generateBattleLog(player1, player2, count))
            })

            finishGame(defender)
        })

        $controlPlayer2.appendChild($btn)
    }
)


