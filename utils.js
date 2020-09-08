export const random = (max, min = 0) => {
    const num = max - min
    return Math.ceil(Math.random() * num) + min
}

export function generateBattleLog(firstPerson, secondPerson, damage) {
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

export function countButtonClick(count = 6, el) {
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