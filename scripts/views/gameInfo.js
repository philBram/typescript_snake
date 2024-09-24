export class GameInfo {
    constructor() {
    }
    static gameInfoInstance() {
        if (!this.gameInfo) {
            this.gameInfo = new GameInfo();
        }
        return this.gameInfo;
    }
    drawGameInfo(score, highScore, foodCounter) {
        this.drawGameHighScore(highScore);
        this.drawGameScore(score);
        this.drawFoodDurability(foodCounter);
    }
    drawGameOverInfo(showGameOverInfo) {
        const gameOverDiv = document.querySelector(".game-over");
        showGameOverInfo ? gameOverDiv.innerHTML = "Game Over" : gameOverDiv.innerHTML = "";
    }
    drawGameHighScore(highScore) {
        const gameScoreDiv = document.querySelector(".game-high-score");
        gameScoreDiv.innerHTML = `HighScore: ${highScore}`;
    }
    drawGameScore(score) {
        const gameScoreDiv = document.querySelector(".game-score");
        gameScoreDiv.innerHTML = `Score: ${score}`;
    }
    drawFoodDurability(foodCounter) {
        const foodDurability = document.querySelector(".food-durability");
        foodDurability.innerHTML = `Food Durability: ${foodCounter}`;
    }
}
