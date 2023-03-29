

function handleLoaded() {
    document.querySelector(".intro").style.display = "none";
}

function handleTouch12() {
    document.querySelector(".container1").classList.add("show");
    setTimeout(()=> {
        document.querySelector(".container1").classList.remove("show");
    }, 500)
}

function handleTouch14() {
    document.querySelector(".container2").classList.add("show");
    setTimeout(()=> {
        document.querySelector(".container2").classList.remove("show");
    }, 500)
}