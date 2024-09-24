import { ISnakeItem } from "../interfaces/snakeItem";

export class Snake {
    private snakeBody: ISnakeItem[]

    constructor(snakeStartPosition: ISnakeItem) {
        this.snakeBody = [snakeStartPosition]
    }

    moveSnake(directionUpdate: ISnakeItem): void {
        for (let i = this.snakeBody.length - 2; i >= 0; i--) {
            this.snakeBody[i + 1] = this.snakeBody[i]
        }

        const snakeHeadXPosition = this.snakeBody[0].x
        const snakeHeadYPosition = this.snakeBody[0].y

        this.snakeBody[0] = {x: snakeHeadXPosition + directionUpdate.x, y: snakeHeadYPosition + directionUpdate.y}
    }

    hasEatenFood(foodPosition: ISnakeItem): boolean {
        const hasEaten = this.snakeBody[0].x === foodPosition.x && this.snakeBody[0].y === foodPosition.y

        if (hasEaten) {
            this.snakeBody.push(this.snakeBody[this.snakeBody.length - 1])
        }

        return hasEaten
    }
    
    isGameBoardCollision(gameBoardSize: number) {
        return this.snakeBody[0].x > gameBoardSize - 1 ||
        this.snakeBody[0].x < 0 ||
        this.snakeBody[0].y > gameBoardSize - 1 ||
        this.snakeBody[0].y < 0
    }

    isSelfCollision(): boolean {
        return this.snakeBody.slice(1).some(item => 
            item.x === this.snakeBody[0].x && item.y === this.snakeBody[0].y)
    }

    getSnakeBody(): ISnakeItem[] {
        return this.snakeBody
    }
}