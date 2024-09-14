const drum = document.getElementById("drum-container");

const NOTES = {
  "C-4": 261.626,
  "C-#": 277.1826,
  "D-4": 293.665,
  "D-#": 311.127,
  "E-4": 329.628,
  "F-4": 349.228,
  "F-#": 369.9944,
  "G-4": 391.995,
  "G-#": 415.3047,
  "A-4": 440.0,
  "A-#": 466.1638,
  "B-4": 493.883,
  "C-5": 523.251,
};

const WAVEFORMS = ["sine", "square", "sawtooth", "triangle"];

let audioCtx;
let osc;
let letsPlay = false;

const pads = drum.querySelectorAll(".key");

if (confirm("Are you ready to Synth Your Soul?")) {
  letsPlay = true;
}

function initAudioContext() {
  audioCtx = new (AudioContext || webkitAudioContext)();
}

// Assign data-index to each pad
for (let i = 0; i < pads.length; i++) {
  pads[i].setAttribute("data-index", i);
}

// function to play the note
function playNote(note) {
  if (letsPlay) {
    initAudioContext();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    osc = audioCtx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = NOTES[note];
    osc.connect(audioCtx.destination);
    osc.start();
  }
}

// Add event lisetners to each pad
for (const pad of pads) {
  pad.addEventListener("pointerdown", () => {
    playNote(pad.dataset.note); // Play the note associated with the pad
    pad.classList.add("playing");
  });

  pad.addEventListener("pointerup", () => {
    if (osc) osc.stop();
    pad.classList.remove("playing");
  });
}

// Function to remove the transition effect
function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  e.target.classList.remove("playing");
}

// function keyboardPlay(e) {
//   let key = e.key.toLowerCase();

//   alert("the key was " + key);
// }

// window.addEventListener("keydown", keyboardPlay);
