let notes = {"C3": 130.81, "D3": 146.83, "E3": 164.81, "F3": 174.61, "G3": 196.00, "A4": 220.00, "B4": 246.94, "C4": 261.63, "D4": 293.66, "E4": 329.63, "F4": 349.23, "G4": 392.00, "A5": 440.00, "B5": 493.88, "C5": 523.25}

class Sound{
  constructor(env, wave, delay){
    this.env = env
    this.wave = wave
    this.delay = delay
  }
}

let attackLevel = 1.0
let releaseLevel = 0

let attackTime = 0.001
let decayTime = 0.5
let susPercent = 0.2

function createSound(note, waveType, delayTime, releaseTime){
  let env = new p5.Env()
  env.setADSR(attackTime, decayTime, susPercent, releaseTime)
  env.setRange(attackLevel, releaseLevel)

  let wave = new p5.Oscillator()
  wave.setType(waveType)
  wave.start()
  wave.freq(note)
  wave.amp(env)

  let delay = new p5.Delay()
  delay.process(wave, .15, delayTime, 2300)
  delay.setType('pingPong')

  let sound = new Sound(env, wave, delay)
  return sound
}
