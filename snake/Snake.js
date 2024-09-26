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

// global variables

/**
 * @description Game velocity, if it´s smaller the game will be faster
 */
let velocity = 100;
let snakeSize = 15;

/**
 * @class GameObject
 * @description base class for others
 */
class GameObject {
  constructor() {
    this.size = snakeSize;
  }

  hit(obj) {
    let dx = Math.abs(this.x - obj.x);
    let dy = Math.abs(this.y - obj.y);
    if (dx >= 0 && dx < snakeSize && dy >= 0 && dy < snakeSize) {
      return true;
    } else {
      return false;
    }
  }
}

/**
 * @class Cola
 * @description represent the tail of the object
 * @extends Object
 */
class Tail extends GameObject {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.next = null;
  }

  draw(ctx) {
    if (this.next !== null) {
      this.next.draw(ctx);
    }
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  setPos(x, y) {
    if (this.next !== null) {
      this.next.setPos(this.x, this.y);
    }
    this.x = x;
    this.y = y;
  }

  push() {
    if (this.next === null) {
      this.next = new Tail(this.x, this.y);
    } else {
      this.next.push();
    }
  }

  getNext() {
    return this.next;
  }
}

/**
 * @class Food
 * @description represent the food for the snake
 * */
class Food extends GameObject {
  constructor() {
    super();
    this.x = this.generate();
    this.y = this.generate();
  }

  generate() {
    return Math.floor(Math.random() * 59) * 10;
  }

  put() {
    this.x = this.generate();
    this.y = this.generate();
  }

  draw(ctx, color = "red") {
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

/**
 * @class Game
 * @description Represent game´s logic
 * */
class Game {
  constructor() {
    this.score = 0;
  }

  increaseScore() {
    this.score += 1;
  }

  resetScore() {
    this.score = 0;
  }

  getScore() {
    return this.score;
  }
}

const movement = () => {
  let nx = head.x + xDirection;
  let ny = head.y + yDirection;
  head.setPos(nx, ny);
};

/**
 * @description Control the snake
 * @param {event} event
 * */
function control(event) {
  let cod = event.keyCode;
  if (cod === 13) {
    playing = true;
  }
  if (xAxis) {
    if (cod === 38) {
      yDirection = -snakeSize;
      xDirection = 0;
      xAxis = false;
      yAxis = true;
    }
    if (cod === 40) {
      yDirection = snakeSize;
      xDirection = 0;
      xAxis = false;
      yAxis = true;
    }
  }
  if (yAxis) {
    if (cod === 37) {
      yDirection = 0;
      xDirection = -snakeSize;
      yAxis = false;
      xAxis = true;
    }
    if (cod === 39) {
      yDirection = 0;
      xDirection = snakeSize;
      yAxis = false;
      xAxis = true;
    }
  }
}
/**
 * @function finishGame
 * @description it´s executed when the game is finished
 */
function finishGame() {
  xDirection = 0;
  yDirection = 0;
  xAxis = true;
  yAxis = true;

  head = new Tail(20, 20);
  food = new Food();
  //alert("Perdiste " + "Puntaje: " + gestor.getPuntaje());

  manager.resetScore();
}

/**
 * @function hitWall
 * @description check when the snake hit the wall
 */
function hitWall() {
  let canvas = document.getElementById("canvas");
  if (
    head.x < 0 ||
    head.x > canvas.width - 10 ||
    head.y < 0 ||
    head.y > canvas.height - 10
  ) {
    playing = false;
    finishGame();
  }
}

/**
 * @function hitBody
 * @description check when the snake hit its own body
 */
function hitBody() {
  let temp = null;
  try {
    temp = head.getNext().getNext();
  } catch (err) {
    temp = null;
  }
  while (temp !== null) {
    if (head.hit(temp)) {
      playing = false;
      finishGame();
    } else {
      temp = temp.getNext();
    }
  }
}

/**
 * @function
 * @description draw the snake
 */
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctxScore.clearRect(0, 0, score.width, score.height);
  ctxScore.font = "30px Arial";
  ctx.font = "30px Arial";

  if (!playing) {
    ctx.fillText(
      "perdiste, oprimer enter",
      canvas.width / 4,
      canvas.height / 2
    );
  }
  ctxScore.fillText(manager.getScore(), 10, 50);
  // here goes all the code for drawing
  head.draw(ctx);
  food.draw(ctx, "green");
}

const setGame = () => {};

/**
 * @function main
 */
function main() {
  if (playing) {
    hitBody();
    hitWall();
    draw();
    movement();
    if (head.hit(food)) {
      manager.increaseScore();
      food.put();
      head.push();
    }
  }
}

startGame = () => {
  setInterval("main()", velocity);
};

// Game Objects: must be global
let manager = new Game();
let head = new Tail(20, 20);
let food = new Food();

let xAxis = true;
let yAxis = true;
let xDirection = 0;
let yDirection = 0;

let playing = true;

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let score = document.getElementById("score");
let ctxScore = score.getContext("2d");

setGame();
startGame();
