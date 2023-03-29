const samples = ["hello", "world", "kick", "snare", "A", "C"];
let audioBuffer = {};
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext = null;

function playSample(key) {
    if (audioContext === null)
      audioContext = new AudioContext();
    const source = audioContext.createBufferSource();
    source.connect(audioContext.destination);
    source.buffer = audioBuffer[key];
    source.start(audioContext.currentTime);
}


// load audio buffers
for (let i = 0; i < samples.length; i++) {
    console.log(i);
    const request = new XMLHttpRequest();
    request.responseType = "arraybuffer";
    request.open("GET", samples[i] + ".mp3");
    console.log(samples[i]);
    request.addEventListener("load", () => {
        const ac = new AudioContext();
        ac.decodeAudioData(request.response, (buffer) => audioBuffer[samples[i]] = buffer);
    });

    request.send();
}

let handleTouch12Pause = false;
function handleTouch12() {
    if(!handleTouch12Pause) {
        handleTouch12Pause = true;
        playSample("hello");
        setTimeout(function() {
            handleTouch12Pause = false;
        }, 400);
    }
}
let handleTouch13Pause = false;
function handleTouch13() {
    if(!handleTouch13Pause) {
        handleTouch13Pause = true;
        playSample("world");
        setTimeout(function() {
            handleTouch13Pause = false;
        }, 400);
    }
}
let handleTouch14Pause = false;
function handleTouch14() {
    if(!handleTouch14Pause) {
        handleTouch14Pause = true;
        playSample("kick");
        setTimeout(function() {
            handleTouch14Pause = false;
        }, 400);
    }
}
let handleTouch27Pause = false;
function handleTouch27() {
    if(!handleTouch27Pause) {
        handleTouch27Pause = true;
        playSample("snare");
        setTimeout(function() {
            handleTouch27Pause = false;
        }, 400);
    }
}
let handleTouch32Pause = false;
function handleTouch32() {
    if(!handleTouch32Pause) {
        handleTouch32Pause = true;
        playSample("A");
        setTimeout(function() {
            handleTouch32Pause = false;
        }, 400);
    }
}
let handleTouch33Pause = false;
function handleTouch33() {
    if(!handleTouch33Pause) {
        handleTouch33Pause = true;
        playSample("C");
        setTimeout(function() {
            handleTouch33Pause = false;
        }, 400);
    }
}