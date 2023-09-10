// get elements
var scoreList = document.querySelector("#score-list");
var backButton = document.querySelector("#back");
var clearButton = document.querySelector("#clear");

// intialize scores array
var storedScores = [];

// render scores to page as list
function renderScores() {
    for (var i = 0; i < storedScores.length; i++) {
        var highscore = storedScores[i];
        var li = document.createElement("li");
        li.textContent = highscore;
        li.setAttribute("data-index", i);
        scoreList.appendChild(li);
    }
}

// event when clear highscores is press
clearButton.addEventListener("click", function () {
    // set array to empty
    storedScores = [];
    // replace empty array to local storage
    localStorage.setItem("highscores", JSON.stringify(storedScores));
    // reload page
    window.location.reload();
    // call render function
    renderScores();
    
})

// Initialize page to get scores from local storage
function init() {
    storedScores = JSON.parse(localStorage.getItem("highscores"));
    if (storedScores !== null) {
        highscores = storedScores;
    }
    renderScores();
}

init();