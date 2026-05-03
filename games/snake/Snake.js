import { GameObject, Food, Tail, Snake } from "./snakeLogic.js";

/**
 * Codigo correspondiente a lo logica del juego Snake
 *
 * @version 1.1
 *
 * @author Brayan Lopez
 *
 * History
 * 1.1 se mejoro el codigo y la documentacion del mismo.
 * 1.0 se creo el juego con base al tutorial
 * Juego de Snake en Javascript HTML5 Canvas. GioCode.
 * https://www.youtube.com/watch?v=xBVYyto4U5Y
 **/

let velocity = 100;
let snakeSize = 15;

let head = new Snake();
let food = new Food();

let xAxis = true;
let yAxis = true;
let xDirection = 0;
let yDirection = 0;

let playing = true;

let canvas, ctx, score, ctxScore;

const initCanvas = () => {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  score = document.getElementById("score");
  ctxScore = score.getContext("2d");
};

const setGame = () => {
  initCanvas();
  head = new Snake();
  food = new Food();
  playing = true;
  draw();
};

const draw = () => {
  if (!playing) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  ctx.fillStyle = "green";
  ctx.fillRect(head.x, head.y, snakeSize, snakeSize);
  head.tail.forEach((segment) => {
    ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
  });

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, snakeSize, snakeSize);

  // Move snake
  if (xDirection !== 0 || yDirection !== 0) {
    const oldX = head.x;
    const oldY = head.y;

    const newPos = head.move(
      xDirection > 0
        ? "RIGHT"
        : xDirection < 0
          ? "LEFT"
          : yDirection > 0
            ? "DOWN"
            : "UP",
    );
    head.x = newPos.x;
    head.y = newPos.y;

    // Check food collision
    if (head.hit(food)) {
      head.grow();
      food = new Food();
    }

    // Add old position to tail
    head.addTail(oldX, oldY);

    // Check self collision
    if (head.checkSelfCollision()) {
      playing = false;
      alert("Game Over!");
      setGame();
      return;
    }
  }
};

const main = () => {
  draw();
};

window.control = (event) => {
  const key = event.keyCode;
  if (key === 37 && xDirection !== 1) { xDirection = -1; yDirection = 0; }
  if (key === 38 && yDirection !== 1) { xDirection = 0; yDirection = -1; }
  if (key === 39 && xDirection !== -1) { xDirection = 1; yDirection = 0; }
  if (key === 40 && yDirection !== -1) { xDirection = 0; yDirection = 1; }
};

document.addEventListener('keydown', (event) => {
  window.control(event);
});

const startGame = () => {
  setInterval(main, velocity);
};

document.addEventListener("DOMContentLoaded", () => {
  initCanvas();
  setGame();
  startGame();
});
