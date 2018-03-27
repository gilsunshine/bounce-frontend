class Ball{
  constructor(x, y, radius, speed, direction, note){
    this.x = x
    this.y = y
    this.radius = radius
    this.speed = speed
    this.direction = direction
    this.note = note
  }

  show(){

    noStroke()
    fill(255)
    ellipse(this.x, this.y, this.radius)
  }

  update(){
    if (this.direction === 0){
      this.x += this.speed
    }else if (this.direction === 1){
      this.y += this.speed
    }
  }
}

function checkBallCords(x, y){
  x = roundTo(x)
  y = roundTo(y)
  let speed = setSpeed(speedSlider.value())
  let direction = directionSlider.value()
  let note = setNote(noteSlider.value())
  let ball = new Ball(x, y, 5, speed, direction, note)
  if (direction === 0){
    leftRightBalls.push(ball)
  } else{
    upDownBalls.push(ball)
  }
}

function setSpeed(num) {
  if (num === 0) {
    num = 1
  } else if (num === 1) {
    num = 2
  } else if (num === 2) {
    num = 4
  } else if (num === 3) {
    num = 5
  } else if (num === 4) {
    num = 10
  } else if (num === 5) {
    num = 20
  }
  return num
}

function setNote(num){
  let freq = notes[num]
  return freq
}
