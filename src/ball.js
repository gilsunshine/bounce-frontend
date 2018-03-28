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

function checkCollision(ball){

  if (ball.direction === 0){
    leftRightBlocks.forEach(block => {
      if (block.x1 === ball.x && ball.y >= block.y1 && ball.y <= block.y2){
        ball.speed = -ball.speed
        let star = new Star(ball.x, ball.y)
        star.createParticles()
        stars.push(star)
        if (oscCounter % 3 === 0){
          wave1.freq(ball.note)
          playNote(1)
          oscCounter++
        } else if (oscCounter % 3 === 1 ){
          wave2.freq(ball.note)
          playNote(2)
          oscCounter++
        } else{
          wave3.freq(ball.note)
          playNote(3)
          oscCounter++
        }
      }
    })
    if (ball.x === leftRightMargin + 400 || ball.x === leftRightMargin + 1200 ){
      ball.speed = -ball.speed
      let star = new Star(ball.x, ball.y)
      star.createParticles()
      stars.push(star)
      if (oscCounter % 3 === 0){
        wave1.freq(ball.note)
        playNote(1)
        oscCounter++
      } else if (oscCounter % 3 === 1 ){
        wave2.freq(ball.note)
        playNote(2)
        oscCounter++
      } else{
        wave3.freq(ball.note)
        playNote(3)
        oscCounter++
      }
    }
  } else{
    upDownBlocks.forEach(block => {
      if (block.y1 === ball.y && ball.x >= block.x1 && ball.x <= block.x2){
        ball.speed = -ball.speed
        let star = new Star(ball.x, ball.y)
        star.createParticles()
        stars.push(star)
        if (oscCounter % 3 === 0){
          wave1.freq(ball.note)
          playNote(1)
          oscCounter++
        } else if (oscCounter % 3 === 1 ){
          wave2.freq(ball.note)
          playNote(2)
          oscCounter++
        } else{
          wave3.freq(ball.note)
          playNote(3)
          oscCounter++
        }
      }
    })
    if (ball.y === upDownMargin || ball.y === height - upDownMargin){
      ball.speed = -ball.speed
      let star = new Star(ball.x, ball.y)
      star.createParticles()
      stars.push(star)
      if (oscCounter % 3 === 0){
        wave1.freq(ball.note)
        playNote(1)
        oscCounter++
      } else if (oscCounter % 3 === 1 ){
        wave2.freq(ball.note)
        playNote(2)
        oscCounter++
      } else{
        wave3.freq(ball.note)
        playNote(3)
        oscCounter++
      }
    }
  }
}
