export class GameStateControl {
    private constructor() {}

    static gameStateEventInit(startGame: Function, stopGame: Function): void {
        const startButton: HTMLButtonElement = document.querySelector(".start-button") as HTMLButtonElement
        const stopButton: HTMLButtonElement = document.querySelector(".stop-button") as HTMLButtonElement

        startButton.addEventListener("click", startGame.bind(this))
        stopButton.addEventListener("click", stopGame.bind(this))
    }
}