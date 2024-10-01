export class GameBoard {
    constructor(gameBoardSize) {
        this.gameBoardSize = gameBoardSize;
    }
    static gameBoardInstance(gameBoardSize) {
        if (!this.gameBoard) {
            this.gameBoard = new GameBoard(gameBoardSize);
        }
        return GameBoard.gameBoard;
    }
    drawGameBoard() {
        const gameBoardContainer = document.querySelector(".game-board-container");
        gameBoardContainer.style.setProperty("--grid-size", this.gameBoardSize.toString());
        gameBoardContainer.innerHTML = "";
        for (let i = 0; i < this.gameBoardSize * this.gameBoardSize; i++) {
            const gridItem = document.createElement("div");
            gridItem.className = "grid-item";
            gameBoardContainer.appendChild(gridItem);
        }
    }
    drawSnake(snakeBody) {
        snakeBody.forEach(item => {
            const gridNthItem = this.getNthItem(item);
            if (gridNthItem) {
                gridNthItem.className = "grid-snake";
            }
        });
    }
    drawFood(foodItem) {
        const gridNthItem = this.getNthItem(foodItem);
        gridNthItem.className = "grid-food";
    }
    getNthItem(item) {
        const nthItem = ((item.x + 1) % (this.gameBoardSize + 1)) + (item.y * this.gameBoardSize);
        const gridNthItem = document.querySelector(`.game-board-container div:nth-child(${nthItem})`);
        return gridNthItem;
    }
}
