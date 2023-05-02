// define Shark class
class Shark {
  constructor(x, y, scale, speed) {
    this.x = x;
    this.y = y;
    this.size = scale;
    this.speed = speed;
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
  
  update(sharks) {
    // Move the shark horizontally
    this.x += this.speed;

    // Check if the shark has hit the left or right wall
    if (this.x < 0 || this.x > width) {
      // Reverse the horizontal direction
      this.speed *= -1;
    }

    // Check for collisions with other creatures
    for (let i = 0; i < sharks.length; i++) {
      // Don't check for collision with self
      if (sharks[i] === this) continue;
      }
    }}
  
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

   update() {
    this.move();
    this.checkEdges();
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.r * 2);
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
}

let shark;
let bubbles = [];
let fish = [];


// define Fish class
class Fish {
  constructor(x, y, scale) {
    this.x = x;
    this.y = y;
    this.size = scale;
  }

  show() {
    // draw tail
    fill(255, 102, 102); // red
    triangle(this.x - 75 * this.size, this.y, this.x - 75 * this.size, this.y + 30 * this.size, this.x, this.y + 15 * this.size);

    // draw fins
    triangle(this.x - 10 * this.size, this.y - 20 * this.size, this.x - 30 * this.size, this.y - 40 * this.size, this.x - 30 * this.size, this.y); // top fin
    triangle(this.x - 10 * this.size, this.y + 20 * this.size, this.x - 30 * this.size, this.y + 40 * this.szie, this.x - 30 * this.size, this.y); // bottom fin

    // draw body
    fill(255, 204, 0); // yellow
    ellipse(this.x, this.y, 150 * this.size, 70 * this.size);
  }

}
let sharks = [];

function setup() {
  createCanvas(960, 540);
  for (let i = 0; i < 2; i++) {
    let x = random(width);
  let y = random(height - 200);
    let scale = random(0.1, 0.3);
    let speed = random(1, 10);
  sharks.push(new Shark(x, 325, scale, speed));
    bubbles.push(new Bubble(x, y, scale));
 
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(20, 40);
    bubbles.push(new Bubble(x, y, r));
  }
}}

function draw() {
  background("royalblue");
  
  // Check for collisions between creatures
  for (let i = 0; i < sharks.length; i++) {
    sharks[i].show();
}
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].update();
  bubbles[i].show();
  }

  for (let i = 0; i < fish.length; i++) {
    fish[i].show();
  }

// Check for collisions between creatures
  for (let i = 0; i < sharks.length; i++) {
    sharks[i].update(sharks);
}}
