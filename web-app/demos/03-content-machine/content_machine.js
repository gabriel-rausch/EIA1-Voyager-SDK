let introElements = [];
let introElementsCounter = 0;
let middleElements = [];
let middleElementsCounter = 0;
let outroElements = [];
let outroElementsCounter = 0;

let keydownActive = false;

window.addEventListener("load", function() {

    window.addEventListener("keydown", function(e) {
        if(document.querySelector(".demoIntro")) {
            document.querySelector(".demoIntro").style.display = "none";
        }

        if(!keydownActive) {
            keydownActive = true;
            if(e.key == "i") {
                showIntro();
            } else if(e.key == "m") {
                showMiddle();
            } else if(e.key == "o") {
                showOutro();
            }
        }
    })

    window.addEventListener("keyup", function(e) {
        keydownActive = false;
        if(e.key == "i") {
            hideIntro();
        } else if(e.key == "m") {
            hideMiddle();
        } else if(e.key == "o") {
            hideOutro();
        }
    })

    introElements = shuffleArray(document.querySelectorAll("div[id^=intro]"));
    middleElements = shuffleArray(document.querySelectorAll("div[id^=middle]"));
    outroElements = shuffleArray(document.querySelectorAll("div[id^=outro]"));
    console.log(middleElements);

    init();
})

function init() {
    for (let index = 0; index < introElements.length; index++) {
        hideElement(introElements[index]);
        introElements[index].style.transition = "0.2s all";
    }
    for (let index = 0; index < middleElements.length; index++) {
        hideElement(middleElements[index]);
        middleElements[index].style.transition = "0.2s all";
    }
    for (let index = 0; index < outroElements.length; index++) {
        hideElement(outroElements[index]);
        outroElements[index].style.transition = "0.2s all";
    }
}

function showIntro() {
    let current = introElements[introElementsCounter];

    showElement(current);
}

function showMiddle() {
    let current = middleElements[middleElementsCounter];

    showElement(current);
}

function showOutro() {
    let current = outroElements[outroElementsCounter];

    showElement(current);
}

function hideIntro() {
    let current = introElements[introElementsCounter];
    introElementsCounter = handleCounter(introElements, introElementsCounter);

    hideElement(current);
}

function hideMiddle() {
    let current = middleElements[middleElementsCounter];
    middleElementsCounter = handleCounter(middleElements, middleElementsCounter);

    hideElement(current);
}

function hideOutro() {
    let current = outroElements[outroElementsCounter];
    outroElementsCounter = handleCounter(outroElements, outroElementsCounter);

    hideElement(current);
}

function showElement(element) {
    let video = element.querySelector("video");
    if(video) {
        video.currentTime = 0;
        video.play();
    }
    let audio = element.querySelector("audio");
    if(audio) {
        audio.currentTime = 0;
        audio.play();
    }

    element.style.opacity = 1;
    // element.classList.add("show");
}

function hideElement(element) {
    let video = element.querySelector("video");
    if(video) {
        video.pause();
        video.currentTime = 0;
    }
    let audio = element.querySelector("audio");
    if(audio) {
        audio.pause();
        audio.currentTime = 0;
    }

    element.style.opacity = 0;
    // element.classList.remove("show");
}

function handleCounter(array, counter) {
    counter++;
    if(counter > array.length-1) {
        counter = 0;
    }
    return counter;
}

function shuffleArray(elements) {
    let array = Array.prototype.slice.call(elements);
    array.sort( () => Math.random() - 0.5) 

  return array;
}

/**
 * ESP Integration
 */

let handleTouch12Timeout;
let handleTouch12Pause = false;

function handleTouch12() {
    if(!handleTouch12Pause) {
        handleTouch12Pause = true;

        if(!handleTouch27Timeout) {
            showIntro();
        }
        clearTimeout(handleTouch12Timeout);

        handleTouch12Timeout = setTimeout(function() {
            hideIntro();
            handleTouch12Timeout = undefined;
        }, 400);

        setTimeout(function() {
            handleTouch12Pause = false;
        }, 200);
    }
}


let handleTouch27Timeout;
let handleTouch27Pause = false;

function handleTouch27() {
    
    if(!handleTouch27Pause) {
        handleTouch27Pause = true;

        if(!handleTouch27Timeout) {
            showMiddle();
        }
        clearTimeout(handleTouch27Timeout);

        handleTouch27Timeout = setTimeout(function() {
            hideMiddle();
            handleTouch27Timeout = undefined;
        }, 400);

        setTimeout(function() {
            handleTouch27Pause = false;
        }, 200);
    }
}


let handleTouch33Timeout;
let handleTouch33Pause = false;

function handleTouch33() {
    if(!handleTouch33Pause) {
        handleTouch33Pause = true;

        if(!handleTouch33Timeout) {
            showOutro();
        }
        clearTimeout(handleTouch33Timeout);

        handleTouch33Timeout = setTimeout(function() {
            hideOutro();
            handleTouch33Timeout = undefined;
        }, 400);

        setTimeout(function() {
            handleTouch33Pause = false;
        }, 200);
    }
}