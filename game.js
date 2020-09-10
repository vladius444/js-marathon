import Pokemon from "./pokemon.js";
import {countButtonClick, generateBattleLog, random} from "./utils.js";

const API = 'https://reactmarathon-api.netlify.app/api'

class Game {
    startGame = async () => {
        console.log('NEW GAME STARTED')

        await this.summonNewCharacter()
        await this.summonNewEnemy()

        this.createAttackButtons(this.player1, this.player2)
    }

    finishGame = () => {
        alert("YOU LOSE")
    }

    resetGame = async () => {
        await this.startGame()
    }

    nextRound = async () => {
        await this.summonNewEnemy()
    }

    getPokemons = async () => {
        const response = await fetch(`${API}/pokemons`)
        return await response.json()
    }

    getRandomPokemon = async () => {
        const response = await fetch(`${API}/pokemons?random=true`)
        return await response.json()
    }

    fight = async (player1ID, attackID, player2ID) => {
        const response = await fetch(`${API}/fight?player1id=${player1ID}&attackId=${attackID}&player2id=${player2ID}`)
        return await response.json()
    }

    createAttackButtons = (attacker, defender) => {
        const {attacks, id} = attacker

        attacks.forEach(item => {
            const $btn = document.createElement('button')
            $btn.classList.add('button')
            $btn.innerText = item.name

            const btnCount = countButtonClick(item.maxCount, $btn)

            $btn.addEventListener('click', async () => {
                console.log(`click button ${$btn.innerText}`)
                btnCount()

                const fightResult = await this.fight(id, item.id, defender.id)

                defender.changeHP(fightResult.kick.player2)

                if (defender.isDead()) {
                    await this.nextRound()
                }

                attacker.changeHP(fightResult.kick.player1)
                if (attacker.isDead()) {
                    this.finishGame()
                }


                //todo ЛОГ
                // this.player1.changeHP(random(item.maxDamage, item.minDamage), function (count) {
                //     addLogRow(generateBattleLog(this.player1, this.player2, count))
                // })

            })

            attacker.elControl.appendChild($btn)
        })
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
    }
}

export default Game