import { ISnakeItem } from "../interfaces/snakeItem";

export class Food {
    private foodPosition?: ISnakeItem

    constructor(gameBoardSize: number, snakeStartPosition: ISnakeItem) {
        this.generateFood(gameBoardSize, [snakeStartPosition])
    }

    generateFood(gameBoardSize: number, snakeItems: ISnakeItem[]): void {
        let foodX: number
        let foodY: number
        let snakeCollision: boolean

        do { 
            foodX = Math.floor(Math.random() * (gameBoardSize))
            foodY = Math.floor(Math.random() * (gameBoardSize))

            snakeCollision = snakeItems.some(item => item.x === foodX && item.y === foodY)
        } while (snakeCollision)

        this.foodPosition = {x: foodX, y: foodY}
    }

    getFoodPosition(): ISnakeItem | undefined {
        return this.foodPosition
    }
}