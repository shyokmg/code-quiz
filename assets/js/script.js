// Get elements
var timerEl = document.querySelector("#timer");
var startButton = document.querySelector("#start-button");
var startEl = document.querySelector(".start-container");
var quizEl = document.querySelector(".quiz-container");
var scoreEl = document.querySelector(".finalscore-container");
var bottomResult = document.querySelector(".result");
var questionEl = document.querySelector(".questions");
var choicesChild = document.querySelector("#choices");
var scoreResult = document.querySelector("#score-result");
var scoresLink = document.querySelector("#highscores-link")
var scoreForm = document.querySelector("#score-form");
var initialsInput = document.querySelector("#initials-text");

//  set variables
var secondsLeft = 0;
var currentQuestion;
var index = 0;
var highscores = [];
var timerInterval;
var countDown = 0;
var storedScores = [];

// Timer functions
function setTime() {
    // Set timer to 75 seconds
    secondsLeft = 75;
    timerEl.textContent = "Time: " + secondsLeft;
    timerInterval = setInterval(function () {
        if (secondsLeft > 0) {
            secondsLeft--;
            timerEl.textContent = "Time: " + secondsLeft;
        } else {
            gameOver();
        }
    }, 1000);
}


function resultTimer() {
   countDown = 2;
    var resultTimerInterval = setInterval(function () {
        if (countDown > 0) {
            countDown--;
        } else {
            bottomResult.setAttribute("data-state", "hidden");
            clearInterval(resultTimerInterval);
        }
    }, 1000);
}


// Function when start button is pressed
startButton.addEventListener("click", function (event) {
    // start timer
    setTime();

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
            bottomResult.setAttribute("data-state", "visible");
            
        } else {
            // set bottom result to wrong
            bottomResult.textContent = "Wrong!"
            bottomResult.setAttribute("data-state", "visible");
            // subtract 15 sec from timer
            secondsLeft = secondsLeft - 15;
            timerEl.textContent = "Time: " + secondsLeft;
        }

         // move to next question.
         nextQuestion();
        resultTimer();
    }
})

// Event when submit button is pressed after game over
scoreForm.addEventListener("submit", function (event) {
    event.preventDefault();
    
    highscores = JSON.parse(localStorage.getItem("highscores"));
    if (highscores == null) {
        highscores = [];
    }

    var currentNum = highscores.length + 1;

    // get initials input
    var initialsText = initialsInput.value.trim();
    // get recorded seconds
    var timeLeft = secondsLeft;
    // combine intials and seconds to score entry
    var scoreEntry = currentNum + ". " + initialsText + " - " + timeLeft;
    
    // check if input is empty
    if (initialsText === "") {
        return;
    }

    // push score entries to array
    highscores.push(scoreEntry);
    // initialsInput.value = "";
    
    // call function to store to local storage
    storeScores(highscores);
    window.location.replace("highscores.html");
})


// Array for the available questions
var questionArr = [
    "Commonly used data types DO NOT include:",
    "The condition in an if/ else statement is enclosed within ____.",
    "Arrays in JavaScript can be used to store ____.",
    "Which of these is the strict operator?",
    "What do you call a function inside an object?",
    "The document method that uses the id property is ____.",
    "What does API stand for?"
];

//Object with all available answers
var answerObj = {
    choices: [
        ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        ["1. quotes", "2. curly brackets", "3. parantheses", "4. square brackets"],
        ["1. number and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        ["1. != ", "2. >= ", "3. === ", "4. || "],
        ["1. variable", "2. function", "3. method", "4. nested function"],
        ["1. getElementById()", "2. getElementByClass()", "3. querySelector()", "4. addEventListener()"],
        ["1. Apple Power Integration", "2. Australian Property Institute ", "3. Application Programming Interface", "4. Average Principle Integration"]
    ],
    cheatSheet: [
        ["wrong", "wrong", "correct", "wrong"],
        ["wrong", "correct", "wrong", "wrong"],
        ["wrong", "wrong", "wrong", "correct"],
        ["wrong", "wrong", "correct", "wrong"],
        ["wrong", "wrong", "correct", "wrong"],
        ["correct", "wrong", "wrong", "wrong"],
        ["wrong", "wrong", "correct", "wrong"]
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
        for (var i = 0; i < choicesButtons.length; i++) {
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
    if (secondsLeft <= 0) {
        secondsLeft = 0;
    }
    timerEl.textContent = "Time: " + secondsLeft;
    scoreResult.textContent = secondsLeft;
    quizEl.setAttribute("data-state", "hidden");
    scoreEl.setAttribute("data-state", "visible");
    
}


// Store current scores to local storage.
function storeScores(arr) {
    localStorage.setItem("highscores", JSON.stringify(arr));
}

// Initialize page 
function init() {
    secondsLeft = 0;
    timerEl.textContent = "Time: " + secondsLeft;
}


init();