const cors = require("cors")
const express = require("express")
const db = require("./db")

const app = express()

const PORT = 3000

app.use(cors())
app.use(express.json())

app.get("/highScore", (req, res) => {
    const query = "select highScore from highScores where id=1"

    db.query(query, (err, result) => {
        if (err) {
            console.error("Error fetching high score:", err)
            return res.status(500).json({message: "Internal server error"})
        }

        if (result.length > 0) {
            return res.json({highScore: result[0].highScore})
        }
    })
})

app.post("/highScore", (req, res) => {
    const {highScore} = req.body

    if (typeof highScore !== "number") {
        return res.status(400).json({message: "Score must be a number"})
    }

    const query = "update highScores set highScore = ? where id = ?"
    db.query(query, [highScore, 1], (err, result) => {
        if (err) {
            console.error("Error updating high score:", err)
            return res.status(500).json({message: "Internal server error"})
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({message: "High score not updated"})
        }

        return res.status(200).json({message: "High score update successfully"})
    })
})

app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`)
})