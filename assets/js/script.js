// Get elements
var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start-button");
var startEl = document.querySelector(".start-container");
var quizEl = document.querySelector(".quiz-container");
var scoreEl = document.querySelector(".finalscore-container");
var bottomResult = document.querySelector(".result");
var questionEl = document.querySelector(".questions");
var choicesChild = document.getElementById("choices");
var scoreResult = document.getElementById("score-result");

var scoreForm = document.querySelector("#score-form");
var initialsInput = document.querySelector("#initials-text");
var backButton = document.querySelector("#back");
var scoreList = document.querySelector("#score-list");

var highscores = [];


//  set variables
var secondsLeft = 0;
var currentQuestion;
var index = 0;


var timerInterval;
// Timer functions
function setTime() {
    // Set timer to 60 seconds
    secondsLeft = 75;
    timerInterval = setInterval(function () {
        if (secondsLeft > 0){
            timerEl.textContent = "Time: " + secondsLeft;
            secondsLeft--;
        } else {
            gameOver();
        }
    }, 1000);
}


// Function when start button is pressed
startButton.addEventListener("click", function (event) {
    event.preventDefault();
    // start timer
    setTime();
    // set questions
    // show question container and hide the start container
    startEl.setAttribute("data-state", "hidden");
    quizEl.setAttribute("data-state", "visible");
    nextQuestion();
});

// Function that identifies which answer is clicked in the question
quizEl.addEventListener("click", function (event) {
    var element = event.target;

    if (element.matches("button")) {

        // get data attr from buttons
        var answer = element.dataset.answer;

        // increment index number everytime a choice is clicked
        index++;
        if (answer === "correct") {
            // do something, set bottom result to correct
            bottomResult.textContent = "Correct!"

            // move to next question.
            nextQuestion();
        } else {
            // set bottom result to wrong
            bottomResult.textContent = "Wrong!"
            // subtract 15 sec from timer
            secondsLeft = secondsLeft - 15;
            // move to next question
            nextQuestion();
        }
    }
})

// Array for the available questions
var questionArr = [
    "question1",
    "question2",
    "question3",
    "question4",
    "question5",
    "question6",
    "question7",
    "question8",
    "question9",
    "question10"
];

//Object with all available answers
var answerObj = {
    choices: [
        ["a", "b", "c", "d"], 
        ["a", "b", "c", "d"], 
        ["a", "b", "c", "d"], 
        ["a", "b", "c", "d"], 
        ["a", "b", "c", "d"], 
        ["a", "b", "c", "d"],
        ["a", "b", "c", "d"], 
        ["a", "b", "c", "d"], 
        ["a", "b", "c", "d"], 
        ["a", "b", "c", "d"]],
    cheatSheet: [
        ["correct", "wrong", "wrong", "wrong"], 
        ["correct", "wrong", "wrong", "wrong"], 
        ["correct", "wrong", "wrong", "wrong"], 
        ["correct", "wrong", "wrong", "wrong"], 
        ["correct", "wrong", "wrong", "wrong"], 
        ["correct", "wrong", "wrong", "wrong"], 
        ["correct", "wrong", "wrong", "wrong"], 
        ["correct", "wrong", "wrong", "wrong"], 
        ["correct", "wrong", "wrong", "wrong"], 
        ["correct", "wrong", "wrong", "wrong"]
        // ["correct", "wrong", "wrong", "wrong"], 
        // ["wrong", "correct", "wrong", "wrong"], 
        // ["wrong", "wrong", "wrong", "correct"], 
        // ["correct", "wrong", "wrong", "wrong"], 
        // ["wrong", "wrong", "correct", "wrong"], 
        // ["wrong", "correct", "wrong", "wrong"],
        // ["wrong", "correct", "wrong", "wrong"], 
        // ["correct", "wrong", "wrong", "wrong"], 
        // ["wrong", "wrong", "correct", "wrong"], 
        // ["wrong", "wrong", "wrong", "correct"]
    ],
};



// put questions and answers into object
var quizObj = {
    questions: questionArr,
    answers: answerObj
};


function nextQuestion() {
    // checks if there are questions left
    if (index + 1 <= questionArr.length) {
        // get current question based on current index
        currentQuestion = quizObj.questions[index];
        // populate question container with current question
        questionEl.textContent = currentQuestion;

        var choicesButtons = quizObj.answers.choices[index];
        var choicesAnswers = quizObj.answers.cheatSheet[index];
        for (var i=0; i< choicesButtons.length; i++){
            // Adds the choices to buttons
            choicesChild.children[i].children[0].textContent = choicesButtons[i];
            // sets the data-answer attr to the buttons to determine which answer is correct/wrong
            choicesChild.children[i].children[0].setAttribute("data-answer", choicesAnswers[i]);
        }
    } else {
        gameOver();
    }
}

// function to end game and show score
function gameOver() {
    clearInterval(timerInterval);
    if(secondsLeft <= 0){
        secondsLeft = 0;
    }
    timerEl.textContent = "Time: " + secondsLeft;
    scoreResult.textContent = secondsLeft;
    quizEl.setAttribute("data-state", "hidden");
    scoreEl.setAttribute("data-state", "visible");
}

function renderScores() {
    for (var i = 0; i < highscores.length; i++){
        var highscore = highscores[i];
        var li = document.createElement("li");
        li.textContent = highscore;
        li.setAttribute("data-index", i);
        scoreList.appendChild(li);
    }
}

function init() {
    var storedScores = JSON.parse(localStorage.getItem("highscores"));
    // secondsLeft = 0;
    timerEl.textContent = "Time: " + secondsLeft;
    if (storedScores !== null){
        highscores = storedScores;
    }
    // renderScores();
}

function storeScores() {
    localStorage.setItem("highscores", JSON.stringify(highscores));
}

scoreForm.addEventListener("submit", function(event){
    // event.preventDefault();
    window.location.href = "highscores.html";
    var initialsText = initialsInput.value.trim();
    var timeLeft = secondsLeft;
    var scoreEntry = initialsText + " - " + timeLeft;

    if (initialsText === ""){
        return;
    }
    highscores.push(scoreEntry);
    initialsInput.value = "";

    storeScores();
    renderScores();
})

init();