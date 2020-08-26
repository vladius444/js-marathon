const $btnAttackCharacter = document.getElementById('btn-kick-character')
const $btnAttackEnemy = document.getElementById('btn-kick-enemy')

const character = {
    name: 'Pikachu',
    maxDamageHP: 25,
    hp: {
        current: 200,
        total: 200,
    },
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    changeHP,
}

const enemy = {
    name: 'Charmander',
    hp: {
        current: 100,
        total: 100,
    },
    maxDamageHP: 23,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    changeHP,
}

function renderHP() {
    this.elHP.innerText = this.hp.current + '/' + this.hp.total
    this.elProgressbar.style.width = (this.hp.current / this.hp.total) * 100  + '%'
}

function changeHP(count) {
    this.hp.current -= count

    const battleLog = this === enemy ? generateBattleLog(this, character, count) : generateBattleLog(this, enemy, count)
    console.log(battleLog)

    if (this.hp.current < 0) {
        this.hp.current = 0
        finishGame(this.name)
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

function generateBattleLog(firstPerson, secondPerson, damage) {
    const damageStat = `-${damage}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`

    const logs = [
        `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага. ${damageStat}`,
        `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага. ${damageStat}`,
        `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил. ${damageStat}`,
        `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар. ${damageStat}`,
        `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника. ${damageStat}`,
        `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар. ${damageStat}`,
        `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар. ${damageStat}`,
        `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника. ${damageStat}`,
        `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника. ${damageStat}`,
        `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику. ${damageStat}`
    ];

    return logs[random(logs.length) - 1]
}