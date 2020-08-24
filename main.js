const $btnAttackCharacter = document.getElementById('btn-kick-character')
const $btnAttackEnemy = document.getElementById('btn-kick-enemy')

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    maxDamageHP: 25,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character')
}

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    maxDamageHP: 23,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy')
}

$btnAttackCharacter.addEventListener('click', () => {
    console.log('Kick character')
    changeHP(random(character.maxDamageHP), enemy)
})

$btnAttackEnemy.addEventListener('click', () => {
    console.log('Kick enemy')

    changeHP(random(enemy.maxDamageHP), character)
})

function random(max) {
    return Math.ceil(Math.random() * max)
}

function initGame() {
    console.log("START GAME")

    renderHP(character)
    renderHP(enemy)

}

function renderHP(person) {
    renderHPLife(person)
    renderProgressbar(person)
}

function renderHPLife(person) {
    person.elHP.innerText = person.damageHP + '/' + person.defaultHP
}

function renderProgressbar(person) {
    person.elProgressbar.style.width = person.damageHP + '%'
}

function finishGame(loser) {
    alert('person: ' + loser.name + ' проиграл')
    //todo бывает ничья когда в один ход оба меньше нуля
    $btnAttackEnemy.disabled = true
    $btnAttackCharacter.disabled = true
}

function changeHP(count, person) {
    if (person.damageHP < count) {
        person.damageHP = 0
        finishGame(person)
    } else {
        person.damageHP -= count
    }

    renderHP(person)
}

initGame()