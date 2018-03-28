let newCanvas = document.createElement('div')
newCanvas.id = "new-canvas"

// let ball = new Ball(420, 100, 5, 2, 0)
// let ball1 = new Ball(800, 20, 5, 20, 1)
let stars = []
let scale = 20
let upDownBalls = []
let leftRightBalls = []
let upDownBlocks = []
let leftRightBlocks = []
let clicked = false
let x1
let y1
let x2
let y2
let makeBlock = false
let makeBall = false
let buttonPress = false
let blockButton;
let ballButton;
let canvasDiv;
let leftRightMargin;
let upDownMargin;
let oscCounter = 1;
let notes = [130.81, 146.83, 164.81, 174.61, 196.00, 220.00, 246.94, 261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25]


var attackLevel = 1.0;
var releaseLevel = 0;

var attackTime = 0.001
var decayTime = 0.5;
var susPercent = 0.2;
var releaseTime = 0.5;



function setup(){
  leftRightMargin = (windowWidth - 1200)/2
  upDownMargin = ((windowHeight - 600)/2) -10
  let leftMargin = (windowWidth * .05) + 400
  let cc = createCanvas(windowWidth, windowHeight)
  background(0)
  newCanvas.innerHTML = `${cc}`

  env1 = new p5.Env();
  env1.setADSR(attackTime, decayTime, susPercent, releaseTime);
  env1.setRange(attackLevel, releaseLevel);

  env2 = new p5.Env();
  env2.setADSR(attackTime, decayTime, susPercent, releaseTime);
  env2.setRange(attackLevel, releaseLevel);

  env3 = new p5.Env();
  env3.setADSR(attackTime, decayTime, susPercent, releaseTime);
  env3.setRange(attackLevel, releaseLevel);

  wave1 = new p5.Oscillator();
  wave1.setType('triangle');
  wave1.start();
  wave1.freq(0);
  wave1.amp(env1);

  wave2 = new p5.Oscillator();
  wave2.setType('triangle');
  wave2.start();
  wave2.freq(0);
  wave2.amp(env2);

  wave3 = new p5.Oscillator();
  wave3.setType('triangle');
  wave3.start();
  wave3.freq(0);
  wave3.amp(env3);

  delay1 = new p5.Delay();
  delay1.process(wave1, .15, .3, 2800);

  delay2 = new p5.Delay();
  delay2.process(wave2, .15, .3, 2800);

  delay3 = new p5.Delay();
  delay3.process(wave3, .15, .3, 2800);

  canvasDiv = createDiv('').size(800, 600);
  canvasDiv.position(leftRightMargin + 400, upDownMargin)
  canvasDiv.mousePressed(divPressed)

  blockButton = createButton('Create Block')
  blockButton.mousePressed(setBlock)
  blockButton.position(leftRightMargin, upDownMargin)

  ballButton = createButton('Create Ball')
  ballButton.mousePressed(setBall)
  ballButton.position(leftRightMargin, upDownMargin + 50)

  //speed

  speedSlider = createSlider(0, 5, 2, 1);
  speedSlider.position(leftRightMargin, upDownMargin + 150);
  speedSlider.style('width', '80px');

  //direction
  directionSlider = createSlider(0, 1, 0, 1);

  directionSlider.position(leftRightMargin, upDownMargin + 200);
  directionSlider.style('width', '80px');

  //note
  noteSlider = createSlider(0, 14, 4, 1);

  noteSlider.position(leftRightMargin, upDownMargin + 250);
  noteSlider.style('width', '80px');
}

function draw(){
  background(0)
  drawGrid()

  textFont('Faster One')
  textSize(32);
  text('Bounce', leftRightMargin, upDownMargin + 500)


  textSize(12);
  fill(6, 229, 20)
  textAlign(LEFT)
  textFont('Source Code Pro')
  text('Speed', leftRightMargin, upDownMargin + 140);

  textAlign(LEFT)
  text('Direction', leftRightMargin, upDownMargin + 190);

  textAlign(LEFT)
  text('Note', leftRightMargin, upDownMargin + 240);

  upDownBlocks.forEach(block => {
    block.show()
  })

  leftRightBlocks.forEach(block => {
    block.show()
  })

  leftRightBalls.forEach(ball => {
    checkCollision(ball)
    ball.show()
    ball.update()
  })

  upDownBalls.forEach(ball => {
    checkCollision(ball)
    ball.show()
    ball.update()
  })

  stars.forEach(star =>{
    star.checkParticles()
    if(star.particles.length === 0){
      stars.splice(stars.indexOf(star), 1)
    }
    star.particles.forEach(particle =>{
      particle.show()
      particle.update()
    })
  })

}

function drawGrid(){
  for(let x = leftRightMargin + 400; x <= width - leftRightMargin; x += scale){
    stroke(255, 50)
    line(x, upDownMargin, x, height-upDownMargin)
  }

  for(let y = upDownMargin; y <= height - upDownMargin; y += scale){
    stroke(255, 50)
    line(leftRightMargin + 400, y, width-leftRightMargin, y)
  }
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

function divPressed(){
  if(buttonPress){
    if (makeBlock){
      if (clicked){
        x1 = mouseX
        y1 = mouseY
        clicked = false
      } else{
        x2 = mouseX
        y2 = mouseY
        if (x1 > x2){
          let newX = x1
          x1 = x2
          x2 = newX
        }
        if (y1 > y2){
          let newY = y1
          y1 = y2
          y2 = newY
        }
        clicked = false
        makeBlock = false
        buttonPress = false
        checkCords(x1, y1, x2, y2)
      }
    }else if(makeBall){
      let x = mouseX
      let y = mouseY
      clicked = false
      makeBall = false
      buttonPress = false
      checkBallCords(x, y)
    }
  }
}

function setBlock(){
  clicked = !clicked
  buttonPress = !buttonPress
  makeBlock = !makeBlock
}

function setBall(){
  clicked = !clicked
  buttonPress = !buttonPress
  makeBall = !makeBall
}

function playNote(num){
  if (num === 1){
    env1.play()
  } else if (num === 2){
    env2.play()
  }
  else if (num === 3){
    env3.play()
  }
}
