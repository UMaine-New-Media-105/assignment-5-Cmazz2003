// define Bubble class
class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color(random(255), random(255), random(255));
  }

  move() {
    this.x += random(-5, 5);
    this.y += random(-5, 5);
  }

  checkEdges() {
    if (this.x < -this.r) {
      this.x = width + this.r * 2;
    } else if (this.x > width + this.r) {
      this.x = -this.r;
    }

    if (this.y < -this.r) {
      this.y = height + this.r;
    } else if (this.y > height + this.r) {
      this.y = -this.r;
    }
  }

  update() {
    this.move();
    this.checkEdges();
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.r * 2);
  }
}

let fish;
let bubbles = [];

// define Fish class
class Fish {
  constructor(x, y, scale) {
    this.x = x;
    this.y = y;
    this.scale = scale;
  }

  show() {
    // draw tail
    fill(255, 102, 102); // red
    triangle(this.x - 75 * this.scale, this.y, this.x - 75 * this.scale, this.y + 30 * this.scale, this.x, this.y + 15 * this.scale);

    // draw fins
    triangle(this.x - 10 * this.scale, this.y - 20 * this.scale, this.x - 30 * this.scale, this.y - 40 * this.scale, this.x - 30 * this.scale, this.y); // top fin
    triangle(this.x - 10 * this.scale, this.y + 20 * this.scale, this.x - 30 * this.scale, this.y + 40 * this.scale, this.x - 30 * this.scale, this.y); // bottom fin

    // draw body
    fill(255, 204, 0); // yellow
    ellipse(this.x, this.y, 150 * this.scale, 70 * this.scale);
  }
}

let shark;

// define Shark class
class Shark {
  constructor(x, y, scale) {
    this.x = x;
    this.y = y;
    this.scale = scale;
  }
  show() {
     // body
    fill(170);
    noStroke();
    ellipse(this.x, this.y, 150, 60);

    // head
    fill(170);
    ellipse(this.x - 80, this.y, 70, 70);

    // eye
    fill(255);
    ellipse(this.x - 90, this.y - 10, 20, 20);

    // mouth
    fill(255);
    triangle(this.x - 30, this.y + 10, this.x - 30, this.y + 40, this.x + 30, this.y + 25);

    // tail
    fill(170);
    triangle(this.x + 80, this.y, this.x + 50, this.y - 20, this.x + 50, this.y + 20);}

}

function setup() {
  createCanvas(960, 540);
  x = random(400);
  fish = new Fish(x, 200, 1);
  shark = new Shark(150, 400, 0.4);
 
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(20, 40);
    bubbles.push(new Bubble(x, y, r));
  }
}

function draw() {
  background("royalblue");
  shark.show();
  fish.show();
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].update();
  bubbles[i].show();
  }
  
}
