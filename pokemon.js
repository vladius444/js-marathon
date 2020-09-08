class Selectors {
    constructor(selectorName) {
        this.elHP = document.getElementById(`health-${selectorName}`)
        this.elProgressbar = document.getElementById(`progressbar-${selectorName}`)
        this.elControl = document.querySelector(`.control.${selectorName}`)
    }
}

class Pokemon extends Selectors {
    constructor({id, name, hp, type, selectorName, attacks = []}) {
        super(selectorName)
        this.name = name
        this.id = id
        this.hp = {
            total: hp,
            current: hp
        }

        this.type = type

        this.attacks = attacks

        this.renderHP()
    }

    renderHP = () => {
        const {hp: {current, total}} = this

        if (current < 20) {
            this.elProgressbar.classList.add('critical')
        } else if (current < 60) {
            this.elProgressbar.classList.add('low')
        } else {
            this.elProgressbar.classList.remove('critical', 'low')
        }

        this.elHP.innerText = current + '/' + total
        this.elProgressbar.style.width = (current / total) * 100 + '%'
    }

    changeHP = (count, cb) => {
        this.hp.current -= count;

        if (this.hp.current < 0) {
            this.hp.current = 0;
        }

        this.renderHP();

        cb && cb(count);
    }

    isDead = () => {
        return this.hp.current <= 0
    }

}

export default Pokemon