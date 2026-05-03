import { describe, it, expect } from 'vitest';
import { Snake } from '../../games/snake/snakeLogic.js';

describe('Snake Logic Branch Coverage', () => {
  it('should return false when no self collision', () => {
    const snake = new Snake();
    snake.x = 100;
    snake.y = 100;
    snake.addTail(20, 20);
    expect(snake.checkSelfCollision()).toBe(false);
  });

  it('should return true on self collision', () => {
    const snake = new Snake();
    snake.x = 20;
    snake.y = 20;
    snake.addTail(20, 20);
    expect(snake.checkSelfCollision()).toBe(true);
  });

  it('should handle move with valid directions', () => {
    const snake = new Snake();

    expect(snake.move('UP')).toEqual({ x: 20, y: 5 });
    expect(snake.move('DOWN')).toEqual({ x: 20, y: 35 });
    expect(snake.move('LEFT')).toEqual({ x: 5, y: 20 });
    expect(snake.move('RIGHT')).toEqual({ x: 35, y: 20 });
  });

  it('should return current position for invalid direction', () => {
    const snake = new Snake();
    expect(snake.move('INVALID')).toEqual({ x: 20, y: 20 });
  });

  it('should handle empty tail in addTail', () => {
    const snake = new Snake();
    snake.maxTail = 2;
    snake.addTail(35, 20);
    expect(snake.tail.length).toBe(1);
  });
});
