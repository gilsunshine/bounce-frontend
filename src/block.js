class Block{
  constructor(x1, y1, x2, y2, direction){
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2
    this.direction = direction
  }

  show(){
    stroke(230, 255, 0)
    line(this.x1, this.y1, this.x2, this.y2)
  }
}

function checkCords(x1, y1, x2, y2){

  x1 = roundTo(x1)
  y1 = roundTo(y1)
  x2 = roundTo(x2)
  y2 = roundTo(y2)
  // console.log(x1)
  if(x1 === x2){
    leftRightBlocks.push(new Block(x1, y1, x2, y2, 0))
  }else if (y1 === y2){
    upDownBlocks.push(new Block(x1, y1, x2, y2, 1))
  }else if (Math.abs(x1 - x2) < Math.abs(y1 - y2)){
    x2 = x1
    leftRightBlocks.push(new Block(x1, y1, x2, y2, 0))
  }else{
    y2 = y1
    upDownBlocks.push(new Block(x1, y1, x2, y2, 1))
  }
}

function roundTo(num){
  num = Math.floor(num)
  let mod = num % 20
  if(num % 20 === 0){
    return num
  }
  if(num % 20 >= 10){
    num += 20 - (num % 20)
    return num
  }else{
    num -= (num % 20)
    return num
  }
  // for(let i = num; i >= 0; i--){
  //   if(i % 20 === 0){
  //     if (i === 0){
  //       i = 20
  //     }
  //     console.log(i)
  //     return i
  //   }
  // }
}
