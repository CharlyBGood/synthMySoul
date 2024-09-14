const drum = document.getElementById("drum-container");

const NOTES = {
  "C-4": 261.626,
  "C-#": 277.1826,
  "D-4": 293.665,
  "D-#": 311.1270,
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

let osc;

const pads = drum.querySelectorAll(".key");
for (let i = 0; i < pads.length; i++) {
  pads[i].setAttribute("data-index", i);
}

for (const pad of pads) {
  pad.addEventListener("pointerdown", () => {
    const audioCtx = new (AudioContext || webkitAudioContext)();
    if (!audioCtx) throw "Not supported!";
    osc = audioCtx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = NOTES[pad.dataset.note]; // Hz = middle A
    osc.connect(audioCtx.destination);
    osc.start();
    pad.classList.add("playing");
  });

  pad.addEventListener("pointerup", () => {
    osc.stop();
    pad.classList.remove("playing");
  });
}

function keyboardPlay(e) {
  let key = e.key.toLowerCase();

  alert("the key was " + key);
}

window.addEventListener("keydown", keyboardPlay);

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  e.target.classList.remove("playing");
}
