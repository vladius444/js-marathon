import Pokemon from "./pokemon.js";
import {pokemons} from "./pokemons.js";
import {countButtonClick, generateBattleLog, random} from "./utils.js";

class Game {
    constructor() {
        this.$controlPlayer1 = document.querySelector('.control.player1')
        this.$controlPlayer2 = document.querySelector('.control.player2')
    }

    startGame = () => {
        console.log('NEW GAME STARTED')

        this.summonNewCharacter()
        this.summonNewEnemy()
    }

    resetGame = () => {
        this.startGame()
    }

    nextRound = () => {
        this.summonNewEnemy()
    }

    isGameFinished = () => {
        if (this.player1.hp.current <= 0) {
            this.resetGame()
        }

        if (this.player2.hp.current <= 0) {
            this.nextRound()
        }
    }

    summonNewCharacter = () => {
        const randomEnemyPokemon = pokemons[random(pokemons.length - 1 )]
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

                    //todo ЛОГ
                    // this.player1.changeHP(random(item.maxDamage, item.minDamage), function (count) {
                    //     addLogRow(generateBattleLog(this.player1, this.player2, count))
                    // })

                    this.isGameFinished()
                })

                this.$controlPlayer1.appendChild($btn)
            }
        )
    }

    summonNewEnemy = () => {
        const randomEnemyPokemon = pokemons[random(pokemons.length - 1 )]
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

                    //todo ЛОГ
                    // this.player1.changeHP(random(item.maxDamage, item.minDamage), function (count) {
                    //     addLogRow(generateBattleLog(this.player1, this.player2, count))
                    // })

                    this.isGameFinished()
                })

                this.$controlPlayer2.appendChild($btn)
            }
        )
    }
}

export default Game