class Ball{
  constructor(x, y, radius, speed, direction){
    this.x = x
    this.y = y
    this.radius = radius
    this.speed = speed
    this.direction = direction
    let note = notes[noteSel.value()]
    let waveType = waveSel.value()
    let delayTime = delaySlider.value()
    let releaseTime = releaseSlider.value()
    this.sound = createSound(note, waveType, delayTime, releaseTime)
  }

  show(){
    noStroke()
    fill(255)
    ellipse(this.x, this.y, this.radius)
  }

  update(){
    if (this.direction === 0){
      this.x += this.speed
    } else if (this.direction === 1){
      this.y += this.speed
    }
  }
}

function checkBallCords(x, y){
  let direction
  if (mouseX <=570 && mouseX >= 560){
    x = 580
  }else{
    x = roundTo(x)
  }
  if (mouseY <=70 && mouseY >= 60){
    y = 80
  }else{
    y = roundTo(y)
  }
  let speed = setSpeed(speedSlider.value())
  if(directionSelect.value() === 'Left to Right'){
    direction = 0
  }else{
    direction = 1
  }
  // let direction = directionSelect.value()
  let ball = new Ball(x, y, 5, speed, direction)
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
        ball.sound.env.play()
    }
  })
     if (ball.x === leftRightMargin + panelWidth || ball.x === leftRightMargin + panelWidth + 640 ){
      ball.speed = -ball.speed
      let star = new Star(ball.x, ball.y)
      star.createParticles()
      stars.push(star)
      ball.sound.env.play()
    }
  } else{
    upDownBlocks.forEach(block => {
      if (block.y1 === ball.y && ball.x >= block.x1 && ball.x <= block.x2){
        ball.speed = -ball.speed
        let star = new Star(ball.x, ball.y)
        star.createParticles()
        stars.push(star)
        ball.sound.env.play()
      }
    })
    if (ball.y === upDownMargin || ball.y === upDownMargin + 640){
      ball.speed = -ball.speed
      let star = new Star(ball.x, ball.y)
      star.createParticles()
      stars.push(star)
      ball.sound.env.play()
    }
  }
}
