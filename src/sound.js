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
// let releaseTime = 0.5

// let sounds = []

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
  delay.process(wave, .15, .3, delayTime)
  delay.setType('pingPong')

  let sound = new Sound(env, wave, delay)
  // sounds.push(sound)
  return sound
}

// function playNotes(){
//   sounds.forEach(sound => sound.env.play())
// }

// function playNote(num){
//   if (num === 1){
//     env1.play()
//   } else if (num === 2){
//     env2.play()
//   }
//   else if (num === 3){
//     env3.play()
//   }
// }
// function soundSetup(){
//   env1 = new p5.Env();
//   env1.setADSR(attackTime, decayTime, susPercent, releaseTime);
//   env1.setRange(attackLevel, releaseLevel);
//
//   env2 = new p5.Env();
//   env2.setADSR(attackTime, decayTime, susPercent, releaseTime);
//   env2.setRange(attackLevel, releaseLevel);
//
//   env3 = new p5.Env();
//   env3.setADSR(attackTime, decayTime, susPercent, releaseTime);
//   env3.setRange(attackLevel, releaseLevel);
//
//   wave1 = new p5.Oscillator();
//   wave1.setType('triangle');
//   wave1.start();
//   wave1.freq(0);
//   wave1.amp(env1);
//
//   wave2 = new p5.Oscillator();
//   wave2.setType('triangle');
//   wave2.start();
//   wave2.freq(0);
//   wave2.amp(env2);
//
//   wave3 = new p5.Oscillator();
//   wave3.setType('triangle');
//   wave3.start();
//   wave3.freq(0);
//   wave3.amp(env3);
//
//   delay1 = new p5.Delay();
//   delay1.process(wave1, .15, .3, 2800);
//
//   delay2 = new p5.Delay();
//   delay2.process(wave2, .15, .3, 2800);
//
//   delay3 = new p5.Delay();
//   delay3.process(wave3, .15, .3, 2800);
// }
