import { describe, it, expect, vi } from "vitest";
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

describe("Edge Cases and Error Handling", () => {
  describe("GameObject", () => {
    it("should handle exact boundary collision", () => {
      const obj1 = new GameObject();
      obj1.x = 0;
      obj1.y = 0;

      const obj2 = new GameObject();
      obj2.x = 14;
      obj2.y = 14;

      expect(obj1.hit(obj2)).toBe(true);
    });

    it("should not detect collision at exact boundary + 1", () => {
      const obj1 = new GameObject();
      obj1.x = 0;
      obj1.y = 0;

      const obj2 = new GameObject();
      obj2.x = 15;
      obj2.y = 15;

      expect(obj1.hit(obj2)).toBe(false);
    });
  });

  describe("Food", () => {
    it("should generate positions within 0-435 range for 30x15 grid", () => {
      for (let i = 0; i < 100; i++) {
        const food = new Food();
        expect(food.x).toBeGreaterThanOrEqual(0);
        expect(food.x).toBeLessThanOrEqual(435);
        expect(food.y).toBeGreaterThanOrEqual(0);
        expect(food.y).toBeLessThanOrEqual(435);
      }
    });
  });

  describe("Snake", () => {
    it("should handle empty tail in checkSelfCollision", () => {
      const snake = new Snake();
      expect(snake.checkSelfCollision()).toBe(false);
    });

    it("should handle move with invalid direction", () => {
      const snake = new Snake();
      const pos = snake.move("INVALID");
      expect(pos.x).toBe(20);
      expect(pos.y).toBe(20);
    });

    it("should handle multiple grow calls", () => {
      const snake = new Snake();
      snake.grow();
      snake.grow();
      snake.grow();
      expect(snake.maxTail).toBe(8);
    });
  });

  describe("Breakout Logic", () => {
    it("should handle brick collision at edges", () => {
      const ball = { x: 100, y: 100 };
      const brk = { x: 100, y: 100, status: 1, width: 75, height: 20 };
      expect(checkBrickCollision(ball, brk)).toBe(true);
    });

    it("should handle brick collision at right edge", () => {
      const ball = { x: 175, y: 110 };
      const brk = { x: 100, y: 100, status: 1, width: 75, height: 20 };
      expect(checkBrickCollision(ball, brk)).toBe(true);
    });

    it("should handle brick collision at bottom edge", () => {
      const ball = { x: 110, y: 120 };
      const brk = { x: 100, y: 100, status: 1, width: 75, height: 20 };
      expect(checkBrickCollision(ball, brk)).toBe(true);
    });

    it("should create single column brick grid", () => {
      const bricks = createBricks(1, 5);
      expect(bricks.length).toBe(1);
      expect(bricks[0].length).toBe(5);
    });

    it("should create single row brick grid", () => {
      const bricks = createBricks(5, 1);
      expect(bricks.length).toBe(5);
      expect(bricks[0].length).toBe(1);
    });
  });
});
