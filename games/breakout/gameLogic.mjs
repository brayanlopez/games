export const gameSettings = {
  generalColor: "#0095DD",
  font: "16px Arial",
};

export const createGameInfo = () => ({
  lives: 3,
  score: 0,
  status: "IN_PROGRESS",
});

export const createBall = (canvas) => ({
  x: canvas.width / 2,
  y: canvas.height - 30,
  radius: 10,
});

export const createPaddle = (canvas) => ({
  height: 10,
  width: 75,
  x: (canvas.width - 75) / 2,
  y: canvas.height - 10,
});

export const brick = () => ({ x: 0, y: 0, status: 1, width: 75, height: 20 });

export const createBricks = (columns, rows) => {
  const bricks = [];
  for (let c = 0; c < columns; c++) {
    bricks[c] = [];
    for (let r = 0; r < rows; r++) {
      bricks[c][r] = brick();
    }
  }
  return bricks;
};

export const checkBrickCollision = (ball, brick) => {
  return (
    ball.x >= brick.x &&
    ball.x <= brick.x + brick.width &&
    ball.y >= brick.y &&
    ball.y <= brick.y + brick.height &&
    brick.status === 1
  );
};
