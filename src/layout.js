function drawGrid(){
  let xCounter = 0
  let yCounter = 0
  for(let x = leftRightMargin + 300; x <= width - (leftRightMargin + 20); x += scale){
    if (xCounter % 4 === 0){
      stroke(255, 100)
      line(x, upDownMargin, x, height-(upDownMargin + 20))
    } else{
      stroke(255, 50)
      line(x, upDownMargin, x, height-(upDownMargin + 20))
    }
    xCounter++
  }

  for(let y = upDownMargin; y <= height - (upDownMargin + 20); y += scale){
    if (yCounter % 4 === 0){
      stroke(255, 100)
      line(leftRightMargin + 300, y, width-(leftRightMargin + 20), y)
    }else{
      stroke(255, 50)
      line(leftRightMargin + 300, y, width-(leftRightMargin + 20), y)
    }
    yCounter++
  }
}
