var scoreList = document.querySelector("#score-list");
var backButton = document.querySelector("#back");
var clearButton = document.querySelector("#clear");

var storedScores = [];

function renderScores() {
    for (var i = 0; i < storedScores.length; i++) {
        var highscore = storedScores[i];
        var li = document.createElement("li");
        li.textContent = highscore;
        li.setAttribute("data-index", i);
        scoreList.appendChild(li);
    }
}


function init() {
    storedScores = JSON.parse(localStorage.getItem("highscores"));
    if (storedScores !== null) {
        highscores = storedScores;
    }
    renderScores();
}

clearButton.addEventListener("click", function () {
    storedScores = [];
    localStorage.setItem("highscores", JSON.stringify(storedScores));

    window.location.reload();
    renderScores();

})

init();