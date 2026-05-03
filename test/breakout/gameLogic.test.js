import { describe, it, expect } from "vitest";
import {
  gameSettings,
  createGameInfo,
  createBall,
  createPaddle,
  brick,
  createBricks,
  checkBrickCollision,
} from "../../games/breakout/gameLogic.mjs";

describe("Breakout Game Logic Module", () => {
  it("should export game settings", () => {
    expect(gameSettings.generalColor).toBe("#0095DD");
    expect(gameSettings.font).toBe("16px Arial");
  });

  it("should create game info", () => {
    const info = createGameInfo();
    expect(info.lives).toBe(3);
    expect(info.score).toBe(0);
    expect(info.status).toBe("IN_PROGRESS");
  });

  it("should create ball with canvas dimensions", () => {
    const canvas = { width: 480, height: 320 };
    const ball = createBall(canvas);
    expect(ball.x).toBe(240);
    expect(ball.y).toBe(290);
    expect(ball.radius).toBe(10);
  });

  it("should create paddle positioned at bottom center", () => {
    const canvas = { width: 480, height: 320 };
    const paddle = createPaddle(canvas);
    expect(paddle.x).toBe(202.5);
    expect(paddle.y).toBe(310);
    expect(paddle.width).toBe(75);
    expect(paddle.height).toBe(10);
  });

  it("should create brick with default properties", () => {
    const b = brick();
    expect(b.status).toBe(1);
    expect(b.width).toBe(75);
    expect(b.height).toBe(20);
  });

  it("should create bricks grid", () => {
    const bricks = createBricks(5, 3);
    expect(bricks.length).toBe(5);
    expect(bricks[0].length).toBe(3);
  });

  it("should detect brick collision", () => {
    const ball = { x: 110, y: 110, radius: 10 };
    const brick = { x: 100, y: 100, status: 1, width: 75, height: 20 };
    expect(checkBrickCollision(ball, brick)).toBe(true);
  });

  it("should not detect collision with inactive brick", () => {
    const ball = { x: 110, y: 110, radius: 10 };
    const brick = { x: 100, y: 100, status: 0, width: 75, height: 20 };
    expect(checkBrickCollision(ball, brick)).toBe(false);
  });
});
