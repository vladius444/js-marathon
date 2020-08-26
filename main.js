const $btnAttackCharacter = document.getElementById('btn-kick-character')
const $btnAttackEnemy = document.getElementById('btn-kick-enemy')

const character = {
    name: 'Pikachu',
    defaultHP: 200,
    damageHP: 200,
    maxDamageHP: 25,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    changeHP,
}

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    maxDamageHP: 23,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    changeHP,
}

function renderHP() {
    this.elHP.innerText = this.damageHP + '/' + this.defaultHP
    this.elProgressbar.style.width = (this.damageHP / this.defaultHP) * 100  + '%'
}

function changeHP(count) {
    if (this.damageHP < count) {
        this.damageHP = 0
        finishGame(this.name)
    } else {
        this.damageHP -= count
    }

    renderHP.call(this)
}

$btnAttackCharacter.addEventListener('click', () => {
    console.log('Kick character')

    enemy.changeHP(random(character.maxDamageHP))
})

$btnAttackEnemy.addEventListener('click', () => {
    console.log('Kick enemy')

    character.changeHP(random(enemy.maxDamageHP))
})

function random(max) {
    return Math.ceil(Math.random() * max)
}

function initGame() {
    console.log("START GAME")

    renderHP.call(character)
    renderHP.call(enemy)
}

function finishGame(name) {
    alert(name + ' проиграл')

    $btnAttackEnemy.disabled = true
    $btnAttackCharacter.disabled = true
}

initGame()