export class GameInfo {
    private static gameInfo: GameInfo

    private constructor() {
    }
        
    static gameInfoInstance(): GameInfo {
        if (!this.gameInfo) {
            this.gameInfo = new GameInfo()
        }

        return this.gameInfo
    }

    drawGameInfo(score: number, highScore: number, foodCounter: number): void {
        this.drawGameHighScore(highScore)
        this.drawGameScore(score)
        this.drawFoodDurability(foodCounter)
    }

    drawGameOverInfo(showGameOverInfo: boolean): void {
        const gameOverDiv: HTMLDivElement = document.querySelector(".game-over") as HTMLDivElement
        showGameOverInfo? gameOverDiv.innerHTML = "Game Over" : gameOverDiv.innerHTML = ""
    }

    private drawGameHighScore(highScore: number): void {
        const gameScoreDiv: HTMLDivElement = document.querySelector(".game-high-score") as HTMLDivElement
        gameScoreDiv.innerHTML = `HighScore: ${highScore}`
    }

    private drawGameScore(score: number): void {
        const gameScoreDiv: HTMLDivElement = document.querySelector(".game-score") as HTMLDivElement
        gameScoreDiv.innerHTML = `Score: ${score}`
    }
    
    private drawFoodDurability(foodCounter: number): void {
        const foodDurability: HTMLDivElement = document.querySelector(".food-durability") as HTMLDivElement
        foodDurability.innerHTML = `Food Durability: ${foodCounter}`
    }
}