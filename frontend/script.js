// ================================
// SCROLL TO GAMES
// ================================

function scrollToGames() {

    const games = document.getElementById("games");

    if (games) {
        games.scrollIntoView({
            behavior: "smooth"
        });
    }

}


// ================================
// START GAME FROM HOME PAGE
// ================================

function startGame(gameName) {

    if (gameName === "Car Racing") {

        window.location.href = "games/car-racing/index.html";

    }

    else if (gameName === "Snake") {

        window.location.href = "games/snake/index.html";

    }

    else if (gameName === "Brick Breaker") {

        window.location.href = "games/brick-breaker/index.html";

    }

    else {

        alert("🎮 " + gameName + " is coming soon!");

    }

}


// ================================
// OPEN GAME
// ================================

function openGame(gameName) {

    if (gameName === "car-racing") {

        window.location.href =
            "games/car-racing/index.html";

    }

    else if (gameName === "snake") {

        window.location.href =
            "games/snake/index.html";

    }

    else if (gameName === "brick-breaker") {

        window.location.href =
            "games/brick-breaker/index.html";

    }

    else if (gameName === "pong") {

        alert("🏓 Pong Game will be added soon!");

    }

    else if (gameName === "space-shooter") {

        alert("👾 Space Shooter will be added soon!");

    }

    else if (gameName === "memory") {

        alert("🧠 Memory Game will be added soon!");

    }

}


// ================================
// LOAD LEADERBOARD
// ================================

async function loadLeaderboard() {

    const leaderboardBody =
        document.getElementById("leaderboardBody");

    if (!leaderboardBody) {
        return;
    }

    try {

        const response =
            await fetch("http://localhost:5000/api/scores");

        if (!response.ok) {
            throw new Error("Failed to load scores");
        }

        const scores = await response.json();

        // Highest score first
        scores.sort((a, b) => b.score - a.score);

        leaderboardBody.innerHTML = "";

        if (scores.length === 0) {

            leaderboardBody.innerHTML = `
                <tr>
                    <td colspan="4">
                        No scores yet. Play a game!
                    </td>
                </tr>
            `;

            return;
        }

        scores.forEach((item, index) => {

            let medal = "";

            if (index === 0) {
                medal = "🥇";
            }

            else if (index === 1) {
                medal = "🥈";
            }

            else if (index === 2) {
                medal = "🥉";
            }

            leaderboardBody.innerHTML += `
                <tr>
                    <td>
                        ${medal} ${index + 1}
                    </td>

                    <td>
                        ${item.player || "Unknown"}
                    </td>

                    <td>
                        ${item.game || "Car Racing"}
                    </td>

                    <td>
                        ${item.score || 0}
                    </td>
                </tr>
            `;

        });

    }

    catch (error) {

        console.error(
            "Leaderboard Error:",
            error
        );

        leaderboardBody.innerHTML = `
            <tr>
                <td colspan="4">
                    ❌ Unable to load scores
                </td>
            </tr>
        `;

    }

}


// ================================
// LOGIN
// ================================

function openLogin() {

    window.location.href = "login.html";

}


// ================================
// RUN WHEN PAGE LOADS
// ================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadLeaderboard();

    }
);