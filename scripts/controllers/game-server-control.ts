export class GameServerControl {
    private readonly highScoreEndPoint: string = "http://localhost:3000/highScore"
    private static gameServerControl: GameServerControl

    private constructor() {}

    static gameServerControlInstance(): GameServerControl {
        if (!this.gameServerControl) {
            this.gameServerControl = new GameServerControl()
        }

        return this.gameServerControl
    }

    async getHighScore(): Promise<number> {
        try {
            const res = await fetch(this.highScoreEndPoint)

            if (!res.ok) {
                throw new Error("Network response was not ok")
            }

            const data = await res.json()

            return data.highScore
        }
        catch(error) {
            console.error(error)
            return 0
        }
    }

    async setHighScore(highScore: number): Promise<void> {
        let previousHighScore: number
        await this.getHighScore().then(score => previousHighScore = score)

        if (highScore > previousHighScore!) {
            try {
                const response = await fetch(this.highScoreEndPoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({highScore})
                })

                if (!response.ok) {
                    throw new Error("Network response was not ok")
                }

                const data = await response.json()
                console.log(data)
            }
            catch(error) {
                console.error(error)
            }
        }
    }
}