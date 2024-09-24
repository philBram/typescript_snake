var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class GameServerControl {
    constructor() {
        this.highScoreEndPoint = "http://localhost:3000/highScore";
    }
    static gameServerControlInstance() {
        if (!this.gameServerControl) {
            this.gameServerControl = new GameServerControl();
        }
        return this.gameServerControl;
    }
    getHighScore() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield fetch(this.highScoreEndPoint);
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = yield res.json();
                return data.highScore;
            }
            catch (error) {
                console.error(error);
                return 0;
            }
        });
    }
    setHighScore(highScore) {
        return __awaiter(this, void 0, void 0, function* () {
            let previousHighScore;
            yield this.getHighScore().then(score => previousHighScore = score);
            if (highScore > previousHighScore) {
                try {
                    const response = yield fetch(this.highScoreEndPoint, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ highScore })
                    });
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    const data = yield response.json();
                    console.log(data);
                }
                catch (error) {
                    console.error(error);
                }
            }
        });
    }
}
