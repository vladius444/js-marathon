const $btnAttackCharacter = document.getElementById('btn-kick-character')
const $btnAttackEnemy = document.getElementById('btn-kick-enemy')

const MaxAttacks = 10
const btnCountJolt = countButtonClick(MaxAttacks, $btnAttackCharacter)
$btnAttackCharacter.addEventListener('click', () => {
    btnCountJolt()
    enemy.changeHP(random(character.maxDamageHP))
})

const btnCountFlame = countButtonClick(MaxAttacks, $btnAttackEnemy)
$btnAttackEnemy.addEventListener('click', () => {
    btnCountFlame()
    character.changeHP(random(enemy.maxDamageHP))
})

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
    const {hp: {current, total}} = this

    this.elHP.innerText = current + '/' + total
    this.elProgressbar.style.width = (current / total) * 100 + '%'
}

function changeHP(count) {
    this.hp.current -= count

    const newBattleLog = this === enemy ? generateBattleLog(this, character, count) : generateBattleLog(this, enemy, count)
    addLogRow(newBattleLog)

    if (this.hp.current < 0) {
        this.hp.current = 0
        finishGame(this.name)
    }

    renderHP.call(this)
}

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

const random = (max, min = 0) => {
    const num = max - min
    return Math.ceil(Math.random() * num) + min
}

function initGame() {
    console.log("START GAME")

    renderHP.call(character)
    renderHP.call(enemy)
}

function finishGame(name) {
    $btnAttackCharacter.disabled = true
    $btnAttackEnemy.disabled = true

    alert(name + ' проиграл')
}

initGame()

function generateBattleLog(firstPerson, secondPerson, damage) {
    const damageStat = `-${damage}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`
    const firstName = `<b style="color: #00a3e2">${firstPerson.name}</b>`
    const secondName = `<b style="color: #d20000">${secondPerson.name}</b>`

    const logs = [
        `${firstName} вспомнил что-то важное, но неожиданно ${secondName}, не помня себя от испуга, ударил в предплечье врага. ${damageStat}`,
        `${firstName} поперхнулся, и за это ${secondName} с испугу приложил прямой удар коленом в лоб врага. ${damageStat}`,
        `${firstName} забылся, но в это время наглый ${secondName}, приняв волевое решение, неслышно подойдя сзади, ударил. ${damageStat}`,
        `${firstName} пришел в себя, но неожиданно ${secondName} случайно нанес мощнейший удар. ${damageStat}`,
        `${firstName} поперхнулся, но в это время ${secondName} нехотя раздробил кулаком \<вырезанно цензурой\> противника. ${damageStat}`,
        `${firstName} удивился, а ${secondName} пошатнувшись влепил подлый удар. ${damageStat}`,
        `${firstName} высморкался, но неожиданно ${secondName} провел дробящий удар. ${damageStat}`,
        `${firstName} пошатнулся, и внезапно наглый ${secondName} беспричинно ударил в ногу противника. ${damageStat}`,
        `${firstName} расстроился, как вдруг, неожиданно ${secondName} случайно влепил стопой в живот соперника. ${damageStat}`,
        `${firstName} пытался что-то сказать, но вдруг, неожиданно ${secondName} со скуки, разбил бровь сопернику. ${damageStat}`
    ];

    return logs[random(logs.length) - 1]
}