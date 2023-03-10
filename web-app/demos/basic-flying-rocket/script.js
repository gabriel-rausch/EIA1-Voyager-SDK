

let rocket = document.querySelector(".rocket");
let rocketWrapper = document.querySelector(".rocketWrapper");

let rotation = 30;
let translateY = 0;

function handleLoaded() {
}

function handleTouch12() {
    rotation += 5;
    rocketWrapper.style.transform = "rotate(" + rotation + "deg)";
}

function handleTouch13() {
    rotation -= 5;
    rocketWrapper.style.transform = "rotate(" + rotation + "deg)";
}

function handleTouch14() {
    translateY -= 10;
    rocket.style.transform = "translateY(" + translateY + "px)";
}

function handleTouch27() {
    translateY += 10;
    rocket.style.transform = "translateY(" + translateY + "px)";
}