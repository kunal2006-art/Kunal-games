const player =
    document.getElementById("player");

const enemy =
    document.getElementById("enemy");

const coin =
    document.getElementById("coin");

const bonusItem =
    document.getElementById("bonusItem");


const scoreElement =
    document.getElementById("score");

const coinsElement =
    document.getElementById("coins");

const bonusElement =
    document.getElementById("bonus");

const livesElement =
    document.getElementById("lives");


const leftButton =
    document.getElementById("leftButton");

const rightButton =
    document.getElementById("rightButton");


let playerX = 145;

let enemyY = -120;

let enemyX = 50;

let coinY = -100;

let coinX = 150;

let bonusY = -200;

let bonusX = 200;


let score = 0;

let coins = 0;

let bonus = 0;

let lives = 3;


let gameRunning = true;

let speed = 5;


/* ================= MOVE LEFT ================= */

function moveLeft() {

    if (!gameRunning)
        return;


    playerX -= 25;


    if (playerX < 10) {

        playerX = 10;

    }


    player.style.left =
        playerX + "px";

}


/* ================= MOVE RIGHT ================= */

function moveRight() {

    if (!gameRunning)
        return;


    playerX += 25;


    if (playerX > 280) {

        playerX = 280;

    }


    player.style.left =
        playerX + "px";

}


/* ================= KEYBOARD ================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key ===
            "ArrowLeft"
        ) {

            moveLeft();

        }


        if (
            event.key ===
            "ArrowRight"
        ) {

            moveRight();

        }

    }
);


/* ================= BUTTONS ================= */

leftButton.addEventListener(
    "click",
    moveLeft
);


rightButton.addEventListener(
    "click",
    moveRight
);


/* ================= RANDOM POSITION ================= */

function randomPosition() {

    return Math.floor(
        Math.random() * 280
    );

}


/* ================= ENEMY ================= */

function moveEnemy() {

    if (!gameRunning)
        return;


    enemyY += speed;


    enemy.style.top =
        enemyY + "px";


    if (enemyY > 620) {

        enemyY = -120;

        enemyX =
            randomPosition();

        enemy.style.left =
            enemyX + "px";


        score += 100;

        scoreElement.textContent =
            score;


        /* INCREASE DIFFICULTY */

        if (score % 500 === 0) {

            speed += 0.5;

        }

    }


    checkCollision();

}


/* ================= COIN ================= */

function createCoin() {

    if (!gameRunning)
        return;


    coin.style.display =
        "block";


    coinY = -50;

    coinX =
        randomPosition();


    coin.style.top =
        coinY + "px";


    coin.style.left =
        coinX + "px";

}


function moveCoin() {

    if (
        !gameRunning ||
        coin.style.display ===
        "none"
    )
        return;


    coinY += speed;


    coin.style.top =
        coinY + "px";


    if (coinY > 620) {

        coin.style.display =
            "none";

    }


    checkCoinCollision();

}


/* ================= BONUS ================= */

function createBonus() {

    if (!gameRunning)
        return;


    bonusItem.style.display =
        "block";


    bonusY = -50;

    bonusX =
        randomPosition();


    bonusItem.style.top =
        bonusY + "px";


    bonusItem.style.left =
        bonusX + "px";

}


function moveBonus() {

    if (
        !gameRunning ||
        bonusItem.style.display ===
        "none"
    )
        return;


    bonusY += speed;


    bonusItem.style.top =
        bonusY + "px";


    if (bonusY > 620) {

        bonusItem.style.display =
            "none";

    }


    checkBonusCollision();

}


/* ================= COLLISION ================= */

function checkCollision() {

    const playerRect =
        player.getBoundingClientRect();

    const enemyRect =
        enemy.getBoundingClientRect();


    if (

        playerRect.left <
        enemyRect.right &&

        playerRect.right >
        enemyRect.left &&

        playerRect.top <
        enemyRect.bottom &&

        playerRect.bottom >
        enemyRect.top

    ) {

        loseLife();

    }

}


/* ================= COIN COLLISION ================= */

function checkCoinCollision() {

    const playerRect =
        player.getBoundingClientRect();

    const coinRect =
        coin.getBoundingClientRect();


    if (

        playerRect.left <
        coinRect.right &&

        playerRect.right >
        coinRect.left &&

        playerRect.top <
        coinRect.bottom &&

        playerRect.bottom >
        coinRect.top

    ) {

        collectCoin();

    }

}


/* ================= BONUS COLLISION ================= */

function checkBonusCollision() {

    const playerRect =
        player.getBoundingClientRect();

    const bonusRect =
        bonusItem.getBoundingClientRect();


    if (

        playerRect.left <
        bonusRect.right &&

        playerRect.right >
        bonusRect.left &&

        playerRect.top <
        bonusRect.bottom &&

        playerRect.bottom >
        bonusRect.top

    ) {

        collectBonus();

    }

}


/* ================= COLLECT COIN ================= */

function collectCoin() {

    coins++;

    score += 250;


    coinsElement.textContent =
        coins;

    scoreElement.textContent =
        score;


    coin.style.display =
        "none";


    showReward(
        "🪙 +250 POINTS!"
    );

}


/* ================= COLLECT BONUS ================= */

function collectBonus() {

    bonus++;

    score += 1000;


    bonusElement.textContent =
        bonus;

    scoreElement.textContent =
        score;


    bonusItem.style.display =
        "none";


    showReward(
        "⭐ +1000 BONUS!"
    );

}


/* ================= REWARD MESSAGE ================= */

function showReward(message) {

    const reward =
        document.createElement("div");


    reward.textContent =
        message;


    reward.style.position =
        "fixed";


    reward.style.top =
        "40%";


    reward.style.left =
        "50%";


    reward.style.transform =
        "translate(-50%, -50%)";


    reward.style.fontSize =
        "30px";


    reward.style.fontWeight =
        "bold";


    reward.style.color =
        "gold";


    reward.style.zIndex =
        "100";


    document.body.appendChild(
        reward
    );


    setTimeout(
        function() {

            reward.remove();

        },
        1000
    );

}


/* ================= LOSE LIFE ================= */

function loseLife() {

    lives--;


    livesElement.textContent =
        lives;


    player.classList.add(
        "explosion"
    );


    setTimeout(
        function() {

            player.classList.remove(
                "explosion"
            );

        },
        500
    );


    enemyY = -120;


    if (lives <= 0) {

        gameOver();

    }

}


/* ================= GAME OVER ================= */

function gameOver() {

    gameRunning = false;
     saveGameScore(score);


    setTimeout(
        function() {

            alert(
                "💥 GAME OVER!\n\n" +
                "🏆 Score: " +
                score +
                "\n🪙 Coins: " +
                coins +
                "\n⭐ Bonus: " +
                bonus
            );

        },
        200
    );

}


/* ================= RESTART ================= */

function restartGame() {

    playerX = 145;

    enemyY = -120;

    score = 0;

    coins = 0;

    bonus = 0;

    lives = 3;

    speed = 5;

    gameRunning = true;


    player.style.left =
        playerX + "px";


    enemy.style.top =
        enemyY + "px";


    coin.style.display =
        "none";


    bonusItem.style.display =
        "none";


    scoreElement.textContent =
        score;


    coinsElement.textContent =
        coins;


    bonusElement.textContent =
        bonus;


    livesElement.textContent =
        lives;

}


/* ================= GAME LOOP ================= */

setInterval(
    moveEnemy,
    30
);


setInterval(
    moveCoin,
    30
);


setInterval(
    moveBonus,
    30
);


/* ================= SPAWN COINS ================= */

setInterval(
    function() {

        if (
            gameRunning &&
            coin.style.display ===
            "none"
        ) {

            createCoin();

        }

    },
    2500
);


/* ================= SPAWN BONUS ================= */

setInterval(
    function() {

        if (
            gameRunning &&
            bonusItem.style.display ===
            "none"
        ) {

            createBonus();

        }

    },
    7000
);
async function saveGameScore(score) {
    try {
        const response = await fetch("http://localhost:5000/api/scores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                player: "Kunal",
                score: score,
                game: "Car Racing"
            })
        });

        const result = await response.json();

        console.log("Score saved:", result);

    } catch (error) {
        console.error("Error saving score:", error);
    }
}

