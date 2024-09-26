const canvas = document.getElementById("myCanvas");

const ctx = canvas.getContext("2d");

const gameSettings = {
  generalColor: "#0095DD",
  font: "16px Arial",
};

const gameInfo = {
  lives: 3,
  score: 0,
  status: "IN_PROGRESS",
};

let loopGame;
let rightPressed = false;
let leftPressed = false;

const ball = {
  x: canvas.width / 2,
  y: canvas.height - 30,
  radius: 10,
};

let dx = 2;
let dy = -2;

const paddle = {
  height: 10,
  width: 75,
  // TODO: check how to reference its own height and width
  x: (canvas.width - 75) / 2,
  y: canvas.height - 10,
};

const brick = () => ({ x: 0, y: 0, status: 1, width: 75, height: 20 });

const bricks = [];
const brickRowCount = 3;
const brickColumnCount = 5;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const createBricks = () => {
  for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];

    for (let r = 0; r < brickRowCount; r++) {
      bricks[c][r] = brick();
    }
  }
};

function drawScore(score) {
  ctx.font = gameSettings.font;
  ctx.fillStyle = gameSettings.generalColor;
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives(lives) {
  ctx.font = gameSettings.font;
  ctx.fillStyle = gameSettings.generalColor;
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

function drawBall(ball) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color || gameSettings.generalColor;
  ctx.fill();
  ctx.closePath();
}

function drawBlock(x, y, width, height) {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.fillStyle = gameSettings.generalColor;
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        const brick = bricks[c][r];
        const brickX = c * (brick.width + brickPadding) + brickOffsetLeft;
        const brickY = r * (brick.height + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        drawBlock(brickX, brickY, brick.width, brick.height);
      }
    }
  }
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const brick = bricks[c][r];
      // calculations
      if (
        brick.status === 1 &&
        ball.x > brick.x &&
        ball.x < brick.x + brick.width &&
        ball.y > brick.y &&
        ball.y < brick.y + brick.height
      ) {
        dy = -dy;
        brick.status = 0;
        gameInfo.score++;
      }
    }
  }
}

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.x = relativeX - paddle.width / 2;
  }
}

const setGameConfig = () => {
  gameSettings.generalColor = document.getElementById("color").value;
  createBricks();
};

const finishGame = (message = "GAME OVER!") => {
  alert(message);
  document.location.reload();
  cancelAnimationFrame(loopGame);
};

const resetGame = () => {
  ball.x = canvas.width / 2;
  ball.y = canvas.height - 30;
  dx = 2;
  dy = -2;
  paddle.x = (canvas.width - paddle.width) / 2;
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall(ball);
  drawBlock(paddle.x, paddle.y, paddle.width, paddle.height);
  drawBricks();
  collisionDetection();
  drawScore(gameInfo.score);
  drawLives(gameInfo.lives);

  if (ball.x + dx > canvas.width - ball.radius || ball.x + dx < ball.radius) {
    dx = -dx;
  }
  if (ball.y + dy < ball.radius) {
    dy = -dy;
  } else if (ball.y + dy > canvas.height - ball.radius) {
    if (ball.x > paddle.x && ball.x < paddle.y + paddle.width) {
      dy = -dy;
    } else {
      gameInfo.lives--;
      if (!gameInfo.lives) {
        finishGame();
      } else {
        resetGame();
      }
    }
  }

  if (rightPressed) {
    paddle.x = Math.min(paddle.x + 7, canvas.width - paddle.width);
  } else if (leftPressed) {
    paddle.x = Math.max(paddle.x - 7, 0);
  }

  ball.x += dx;
  ball.y += dy;

  gameInfo.score === brickRowCount * brickColumnCount &&
    finishGame("YOU WIN, CONGRATULATIONS!");

  loopGame = requestAnimationFrame(draw);
}

const startGame = () => {
  setGameConfig();
  draw();
};

document.getElementById("runButton").addEventListener("click", () => {
  startGame();
  this.disabled = true;
});

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
