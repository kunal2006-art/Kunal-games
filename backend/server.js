require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const scoresFile = path.join(__dirname, "scores.json");

function readScores() {
    try {
        return JSON.parse(fs.readFileSync(scoresFile, "utf8"));
    } catch {
        return [];
    }
}

function saveScores(scores) {
    fs.writeFileSync(
        scoresFile,
        JSON.stringify(scores, null, 2)
    );
}

// HOME
app.get("/", (req, res) => {
    res.send("🎮 Kunal Games Backend is Running!");
});

// GAMES
app.get("/api/games", (req, res) => {
    res.json([
        {
            id: 1,
            name: "Car Racing",
            category: "Racing"
        },
        {
            id: 2,
            name: "Snake",
            category: "Arcade"
        },
        {
            id: 3,
            name: "Brick Breaker",
            category: "Arcade"
        }
    ]);
});

// GET SCORES
app.get("/api/scores", (req, res) => {
    const scores = readScores();
    res.json(scores);
});

// SAVE SCORE
app.post("/api/scores", (req, res) => {

    const { player, score, game } = req.body;

    if (!player || score === undefined || !game) {
        return res.status(400).json({
            message: "Player, score and game are required"
        });
    }

    const scores = readScores();

    const newScore = {
        id: Date.now(),
        player: player,
        score: Number(score),
        game: game,
        date: new Date().toISOString()
    };

    scores.push(newScore);

    saveScores(scores);

    res.json({
        message: "Score saved successfully!",
        score: newScore
    });
});

// START SERVER
app.listen(PORT, () => {
    console.log(`🎮 Backend running at http://localhost:${PORT}`);
});