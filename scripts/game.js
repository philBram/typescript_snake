var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DirectionControl } from "./controllers/direction-control.js";
import { GameServerControl } from "./controllers/game-server-control.js";
import { GameStateControl } from "./controllers/game-state-control.js";
import { Food } from "./models/classes/food.js";
import { Snake } from "./models/classes/snake.js";
import { GameBoard } from "./views/gameBoard.js";
import { GameInfo } from "./views/gameInfo.js";
const gameBoardSize = 10;
const updatesPerSec = 1000 / 3;
const foodDurability = 20;
const snakeStartPosition = { x: 5, y: 5 };
let previousTime = 0;
let gameOver = false;
let score = 0;
let highScore = 0;
let foodCounter = foodDurability;
const directionControl = DirectionControl.directionControlInstance();
const gameServerControl = GameServerControl.gameServerControlInstance();
GameStateControl.gameStateEventInit(startGame, stopGame);
const gameBoard = GameBoard.gameBoardInstance(gameBoardSize);
const gameInfo = GameInfo.gameInfoInstance();
let food;
let snake;
function startGame() {
    gameOver = false;
    foodCounter = foodDurability;
    score = 0;
    gameServerControl.getHighScore().then(score => highScore = score);
    gameInfo.drawGameOverInfo(gameOver);
    directionControl.resetDirectionUpdate();
    food = new Food(gameBoardSize, snakeStartPosition);
    snake = new Snake(snakeStartPosition);
    window.requestAnimationFrame(gameLoop);
}
function stopGame() {
    return __awaiter(this, void 0, void 0, function* () {
        yield gameServerControl.setHighScore(score);
        yield gameServerControl.getHighScore().then(score => highScore = score);
        gameOver = true;
        previousTime = 0;
        gameInfo.drawGameInfo(score, highScore, foodCounter);
        gameInfo.drawGameOverInfo(gameOver);
    });
}
function gameLoop() {
    if (gameOver)
        return;
    const currentTime = Date.now();
    if (currentTime - previousTime > updatesPerSec) {
        snake.moveSnake(directionControl.getDirectionUpdate());
        if (snake.isGameBoardCollision(gameBoardSize) || snake.isSelfCollision()) {
            stopGame();
            return;
        }
        if (snake.hasEatenFood(food.getFoodPosition())) {
            score += 1;
            foodCounter = foodDurability;
            food.generateFood(gameBoardSize, snake.getSnakeBody());
        }
        if (foodCounter < 0) {
            foodCounter = foodDurability;
            food.generateFood(gameBoardSize, snake.getSnakeBody());
        }
        gameBoard.drawGameBoard();
        gameInfo.drawGameInfo(score, highScore, foodCounter);
        gameBoard.drawFood(food.getFoodPosition());
        gameBoard.drawSnake(snake.getSnakeBody());
        foodCounter -= 1;
        previousTime = currentTime;
    }
    window.requestAnimationFrame(gameLoop);
}
function startInfo() {
    return __awaiter(this, void 0, void 0, function* () {
        yield gameServerControl.getHighScore().then(score => highScore = score);
        gameBoard.drawGameBoard();
        gameInfo.drawGameInfo(score, highScore, foodCounter);
    });
}
startInfo();
