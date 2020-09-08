import Pokemon from "./pokemon.js";
import {countButtonClick, generateBattleLog, random} from "./utils.js";

const API = 'https://reactmarathon-api.netlify.app/api'

class Game {
    constructor() {
        this.$controlPlayer1 = document.querySelector('.control.player1')
        this.$controlPlayer2 = document.querySelector('.control.player2')
    }

    startGame = async () => {
        console.log('NEW GAME STARTED')

        await this.summonNewCharacter()
        this.summonNewEnemy()
    }

    resetGame = () => {
        this.startGame()
    }

    nextRound = () => {
        this.summonNewEnemy()
    }

    getPokemons = async () => {
        const response = await fetch(`${API}/pokemons`)
        return await response.json()
    }

    getRandomPokemon = async () => {
        const response = await fetch(`${API}/pokemons?random=true`)
        return await response.json()
    }

    summonNewCharacter = async () => {
        const randomEnemyPokemon = await this.getRandomPokemon()

        this.player1 = new Pokemon({
            ...randomEnemyPokemon,
            selectorName: 'player1',
        })

        const $elImg = document.getElementById('img-player1');
        $elImg.src = randomEnemyPokemon.img;
        const $elEnemyName = document.getElementById('name-player1');
        $elEnemyName.innerText = randomEnemyPokemon.name;

        const allEnemyButtons = document.querySelectorAll('.control.player1 .button');
        allEnemyButtons.forEach($item => $item.remove());

        this.player1.attacks.forEach(item => {
                const $btn = document.createElement('button')
                $btn.classList.add('button')
                $btn.innerText = item.name

                const btnCount = countButtonClick(item.maxCount, $btn)

                $btn.addEventListener('click', () => {
                    console.log(`click button ${$btn.innerText}`)
                    btnCount()

                    this.player2.changeHP(random(item.maxDamage, item.minDamage))

                    if (this.player2.isDead()) {
                        this.nextRound()
                    } else {
                        this.autoEnemyAttack()
                    }

                    //todo ЛОГ
                    // this.player1.changeHP(random(item.maxDamage, item.minDamage), function (count) {
                    //     addLogRow(generateBattleLog(this.player1, this.player2, count))
                    // })

                })

                this.$controlPlayer1.appendChild($btn)
            }
        )
    }

    summonNewEnemy = async () => {
        const randomEnemyPokemon = await this.getRandomPokemon()
        this.player2 = new Pokemon({
            ...randomEnemyPokemon,
            selectorName: 'player2',
        })

        const $elImg = document.getElementById('img-player2');
        $elImg.src = randomEnemyPokemon.img;
        const $elEnemyName = document.getElementById('name-player2');
        $elEnemyName.innerText = randomEnemyPokemon.name;

        const allEnemyButtons = document.querySelectorAll('.control.player2 .button');
        allEnemyButtons.forEach($item => $item.remove());

        this.player2.attacks.forEach(item => {
                const $btn = document.createElement('button')
                $btn.classList.add('button')
                $btn.innerText = item.name

                const btnCount = countButtonClick(item.maxCount, $btn)

                $btn.addEventListener('click', () => {
                    console.log(`click button ${$btn.innerText}`)
                    btnCount()

                    this.player1.changeHP(random(item.maxDamage, item.minDamage))

                    if (this.player1.isDead()) {
                        alert('YOU LOST')

                        const allGameButtons = document.querySelectorAll('.control .button');
                        allGameButtons.forEach($item => $item.disabled = true);
                    }

                    //todo ЛОГ
                    // this.player1.changeHP(random(item.maxDamage, item.minDamage), function (count) {
                    //     addLogRow(generateBattleLog(this.player1, this.player2, count))
                    // })
                })

                this.$controlPlayer2.appendChild($btn)
            }
        )
    }

    autoEnemyAttack = () => {
        const allEnemyButtons = document.querySelectorAll('.control.player2 .button');
        const randomButton = allEnemyButtons[random(allEnemyButtons.length - 1)]

        //todo если disable кнопка, то надо след искать. Если не осталось свободных - finish game
        randomButton.click()
    }
}

export default Game