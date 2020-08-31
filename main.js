import Pokemon from "./pokemon.js";
import {random, generateBattleLog} from "./utils.js";

const player1 = new Pokemon({
    name: 'Pikachu',
    hp: 500,
    type: 'electric',
    selectorName: 'character'
})

const player2 = new Pokemon({
    name: 'Charmander',
    hp: 500,
    type: 'fire',
    selectorName: 'enemy'
})

const $btnAttackCharacter = document.getElementById('btn-kick-character')
const $btnAttackEnemy = document.getElementById('btn-kick-enemy')

const MaxAttacks = 10
const btnCountJolt = countButtonClick(MaxAttacks, $btnAttackCharacter)
$btnAttackCharacter.addEventListener('click', () => {
    btnCountJolt()
    player2.changeHP(random(60, 20), function (count) {
        addLogRow(generateBattleLog(player1, player2, count))
    })

    // player2.changeHP(random(character.maxDamageHP))
})

const btnCountFlame = countButtonClick(MaxAttacks, $btnAttackEnemy)
$btnAttackEnemy.addEventListener('click', () => {
    btnCountFlame()
    player1.changeHP(random(60, 20), function (count) {
        addLogRow(generateBattleLog(player2, player1, count))
    })

    // character.changeHP(random(enemy.maxDamageHP))
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

//todo вызывать
function finishGame(name) {
    $btnAttackCharacter.disabled = true
    $btnAttackEnemy.disabled = true

    alert(name + ' проиграл')
}
