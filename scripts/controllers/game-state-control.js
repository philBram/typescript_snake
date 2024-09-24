export class GameStateControl {
    constructor() { }
    static gameStateEventInit(startGame, stopGame) {
        const startButton = document.querySelector(".start-button");
        const stopButton = document.querySelector(".stop-button");
        startButton.addEventListener("click", startGame.bind(this));
        stopButton.addEventListener("click", stopGame.bind(this));
    }
}
