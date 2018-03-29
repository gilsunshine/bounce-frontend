let newCanvas = document.createElement('div')
newCanvas.id = "new-canvas"

let stars = []
let upDownBalls = []
let leftRightBalls = []
let upDownBlocks = []
let leftRightBlocks = []

let scale
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
let oscCounter = 1
let divSize
let controllerDiv
let panelWidth = 300
let fft
let xspacing = 1
let w = 280
let theta = 0.0
let amp
let period = 100
let dx
let yvalues

let xspacing1 = 1
let w1 = 280
let theta1 = 0.0
let amp1
let period1 = 100
let dx1
let yvalues1


function setup(){
  fft = new p5.FFT()
  scale = 20
  divSize = scale * 32
  leftRightMargin = roundTo((windowWidth - (divSize + panelWidth))/2)
  upDownMargin = roundTo((windowHeight - divSize)/2)
  let leftMargin = (1600 * .05) + panelWidth
  let cc = createCanvas(windowWidth, windowHeight)
  cc.position(0, 0)
  background(0)
  newCanvas.innerHTML = `${cc}`
  createLayout()
  dx = (TWO_PI/ period) * xspacing
  yvalues = new Array(floor(w/xspacing))
  dx1 = (TWO_PI/ period1) * xspacing1
  yvalues1 = new Array(floor(w1/xspacing1))
}

function draw(){
  background(0)
  console.log(yvalues.length)
  let spectrum = fft.waveform(32)
  spectrum = spectrum.slice(0, 15)
  amp = Math.abs(spectrum[8])* 80
  amp1 = Math.abs(spectrum[8])* 80

  noStroke()
  fill(40)
  rect(leftRightMargin, upDownMargin + 440, 280, 200)
  calcWave(amp)
  calcWave1(amp1)
  renderWave()
  renderWave1()
  fill(50)
  noStroke()

  drawGrid()
  strokeWeight(0)
  textSize(12);
  fill(0, 255, 0)
  textAlign(LEFT)
  textFont('Source Code Pro')
  text('Speed', leftRightMargin, upDownMargin + 135);

  textAlign(LEFT)
  text('Direction', leftRightMargin, upDownMargin + 180);

  textAlign(LEFT)
  text('Note', leftRightMargin, upDownMargin + 230);

  textAlign(LEFT)
  text('Wave Type', leftRightMargin, upDownMargin + 280);

  textAlign(LEFT)
  text('Delay Time', leftRightMargin, upDownMargin + 330);

  textAlign(LEFT)
  text('Release Time', leftRightMargin, upDownMargin + 380);
  strokeWeight(1)

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

function divPressed(){
  console.log('hello')
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

function calcWave(amp) {
  theta += 0.1;
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x)*amp;
    x+=dx;
  }
}

function renderWave() {
  for (let x = 0; x < yvalues.length; x++) {
    // stroke(17, 240, 0, 255)
    // stroke(255, 115, 35, 255)
    // stroke(255, 50, 100, 255)
    stroke(240, 255, 0, 255)
    line(x + leftRightMargin, yvalues[x] + upDownMargin + 540, x + leftRightMargin, upDownMargin + 640)
  }
}

function calcWave1(amp) {
  theta1 += 0.2;
  let x = theta1;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues1[i] = sin(x)*amp1;
    x+=dx1;
  }
}

function renderWave1() {
  for (let x = 0; x < yvalues1.length; x++) {
    // stroke(145, 255, 5, 127)
    // stroke(30, 115, 255, 127)
    stroke(0, 100, 255, 200)
    line(x + leftRightMargin, yvalues1[x] + upDownMargin + 540, x + leftRightMargin, upDownMargin + 640)
  }
}
