import { DirectionControl } from "./controllers/direction-control.js";
import { GameServerControl } from "./controllers/game-server-control.js";
import { GameStateControl } from "./controllers/game-state-control.js";
import { Food } from "./models/classes/food.js";
import { Snake } from "./models/classes/snake.js";
import { ISnakeItem } from "./models/interfaces/snakeItem.js";
import { GameBoard } from "./views/gameBoard.js"
import { GameInfo } from "./views/gameInfo.js";

const gameBoardSize: number = 10;
const updatesPerSec: number = 1000 / 3
const foodDurability: number = 20
const snakeStartPosition: ISnakeItem = {x: 5, y: 5}
let previousTime: number = 0
let gameOver: boolean = false
let score: number = 0
let highScore: number = 0
let foodCounter: number = foodDurability

const directionControl = DirectionControl.directionControlInstance()
const gameServerControl = GameServerControl.gameServerControlInstance()
GameStateControl.gameStateEventInit(startGame, stopGame)

const gameBoard: GameBoard = GameBoard.gameBoardInstance(gameBoardSize)
const gameInfo: GameInfo = GameInfo.gameInfoInstance()
let food: Food
let snake: Snake

function startGame() {
    gameOver = false
    foodCounter = foodDurability
    score = 0

    gameServerControl.getHighScore().then(score => highScore = score)
    gameInfo.drawGameOverInfo(gameOver)

    directionControl.resetDirectionUpdate()

    food = new Food(gameBoardSize, snakeStartPosition)
    snake = new Snake(snakeStartPosition)

    window.requestAnimationFrame(gameLoop)
}

async function stopGame() {
    await gameServerControl.setHighScore(score)
    await gameServerControl.getHighScore().then(score => highScore = score)

    gameOver = true
    previousTime = 0

    gameInfo.drawGameInfo(score, highScore, foodCounter)
    gameInfo.drawGameOverInfo(gameOver)
}

function gameLoop() {
    if (gameOver) return

    const currentTime = Date.now()

    if (currentTime - previousTime > updatesPerSec) {

        snake.moveSnake(directionControl.getDirectionUpdate())
        
        if (snake.isGameBoardCollision(gameBoardSize) || snake.isSelfCollision()) {
            stopGame()
            return
        }
        
        if (snake.hasEatenFood(food.getFoodPosition()!)) {
            score += 1
            foodCounter = foodDurability
            food.generateFood(gameBoardSize, snake.getSnakeBody())
        }

        if (foodCounter < 0) {
            foodCounter = foodDurability
            food.generateFood(gameBoardSize, snake.getSnakeBody())
        }

        gameBoard.drawGameBoard()
        gameInfo.drawGameInfo(score, highScore, foodCounter)
        gameBoard.drawFood(food.getFoodPosition()!)
        gameBoard.drawSnake(snake.getSnakeBody())

        foodCounter -= 1
        previousTime = currentTime
    }

    window.requestAnimationFrame(gameLoop)
}

async function startInfo() {
    await gameServerControl.getHighScore().then(score => highScore = score)

    gameBoard.drawGameBoard()
    gameInfo.drawGameInfo(score, highScore, foodCounter)
}

startInfo()