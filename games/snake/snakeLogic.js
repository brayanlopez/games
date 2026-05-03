export class GameObject {
  constructor() {
    this.size = 15;
  }

  hit(obj) {
    let dx = Math.abs(this.x - obj.x);
    let dy = Math.abs(this.y - obj.y);
    if (dx >= 0 && dx < this.size && dy >= 0 && dy < this.size) {
      return true;
    } else {
      return false;
    }
  }
}

export class Food extends GameObject {
  constructor() {
    super();
    this.x = Math.floor(Math.random() * 30) * this.size;
    this.y = Math.floor(Math.random() * 30) * this.size;
  }
}

export class Tail extends GameObject {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
  }
}

export class Snake extends GameObject {
  constructor() {
    super();
    this.x = 20;
    this.y = 20;
    this.tail = [];
    this.maxTail = 5;
  }

  grow() {
    this.maxTail++;
  }

  addTail(x, y) {
    this.tail.push(new Tail(x, y));
    if (this.tail.length > this.maxTail) {
      this.tail.shift();
    }
  }

  checkSelfCollision() {
    for (let i = 0; i < this.tail.length; i++) {
      if (this.hit(this.tail[i])) {
        return true;
      }
    }
    return false;
  }

  move(dir) {
    const moves = {
      UP: { x: this.x, y: this.y - this.size },
      DOWN: { x: this.x, y: this.y + this.size },
      LEFT: { x: this.x - this.size, y: this.y },
      RIGHT: { x: this.x + this.size, y: this.y },
    };
    return moves[dir] || { x: this.x, y: this.y };
  }
}
