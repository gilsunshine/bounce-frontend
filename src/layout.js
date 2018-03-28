function drawGrid(){
  let xCounter = 0
  let yCounter = 0
  for(let x = leftRightMargin + 300; x <= width - leftRightMargin; x += scale){
    if (xCounter % 4 === 0){
      stroke(255, 100)
      line(x, upDownMargin, x, height-upDownMargin)
    } else{
      stroke(255, 50)
      line(x, upDownMargin, x, height-upDownMargin)
    }
    xCounter++
  }

  for(let y = upDownMargin; y <= height - upDownMargin; y += scale){
    if (yCounter % 4 === 0){
      stroke(255, 100)
      line(leftRightMargin + 300, y, width-leftRightMargin, y)
    }else{
      stroke(255, 50)
      line(leftRightMargin + 300, y, width-leftRightMargin, y)
    }
    yCounter++
  }
}
