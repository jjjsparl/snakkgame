const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('startButton');

const tileSize = 10;
const tileCount = canvas.width / tileSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;
let gameLoop;

function drawGame() {
    clearCanvas();
    moveSnake();
    drawSnake();
    drawFood();
    checkCollision();
    updateScore();
}

function clearCanvas() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        generateFood();
    } else {
        snake.pop();
    }
}

function drawSnake() {
    ctx.fillStyle = '#00ffff';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
    });
}

function drawFood() {
    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}

function generateFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver();
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }
}

function gameOver() {
    clearInterval(gameLoop);
    alert(`Game Over! Your score: ${score}`);
    startButton.style.display = 'block';
}

function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

function changeDirection(e) {
    const key = e.key;
    if (key === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -1;
    } else if (key === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = 1;
    } else if (key === 'ArrowLeft' && dx === 0) {
        dx = -1;
        dy = 0;
    } else if (key === 'ArrowRight' && dx === 0) {
        dx = 1;
        dy = 0;
    }
}

function startGame() {
    snake = [{ x: 10, y: 10 }];
    food = { x: 15, y: 15 };
    dx = 0;
    dy = 0;
    score = 0;
    startButton.style.display = 'none';
    gameLoop = setInterval(drawGame, 100);
}

document.addEventListener('keydown', changeDirection);
startButton.addEventListener('click', startGame);

// Prevent zooming
window.addEventListener("wheel", (e) => {
    const isPinching = e.ctrlKey;
    if (isPinching) e.preventDefault();
}, { passive: false });

// Telegram Web App integration
window.Telegram.WebApp.ready();
window.Telegram.WebApp.expand();