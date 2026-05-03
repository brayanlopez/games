import { describe, it, expect, beforeEach } from "vitest";
import { GameObject, Food, Tail, Snake } from "../../games/snake/snakeLogic.js";

describe("Snake Game Integration", () => {
  let head, food;

  beforeEach(() => {
    head = new Snake();
    food = new Food();
  });

  it("should initialize game objects", () => {
    expect(head.x).toBe(20);
    expect(head.y).toBe(20);
    expect(food instanceof Food).toBe(true);
  });

  it("should handle control inputs", () => {
    const control = (keyCode) => {
      let xDirection = 0,
        yDirection = 0;
      if (keyCode === 37) {
        xDirection = -1;
        yDirection = 0;
      }
      if (keyCode === 38) {
        xDirection = 0;
        yDirection = -1;
      }
      if (keyCode === 39) {
        xDirection = 1;
        yDirection = 0;
      }
      if (keyCode === 40) {
        xDirection = 0;
        yDirection = 1;
      }
      return { xDirection, yDirection };
    };

    expect(control(37).xDirection).toBe(-1);
    expect(control(38).yDirection).toBe(-1);
    expect(control(39).xDirection).toBe(1);
    expect(control(40).yDirection).toBe(1);
  });

  it("should detect food collision and grow", () => {
    head.x = 20;
    head.y = 20;
    food.x = 20;
    food.y = 20;

    if (head.hit(food)) {
      head.grow();
      food = new Food();
    }

    expect(head.maxTail).toBe(6);
  });

  it("should add tail on movement", () => {
    const newPos = head.move("RIGHT");
    head.addTail(newPos.x, newPos.y);

    expect(head.tail.length).toBe(1);
    expect(head.tail[0].x).toBe(35);
  });

  it("should detect game over on self collision", () => {
    head.x = 20;
    head.y = 20;
    head.addTail(20, 20);

    expect(head.checkSelfCollision()).toBe(true);
  });
});
