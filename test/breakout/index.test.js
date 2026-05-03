import { describe, it, expect, beforeEach } from "vitest";
import { GameObject, Food, Tail, Snake } from "../../games/snake/snakeLogic.js";
import {
  gameSettings,
  createGameInfo,
  createBall,
  createPaddle,
  brick,
  createBricks,
  checkBrickCollision,
} from "../../games/breakout/gameLogic.mjs";

describe("Comprehensive Game Coverage", () => {
  describe("GameObject Class", () => {
    it("should initialize with correct size", () => {
      const obj = new GameObject();
      expect(obj.size).toBe(15);
    });

    it("should detect hit when overlapping", () => {
      const obj1 = new GameObject();
      obj1.x = 10;
      obj1.y = 10;
      const obj2 = new GameObject();
      obj2.x = 20;
      obj2.y = 20;
      expect(obj1.hit(obj2)).toBe(true);
    });

    it("should not detect hit when far apart", () => {
      const obj1 = new GameObject();
      obj1.x = 10;
      obj1.y = 10;
      const obj2 = new GameObject();
      obj2.x = 100;
      obj2.y = 100;
      expect(obj1.hit(obj2)).toBe(false);
    });
  });

  describe("Food Class", () => {
    it("should create food within grid", () => {
      const food = new Food();
      expect(food.x % 15).toBe(0);
      expect(food.y % 15).toBe(0);
    });

    it("should inherit from GameObject", () => {
      const food = new Food();
      expect(food instanceof GameObject).toBe(true);
    });
  });

  describe("Tail Class", () => {
    it("should create tail with position", () => {
      const tail = new Tail(45, 60);
      expect(tail.x).toBe(45);
      expect(tail.y).toBe(60);
    });
  });

  describe("Snake Class", () => {
    let snake;

    beforeEach(() => {
      snake = new Snake();
    });

    it("should initialize with correct position", () => {
      expect(snake.x).toBe(20);
      expect(snake.y).toBe(20);
    });

    it("should grow correctly", () => {
      snake.grow();
      expect(snake.maxTail).toBe(6);
    });

    it("should add tail segments", () => {
      snake.addTail(35, 20);
      expect(snake.tail.length).toBe(1);
      expect(snake.tail[0].x).toBe(35);
    });

    it("should limit tail size", () => {
      snake.maxTail = 2;
      snake.addTail(35, 20);
      snake.addTail(50, 20);
      snake.addTail(65, 20);
      expect(snake.tail.length).toBe(2);
    });

    it("should check self collision", () => {
      snake.x = 20;
      snake.y = 20;
      snake.addTail(20, 20);
      expect(snake.checkSelfCollision()).toBe(true);
    });

    it("should move in all directions", () => {
      const directions = ["UP", "DOWN", "LEFT", "RIGHT"];
      const expected = [
        { x: 20, y: 5 },
        { x: 20, y: 35 },
        { x: 5, y: 20 },
        { x: 35, y: 20 },
      ];

      directions.forEach((dir, i) => {
        const pos = snake.move(dir);
        expect(pos).toEqual(expected[i]);
      });
    });
  });

  describe("Breakout Game Logic", () => {
    it("should have correct game settings", () => {
      expect(gameSettings.generalColor).toBe("#0095DD");
      expect(gameSettings.font).toBe("16px Arial");
    });

    it("should create game info with defaults", () => {
      const info = createGameInfo();
      expect(info.lives).toBe(3);
      expect(info.score).toBe(0);
    });

    it("should create ball at correct position", () => {
      const canvas = { width: 480, height: 320 };
      const ball = createBall(canvas);
      expect(ball.x).toBe(240);
      expect(ball.y).toBe(290);
    });

    it("should create paddle correctly", () => {
      const canvas = { width: 480, height: 320 };
      const paddle = createPaddle(canvas);
      expect(paddle.y).toBe(310);
    });

    it("should create brick grid", () => {
      const bricks = createBricks(5, 3);
      expect(bricks.length).toBe(5);
      expect(bricks[0].length).toBe(3);
    });

    it("should detect brick collision correctly", () => {
      const ball = { x: 110, y: 110 };
      const brk = { x: 100, y: 100, status: 1, width: 75, height: 20 };
      expect(checkBrickCollision(ball, brk)).toBe(true);
    });
  });
});
