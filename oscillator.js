
let s, instanced=false;


var oscillator, gainNode, audioCtx;

function init() {
  console.log('hiii')

  if (!instanced) {
      s = new p5(sketch);
      instanced=true;
  }

  // create web audio api context
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContext();

  // create Oscillator and gain node
  oscillator = audioCtx.createOscillator();
  gainNode = audioCtx.createGain();

  // connect oscillator to gain node to speakers


  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  // create initial frequency and volumn values

  //var maxVol = 0.02;

  var initialFreq = 3000;
  var initialVol = 0.008;

  // set options for the oscillator


  oscillator.detune.value = 100; // value in cents
  oscillator.start(0);

  oscillator.onended = function() {
    console.log('Your tone has now stopped playing!');
  };

  gainNode.gain.value = initialVol;
  gainNode.gain.minValue = 1;
  gainNode.gain.maxValue = 0.0001;

  /*

  // mute button

  var mute = document.querySelector('.mute');

  mute.onclick = function() {
    if(mute.getAttribute('data-muted') === 'false') {
      gainNode.disconnect(audioCtx.destination);
      mute.setAttribute('data-muted', 'true');
      mute.innerHTML = "Unmute";
    } else {
      gainNode.connect(audioCtx.destination);
      mute.setAttribute('data-muted', 'false');
      mute.innerHTML = "Mute";
    };
  }

  */

    oscillator.frequency.value = initialFreq;
    //gainNode.gain.value = (KeyY/HEIGHT) * maxVol;
}

function one(){
    oscillator.frequency.value = 500;
}
function two(){
    oscillator.frequency.value = 8000;
}

function mute(){
    gainNode.disconnect(audioCtx.destination);
}

function setFrequency(f){
    oscillator.frequency.value = f;
}