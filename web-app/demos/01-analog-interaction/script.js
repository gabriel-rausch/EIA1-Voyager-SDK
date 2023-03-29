

function handleLoaded() {
}


let handleTouch12Pause = false;
function handleTouch12() {
    if(!handleTouch12Pause) {
        handleTouch12Pause = true;
        
        areaClick("red")

        setTimeout(function() {
            handleTouch12Pause = false;
        }, 1000);
    }
}
let handleTouch27Pause = false;
function handleTouch27() {
    if(!handleTouch27Pause) {
        handleTouch27Pause = true;
        
        areaClick("green")

        setTimeout(function() {
            handleTouch27Pause = false;
        }, 1000);
    }
}
let handleTouch33Pause = false;
function handleTouch33() {
    if(!handleTouch33Pause) {
        handleTouch33Pause = true;
        
        areaClick("blue")

        setTimeout(function() {
            handleTouch33Pause = false;
        }, 1000);
    }
}



let gameIntro;
let gamePlay;
let gameEnd;

/**
 * initializing each color 
 */
let redColor = { color: "red" };
let yellowColor = { color: "yellow" };
let greenColor = { color: "green" };
let blueColor = { color: "blue" };
let purpleColor = { color: "purple" };

/**
 * initializing the sepecific levels with each soundsereies
 * easy: 5 levels, medium 15 etc.
 */
let levels = [
    { level: "Level: Easy (3)", soundSeries: 3 },
    { level: "Level: Medium (7)", soundSeries: 7 },
    { level: "Level: Hard (15)", soundSeries: 15 },
    { level: "Level: Very Hard (20)", soundSeries: 20 }
];

/**
 * loose if the game has been lost
 * win if the game has been won
 * started if the game has been started
 */
let loose = false;
let win = false;
let started = false;

/**
 * defining the sound for each color namingly
 * defining the loose sound
 */
let soundRed = new Audio("sounds/sound1.mp3");
let soundYellow = new Audio("sounds/sound2.mp3");
let soundGreen = new Audio("sounds/sound3.mp3");
let soundBlue = new Audio("sounds/sound4.mp3");
let soundPurple = new Audio("sounds/sound5.mp3");
let soundLoose = new Audio("sounds/loose.mp3");
let soundWin = new Audio("sounds/sound5.mp3");

/**
 * assigning to each area a sound and color to map them
 */
let redArea = { color: redColor, sound: soundRed };
let greenArea = { color: greenColor, sound: soundGreen };
let blueArea = { color: blueColor, sound: soundBlue };
let yellowArea = { color: yellowColor, sound: soundYellow };
let purpleArea = { color: purpleColor, sound: soundPurple };

/**
 * will be used for random colors 
 */
let allAreas = [];

/**
 * to initialize all the games e.g easy, medium etc.
 */
let games = [];

/**
 * for having the selected game and selected level
 */
let selectedGame = games[0];
let selectedLevel = levels[0];

/**
 * defining the DOM elements
 * Buttons
 */
let buttonred;
let buttonblue;
let buttonyellow;
let buttongreen;
let buttonpurple;

let buttonstart;
/**
 * success, error message
 */
let successMessage;
let errorMessage;
/**
 * progressbar and text
 */
let progress;
let progressText;
/**
 * level list
 */
let levelList;

/**
 * 
 * @param series how many sequences to generate
 * variation =  variation defines the number for max random like between 0 and 5
 * shuffled area, push randomly areas between 0-4, e.g allareas[2] = yellowarea 
 */
function generateAreaSequence(series) {
    let shuffledArea = [];
    for (let i = 0, variation = allAreas.length; i < series; i++) {
        shuffledArea.push(allAreas[Math.floor(Math.random() * Math.floor(variation))]);
    }

    return shuffledArea;
}
/**
 * push all the areas
 */
function initArea() {
    allAreas.push(redArea);
    allAreas.push(blueArea);
    // allAreas.push(yellowArea);
    allAreas.push(greenArea);
    // allAreas.push(purpleArea);

}
/**
 * initialize all the games with generated area sequences and corresponding level, click counter and current cursor
 */
function initGames() {
    games = [
        {
            counter: 0,
            currentCursor: 0,
            level: levels[0],
            area: generateAreaSequence(levels[0].soundSeries)
        },
        {
            counter: 0,
            currentCursor: 0,
            level: levels[1],
            area: generateAreaSequence(levels[1].soundSeries)
        },
        {
            counter: 0,
            currentCursor: 0,
            level: levels[2],
            area: generateAreaSequence(levels[2].soundSeries)
        },
        {
            counter: 0,
            currentCursor: 0,
            level: levels[3],
            area: generateAreaSequence(levels[3].soundSeries)
        }
    ];
}
/**
 * get the dom elements from index.html in typescript: buttons, levellist, startbutton, success/error message
 * progressbar
 */
function initDOM() {
    gameIntro = document.getElementById("gameIntro");
    gamePlay = document.getElementById("gamePlay");
    gameEnd = document.getElementById("gameEnd");

    buttonred = document.getElementById("red");
    buttonblue = document.getElementById("blue");
    buttonyellow = document.getElementById("yellow");
    buttongreen = document.getElementById("green");
    buttonpurple = document.getElementById("purple");

    levelList = document.getElementById("levelList");
    buttonstart = document.getElementById("startbutton");

    successMessage = document.getElementById("success");
    errorMessage = document.getElementById("fail");

    progress = document.getElementById("myBar");

    progressText = document.getElementById("progressText");

}

/**
 * append option element into select element for each level in the levels array
 */
function initLevelList() {
    for (let i = 0; i < levels.length; i++) {
        let element = levels[i];
        let option = document.createElement("option");
        option.value = element.soundSeries.toString();
        option.text = element.level;
        levelList.append(option);
    }
}

/**
 * register all the click events for the areas, levellist, gamestart
 */
function registerEvents() {
    // buttonred.addEventListener("click", areaClick);
    // buttonblue.addEventListener("click", areaClick);
    // buttonyellow.addEventListener("click", areaClick);
    // buttongreen.addEventListener("click", areaClick);
    // buttonpurple.addEventListener("click", areaClick);

    levelList.addEventListener("change", selectLevel);
    buttonstart.addEventListener("click", gameStart);

}

/**
 * 
 * @param event to get the clicked element
 * target gives the clicked element
 * id is the id attribute from the clicked div element
 * 1. we look into which area is clicked
 * 2. then we highlight the area and play the sound
 * 3. after 1.3 seconds we unlight the area
 * 4. if the game is started we call the checkclick function
 * 
 * note: I before outsourced the code inside the case block as an own if (started) {
        checkClick(areaToCheck);
        }
        after the switch block, but lint gave an error Variable 'areaToCheck' is used before being assigned.
 */
function areaClick(id) {
    let areaToCheck;

    switch (id) {
        case "red":
            areaToCheck = redArea;
            highlight(areaToCheck.color);
            redArea.sound.play();

            setTimeout(() => {
                unHighlight(areaToCheck.color);

            }, 1200);
            if (started) {
                checkClick(areaToCheck);
            }

            break;
        case "green":
            areaToCheck = greenArea;
            highlight(areaToCheck.color);
            greenArea.sound.play();

            setTimeout(() => {
                unHighlight(areaToCheck.color);

            }, 1200);
            if (started) {
                checkClick(areaToCheck);
            }

            break;
        case "yellow":
            areaToCheck = yellowArea;
            highlight(areaToCheck.color);
            yellowArea.sound.play();

            setTimeout(() => {
                unHighlight(areaToCheck.color);

            }, 1200);
            if (started) {
                checkClick(areaToCheck);
            }

            break;
        case "blue":
            areaToCheck = blueArea;
            highlight(areaToCheck.color);
            blueArea.sound.play();

            setTimeout(() => {
                unHighlight(areaToCheck.color);

            }, 1200);
            if (started) {
                checkClick(areaToCheck);
            }
            break;
        case "purple":
            areaToCheck = purpleArea;
            highlight(areaToCheck.color);
            purpleArea.sound.play();

            setTimeout(() => {
                unHighlight(areaToCheck.color);

            }, 1200);
            if (started) {
                checkClick(areaToCheck);
            }
            break;
    }



}

/**
 * 
 * @param event change event, when selecting a value from the select list in index.html
 * target is the select element you selected
 * the selectedindex tells you which index is selected which will return the corresponding level from the
 * select level array
 */
function selectLevel(event) {
    let target = event.target;
    selectedLevel = levels[target.selectedIndex];
    console.log(selectedLevel);
}

/**
 * 
 * @param areaClicked is the area you have clicked
 * we take the counter and the currentcursor 
 * if the color is the same as the color in the area then we increment the counter
 * if the color is not the same then we play the sound loose and show the loose message
 * if the sequence is done, counter === the same number as current cursor we go the next sequence
 * if the cursor is the same number as the soundserien(the level to win f.e easy= 5 sequences) then we show win message and set to win
 */
function checkClick(areaClicked) {
    let area = selectedGame.area;
    let currentCursor = selectedGame.currentCursor;
    let counter = selectedGame.counter;

    if (area[counter].color == areaClicked.color) {
        selectedGame.counter++;
    }

    else if (!(area[counter].color == areaClicked.color)) {
        // alert("you lost")
        soundLoose.play();
        showErrorMessage();
        loose = true;

        started = false;
    }
    // if sequence are done and not lost then next round
    if (counter === currentCursor - 1 && !loose) {
        if (currentCursor === selectedGame.level.soundSeries) {
            win = true;
            soundWin.play();
            showWinMessage();
        }
        else {
            selectedGame.counter = 0;

            setTimeout(() => {
                start();
            }, 1500);
        }
    }

}
/**
 * calculate the current level out of max level
 * the width of the progressbar is the percentage of the currentcursor to the soundseries(maxlevel) e.g 1/5 *100 = 20%
 */
function updateProgress() {
    progressText.innerHTML = "Level " + selectedGame.currentCursor + " von Level " + selectedGame.level.soundSeries;
    // progress.style.width = (selectedGame.currentCursor / selectedGame.level.soundSeries) * 100 + "%";
    // progress.innerHTML = Math.floor(selectedGame.currentCursor / selectedGame.level.soundSeries * 100) + "%";
}
/**
 * 
 * @param selectedLevel get game by the selectedlevel
 */
function getGame(selectedLevel) {
    for (const game of games) {
        if (game.level === selectedLevel) {
            return game;
        }
    }
    return games[0];

}

/**
 * add the eventlisteners to the areas after the soundplay is finished
 */
function enableUI() {
    buttonred.addEventListener("click", areaClick);
    buttonblue.addEventListener("click", areaClick);
    buttonyellow.addEventListener("click", areaClick);
    buttongreen.addEventListener("click", areaClick);
    buttonpurple.addEventListener("click", areaClick);
}

/**
 * disable the click events by removing the click events from the areas
 */
function disableUI() {
    buttonred.removeEventListener("click", areaClick);
    buttonblue.removeEventListener("click", areaClick);
    buttonyellow.removeEventListener("click", areaClick);
    buttongreen.removeEventListener("click", areaClick);
    buttonpurple.removeEventListener("click", areaClick);
}
/**
 * increase the level by one
 */
function increaseCursor() {
    selectedGame.currentCursor += 1;
}

/**
 * show the win message by removing the hide class
 */
function showWinMessage() {
    gameEnd.style.display = "flex";
    if (win === true) {
        successMessage.style.display = "block";
    }
}
/**
 * show the error message by removing the hide class
 */
function showErrorMessage() {
    gameEnd.style.display = "flex";
    errorMessage.style.display = "block";
}

/**
 * hide the win message by adding the hide class
 */
function hideWinMessage() {
    gameEnd.style.display = "none";
    successMessage.style.display = "none";
}
/**
* hide the error message by adding the hide class
*/
function hideErrorMessage() {
    gameEnd.style.display = "none";
    errorMessage.style.display = "none";
}

/**
 * 
 * @param color our current color of area
 * add class to highlight an area
 */
function highlight(color) {
    switch (color.color) {
        case "red":
            buttonred.classList.add("highlight");

            break;
        case "blue":
            buttonblue.classList.add("highlight");

            break;
        case "yellow":
            buttonyellow.classList.add("highlight");

            break;
        case "green":
            buttongreen.classList.add("highlight");

            break;
        case "purple":
            buttonpurple.classList.add("highlight");

            break;

        default:
            break;
    }
}
/**
 * 
 * @param color our current color of area
 * remove class to undo highlight an area
 */
function unHighlight(color) {
    switch (color.color) {
        case "red":
            buttonred.classList.remove("highlight");

            break;
        case "blue":
            buttonblue.classList.remove("highlight");

            break;
        case "yellow":
            buttonyellow.classList.remove("highlight");

            break;
        case "green":
            buttongreen.classList.remove("highlight");

            break;
        case "purple":
            buttonpurple.classList.remove("highlight");

            break;
        default:
            break;
    }
}
/**
 * start a new game and set the default values
 */
function gameStart() {
    initAll();
    hideErrorMessage();
    hideWinMessage();
    started = true;
    loose = false;
    win = false;
    gameIntro.style.display = "none";

    setTimeout(function() {
        gamePlay.style.display = "flex";
        start();
    }, 1000)
}
/**
 * start is the function to have a new round of sound so if it is playing 2 sounds, it will play 3 afterwards
 */
function start() {

    selectedGame = getGame(selectedLevel);
    let areaSequence = selectedGame.area;
    increaseCursor();
    updateProgress();

    /**
     * for each sound play it, highlight the area, disable the ui, unhighlight the area
     * the i* 1500ms is to increase the timeout for each sound, so the first sound will play in 1.5 seconds
     * the second sound in 2 * 1.5 seconds, the third in 3 * 1.5 seconds to have a smooth play sound by sound
     */
    for (let i = 0; i < selectedGame.currentCursor; i++) {
        let area = areaSequence[i];
        setTimeout(() => {

            highlight(area.color);
            area.sound.play();
            /**
             * unlight the area after 1.2 seconds
             */
            setTimeout(() => {
                unHighlight(area.color);

            }, 1200);
            //disable ui while playing
            disableUI();
            if (i == selectedGame.currentCursor - 1) {
                // enable ui clicks when finished to prevent user clicking the area during playing the game
                enableUI();
            }
        }, i * 1500);
    }

}
/**
 * initialize the areas
 * initialize the game and its level
 * initialize the dom elements from the index.html
 */
function initAll() {
    initArea();
    initGames();
    initDOM();

    registerEvents();
}
/**
* when document is loaded call init functions
*/
window.addEventListener("load", function () {
    initAll();
    initLevelList();
});
