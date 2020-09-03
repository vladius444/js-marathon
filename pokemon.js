class Selectors {
    constructor(name) {
        console.log(`health-${name}`)
        this.elHP = document.getElementById(`health-${name}`)
        this.elProgressbar = document.getElementById(`progressbar-${name}`)
    }
}

class Pokemon extends Selectors {
    constructor({name, hp, type, selectorName, attacks = []}) {
        super(selectorName)
        this.name = name
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

}

export default Pokemon