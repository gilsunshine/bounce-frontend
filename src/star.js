class Star{
  constructor(x, y){
    this.x = x
    this.y = y
    this.numParticles = Math.floor(random(3, 7))
    this.particles = []
    this.color = Math.floor(random(0, 3))
    }

    createParticles(){
      for(let i = 0; i < this.numParticles; i++){
        let newParticle = new Particle(this.x, this.y, random(5,10), random(0, 2 * PI), this.color)
        this.particles.push(newParticle)
    }
  }

  checkParticles(){
    this.particles.forEach(particle => {
      if(particle.alpha < 0){
        this.particles.splice(this.particles.indexOf(particle), 1)
      }
    })
  }
}
