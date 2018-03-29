function drawGrid(){
  let xCounter = 0
  let yCounter = 0
  for(let x = leftRightMargin + panelWidth; x <= leftRightMargin + panelWidth + divSize; x += scale){
    if (xCounter % 4 === 0){
      stroke(255, 100)
      line(x, upDownMargin, x, upDownMargin + divSize)
    } else{
      stroke(255, 50)
      line(x, upDownMargin, x, upDownMargin + divSize)
    }
    xCounter++
  }

  for(let y = upDownMargin; y <= upDownMargin + divSize + 1; y += scale){
    if (yCounter % 4 === 0){
      stroke(255, 100)
      line(leftRightMargin + panelWidth, y, leftRightMargin + panelWidth + divSize, y)
    }else{
      stroke(255, 50)
      line(leftRightMargin + panelWidth, y, leftRightMargin + panelWidth + divSize, y)
    }
    yCounter++
  }
}

function createLayout(){
  canvasDiv = createDiv('').size(divSize, divSize);
  canvasDiv.position(leftRightMargin + panelWidth, upDownMargin)
  canvasDiv.mousePressed(divPressed)

  blockButton = createButton('Create Block')
  blockButton.size(100, 18)
  blockButton.style('background-color', '#00ff00')
  blockButton.mousePressed(setBlock)
  blockButton.position(0, 60)

  ballButton = createButton('Create Ball')
  ballButton.size(100, 18)
  ballButton.style('background-color', '#00ff00')
  ballButton.mousePressed(setBall)
  ballButton.position(0, 90)

  //speed
  speedSlider = createSlider(0, 5, 2, 1);
  speedSlider.position(0, 140);
  speedSlider.style('width', '80px');

  //direction
  directionSelect = createSelect();
  directionSelect.position(0, 200);
  directionSelect.option('Left to Right')
  directionSelect.option('Up and Down')

  //note
  noteSel = createSelect();
  noteSel.position(10, 10);
  noteSel.option('C3');
  noteSel.option('D3');
  noteSel.option('E3');
  noteSel.option('F3');
  noteSel.option('G3');
  noteSel.option('A4');
  noteSel.option('B4');
  noteSel.option('C4');
  noteSel.option('D4');
  noteSel.option('E4');
  noteSel.option('F4');
  noteSel.option('G4');
  noteSel.option('A5');
  noteSel.option('B5');
  noteSel.option('C5');
  noteSel.position(0, 240);

  waveSel = createSelect();
  waveSel.position(0, 290);
  waveSel.option('sine');
  waveSel.option('triangle');
  waveSel.option('square');
  waveSel.option('sawtooth');

  delaySlider = createSlider(0, .7, 0, .1);
  delaySlider.position(0, 340);
  delaySlider.style('width', '80px');

  releaseSlider = createSlider(0.1, 0.8, 0.5, 0.1);
  releaseSlider.position(0, 380);
  releaseSlider.style('width', '80px');

  let bounceText = createP('Bounce')
  bounceText.style('color', '#00ff00')
  bounceText.style('font-family', 'Faster One')
  bounceText.style('font-size', '40px')
  bounceText.style('position', 10,-40)

  controllerDiv = createDiv('').size(panelWidth, divSize)
  controllerDiv.position(leftRightMargin, upDownMargin)
  controllerDiv.child(blockButton)
  controllerDiv.child(ballButton)
  controllerDiv.child(speedSlider)
  controllerDiv.child(directionSelect)
  controllerDiv.child(bounceText)
  controllerDiv.child(noteSel)
  controllerDiv.child(waveSel)
  controllerDiv.child(delaySlider)
  controllerDiv.child(releaseSlider)
}
