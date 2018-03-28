let attackLevel = 1.0;
let releaseLevel = 0;

let attackTime = 0.001
let decayTime = 0.5;
let susPercent = 0.2;
let releaseTime = 0.5;

function soundSetup(){
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
