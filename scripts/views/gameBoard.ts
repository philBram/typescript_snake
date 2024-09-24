import { ISnakeItem } from "../models/interfaces/snakeItem.js"

export class GameBoard {
    private static gameBoard: GameBoard
    private readonly gameBoardSize: number

    private constructor(gameBoardSize: number) { 
        this.gameBoardSize = gameBoardSize
    }

    static gameBoardInstance(gameBoardSize: number): GameBoard {
        if (!this.gameBoard) {
            this.gameBoard = new GameBoard(gameBoardSize)
        }
        
        return GameBoard.gameBoard
    }

    drawGameBoard(): void {
        const gameBoardContainer: HTMLDivElement = document.querySelector(".game-board-container") as HTMLDivElement
        gameBoardContainer.style.setProperty("--grid-size", this.gameBoardSize.toString())
        gameBoardContainer.innerHTML = ""

        for (let i = 0; i < this.gameBoardSize * this.gameBoardSize; i++) {
            const gridItem: HTMLDivElement = document.createElement("div")
            gridItem.className = "grid-item"
            gameBoardContainer.appendChild(gridItem)
        }
    }

    drawSnake(snakeBody: ISnakeItem[]): void {
        snakeBody.forEach(item => {
            const gridNthItem: HTMLDivElement = this.getNthItem(item)
            if (gridNthItem) {
                gridNthItem.className = "grid-snake"
            }
        })
    }

    drawFood(foodItem: ISnakeItem): void {
        const gridNthItem: HTMLDivElement = this.getNthItem(foodItem)
        gridNthItem.className = "grid-food"
    }

    private getNthItem(item: ISnakeItem): HTMLDivElement {
        const nthItem: number = ((item.x + 1) % (this.gameBoardSize + 1)) + (item.y * this.gameBoardSize)
        const gridNthItem: HTMLDivElement =  document.querySelector(`.grid-item:nth-child(${nthItem})`) as HTMLDivElement

        return gridNthItem
    }
}
