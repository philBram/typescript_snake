export class Food {
    constructor(gameBoardSize, snakeStartPosition) {
        this.generateFood(gameBoardSize, [snakeStartPosition]);
    }
    generateFood(gameBoardSize, snakeItems) {
        let foodX;
        let foodY;
        let snakeCollision;
        do {
            foodX = Math.floor(Math.random() * (gameBoardSize));
            foodY = Math.floor(Math.random() * (gameBoardSize));
            snakeCollision = snakeItems.some(item => item.x === foodX && item.y === foodY);
        } while (snakeCollision);
        this.foodPosition = { x: foodX, y: foodY };
    }
    getFoodPosition() {
        return this.foodPosition;
    }
}
