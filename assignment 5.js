let sharks = [];
let bubbles = [];
let fish = [];

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
      triangle(
        this.x - 30,
        this.y + 10,
        this.x - 30,
        this.y + 40,
        this.x + 30,
        this.y + 25
      );

      // tail
      fill(170);
      triangle(
        this.x + 80,
        this.y,
        this.x + 50,
        this.y - 20,
        this.x + 50,
        this.y + 20
      );
    }

    update(sharks) {
      // Move the shark horizontally
      this.x += this.speed;

      // Check if the shark has hit the left or right wall
      if (this.x < 0 || this.x > width) {
        // Reverse the horizontal direction
        this.speed *= -1;
      }
    }
  }

  Shark.createSharks = function (num) {
    let sharks = [];
    for (let i = 0; i < num; i++) {
      sharks.push(
        new Shark(
          random(canvas.width),
          random(canvas.height),
          random(10, 50),
          random(-5, 5)
        )
      );
    }
    return sharks;
  };

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

  // define Fish class
  class Fish {
  constructor(x, y, scale, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = scale;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  show() {
    // draw tail
    fill(255, 102, 102); // red
    triangle(
      this.x - 75 * this.size,
      this.y,
      this.x - 75 * this.size,
      this.y + 30 * this.size,
      this.x,
      this.y + 15 * this.size
    );

    // draw fins
    triangle(
      this.x - 10 * this.size,
      this.y - 20 * this.size,
      this.x - 30 * this.size,
      this.y - 40 * this.size,
      this.x - 30 * this.size,
      this.y
    ); // top fin
    triangle(
      this.x - 10 * this.size,
      this.y + 20 * this.size,
      this.x - 30 * this.size,
      this.y + 40 * this.size,
      this.x - 30 * this.size,
      this.y
    ); // bottom fin

    // draw body
    fill(255, 204, 0); // yellow
    ellipse(this.x, this.y, 150 * this.size, 70 * this.size);
  }

  checkCollisions(sharks){
    for (let i = 0; i < sharks.length; i++) {
      let d = dist(this.x, this.y, sharks[i].x, sharks[i].y);
      let combinedR = this.size / 2 + sharks[i].size / 2;
      if (d < combinedR) {
        sharks.splice(i, 1);
        return true;
      }
    }
    return false;
  }
  update(fish, sharks){
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.checkCollisions(sharks)) {
      fish.splice(fish.indexOf(this), 1);
      return;
    }

    for (let j = 0; j < fish.length; j++) {
      // Don't check for collision with self
      if (fish[j] === this) continue;

      let d = dist(this.x, this.y, fish[j].x, fish[j].y);
      let combinedR = this.size / 2 + fish[j].size / 2;

      if (d < combinedR) {
        // Create a new fish te same location
        let newFish = new Fish(this.x, this.y, random(5, 10), random(-2, 2), random(-2, 2));
        fish.push(newFish);
      }
    }

    // Check if the fish has hit the left or right wall
    if (this.x < 0 || this.x > width) {
      // Reverse the horizontal direction
      this.speedX *= -1;
    }

    // Check if the fish has hit the top or bottom wall
    if (this.y < 0 || this.y > height) {
      // Reverse the vertical direction
      this.speedY *= -1;
  }}}

function setup() {
  createCanvas(960, 540);
  
   // Create 5 sharks
  sharks = Shark.createSharks(5);
  
  // Create a new bubble with a random position and size
  bubbles.push(new Bubble(random(width), random(height), 50));
  
  // Create 10 fish with random positions, speeds, and directions
  fish = [];
  for (let i = 0; i < 10; i++) {
    let newFish = new Fish(random(width), random(height), random(5, 10), random(-2, 2), random(-2,2));
    fish.push(newFish);
  }
}
  
function draw() {
  background("royalblue");

  // Draw 
  for (let i = 0; i < sharks.length; i++) {
    sharks[i].update();
    sharks[i].show(sharks);
  }

  // Draw bubbles
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].update();
    bubbles[i].show(fish,sharks);
  }

  // Draw fish
    for (let i = 0; i < fish.length; i++) {
    // Move the fish
    fish[i].update();
    fish[i].show();
  }
}
