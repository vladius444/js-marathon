import Pokemon from "./pokemon.js";
import {random, generateBattleLog, finishGame, $btnAttackEnemy, $btnAttackCharacter} from "./utils.js";

const player1 = new Pokemon({
    name: 'Pikachu',
    hp: 500,
    type: 'electric',
    selectorName: 'character',
    damage: {
        max: 80,
        min: 40
    }
})

const player2 = new Pokemon({
    name: 'Charmander',
    hp: 500,
    type: 'fire',
    selectorName: 'enemy',
    damage: {
        max: 82,
        min: 35
    }
})

const MaxAttacks = 10
const btnCountJolt = countButtonClick(MaxAttacks, $btnAttackCharacter)
$btnAttackCharacter.addEventListener('click', () => {
    btnCountJolt()

    const defender = player2

    defender.changeHP(random(player1.damage.max, player1.damage.min), function (count) {
        addLogRow(generateBattleLog(player1, player2, count))
    })

    finishGame(defender)
})

const btnCountFlame = countButtonClick(MaxAttacks, $btnAttackEnemy)
$btnAttackEnemy.addEventListener('click', () => {
    btnCountFlame()

    const defender = player1

    defender.changeHP(random(player2.damage.max, player2.damage.min), function (count) {
        addLogRow(generateBattleLog(player2, player1, count))
    })

    finishGame(defender)
})

const $logs = document.querySelector('#logs')

function addLogRow(input) {
    const $p = document.createElement('p')

    $p.innerHTML = input

    $logs.insertBefore($p, $logs.children[0])
}

function countButtonClick(count = 6, el) {
    const innerText = el.innerText
    el.innerText = `${innerText} (${count})`

    return function () {
        count--
        if (count === 0) {
            el.disabled = true
        }

        el.innerText = `${innerText} (${count})`

        return count
    }
}
