class Game {


    startGame = () => {
        console.log('NEW GAME STARTED')
    }

    resetGame = () => {
        const allButtons = document.querySelectorAll('.control .button');
        allButtons.forEach($item => $item.remove());

        this.startGame()
    }
}