let bubbles = [];

function setup() {
  createCanvas(960, 540);
  for (let i = 0; i < 50; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(10,40);
    bubbles[i] = new Bubble(x, y, r);
  }
}

function draw() {
  background("black");
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
  }
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }

  show() {
    stroke("white");
    strokeWeight(4);
    noFill();
    ellipse(this.x, this.y, this.r * 2);
  }
}
