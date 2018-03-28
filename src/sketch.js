let newCanvas = document.createElement('div')
newCanvas.id = "new-canvas"

let stars = []
let upDownBalls = []
let leftRightBalls = []
let upDownBlocks = []
let leftRightBlocks = []
let notes = [130.81, 146.83, 164.81, 174.61, 196.00, 220.00, 246.94, 261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25]
let scale = 20
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

function setup(){
  leftRightMargin = roundTo((windowWidth - 940)/2)
  upDownMargin = roundTo((windowHeight - 640)/2)
  console.log(leftRightMargin)
  console.log(upDownMargin)
  let leftMargin = (1600 * .05) + 300
  let cc = createCanvas(windowWidth, windowHeight)
  background(0)
  newCanvas.innerHTML = `${cc}`

  soundSetup()

  canvasDiv = createDiv('').size(640, 640);
  canvasDiv.position(leftRightMargin + 300, upDownMargin)
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
