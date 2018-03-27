class Particle{
  constructor(x, y, radius, direction){
    this.x = x
    this.y = y
    this.r = random(0, 255)
    this.g = random(0, 255)
    this.b = random(0, 255)
    this.alpha = 255
    this.direction = random(0, 2 * PI)
    this.radius = radius
    this.xSpeed = random(-5, 5)
    this.ySpeed = random(-5, 5)
    this.acceleration = 2
    this.alphaDecrease = 5
  }

  show(){
    noStroke()
    fill(this.r, this.g, this.b, this.alpha)
    ellipse(this.x, this.y, this.radius)
  }

  update(){
    console.log(this.direction)
    push()
    rotate(this.direction)
    this.x += this.xSpeed
    this.y += this.ySpeed
    pop()
    this.alpha -= this.alphaDecrease
    if (this.xSpeed > 4){
      this.xSpeed -= this.acceleration
    }
    if (this.ySpeed > 4){
      this.ySpeed -= this.acceleration
    }
  }
}
