import { describe, it, expect } from "vitest";
import { GameObject, Food, Tail, Snake } from "../../games/snake/snakeLogic.js";

describe("Snake Logic Module", () => {
  it("should export GameObject class", () => {
    const obj = new GameObject();
    expect(obj.size).toBe(15);
  });

  it("should detect collision with GameObject.hit", () => {
    const obj1 = new GameObject();
    obj1.x = 10;
    obj1.y = 10;

    const obj2 = new GameObject();
    obj2.x = 12;
    obj2.y = 12;

    expect(obj1.hit(obj2)).toBe(true);
  });

  it("should create Food with valid position", () => {
    const food = new Food();
    expect(food.x % 15).toBe(0);
    expect(food.y % 15).toBe(0);
    expect(food.size).toBe(15);
  });

  it("should create Tail with position", () => {
    const tail = new Tail(50, 50);
    expect(tail.x).toBe(50);
    expect(tail.y).toBe(50);
  });

  it("should create Snake with initial values", () => {
    const snake = new Snake();
    expect(snake.x).toBe(20);
    expect(snake.y).toBe(20);
    expect(snake.maxTail).toBe(5);
    expect(snake.tail.length).toBe(0);
  });

  it("should grow snake maxTail", () => {
    const snake = new Snake();
    snake.grow();
    expect(snake.maxTail).toBe(6);
  });

  it("should add tail segments", () => {
    const snake = new Snake();
    snake.addTail(20, 20);
    expect(snake.tail.length).toBe(1);
  });

  it("should limit tail to maxTail", () => {
    const snake = new Snake();
    snake.maxTail = 2;

    snake.addTail(20, 20);
    snake.addTail(35, 20);
    snake.addTail(50, 20);

    expect(snake.tail.length).toBe(2);
  });

  it("should detect self collision", () => {
    const snake = new Snake();
    snake.x = 20;
    snake.y = 20;
    snake.addTail(20, 20);
    expect(snake.checkSelfCollision()).toBe(true);
  });

  it("should move snake in direction", () => {
    const snake = new Snake();
    const pos = snake.move("RIGHT");
    expect(pos.x).toBe(35);
    expect(pos.y).toBe(20);
  });
});
