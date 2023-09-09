// Get elements
var startButton = document.getElementById("start-button");
var timerEl = document.getElementById("timer");
var startEl = document.querySelector(".start-container");
var quizEl = document.querySelector(".quiz-container");
var scoreEl = document.querySelector(".finalscore-container");
var bottomResult = document.querySelector(".result");
var questionEl = document.querySelector(".questions");
var choicesChild = document.getElementById("choices");

//  set variables
var secondsLeft = 0;
var currentQuestion;
var index = 0;

timerEl.textContent = "Time: " + secondsLeft;

// Timer functions
function setTime() {
    // Set timer to 60 seconds
    secondsLeft = 60;
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;
        if (secondsLeft === 0 || secondsLeft < 0) {
            clearInterval(timerInterval);
            // End game 
            gameOver();
        }
    }, 1000);
}


// Function when start button is pressed
startButton.addEventListener("click", function (event) {
    setTime();
    nextQuestion();
    startEl.setAttribute("data-state", "hidden");
    quizEl.setAttribute("data-state", "visible");
});

// Function that identifies which answer is clicked in the question
quizEl.addEventListener("click", function (event) {
    var element = event.target;

    if (element.matches("button")) {

        var answer = element.dataset.answer;
        index++;
        if (answer === "correct") {
            // do something, move to next question and set bottom result to correct
            bottomResult.textContent = "Correct!"

            // move to next question.
            nextQuestion();
        } else {
            // do something, substract -15 to timer and set bottom result to wrong
            bottomResult.textContent = "Wrong!"
            if (secondsLeft > 0) {
                // subtract 15 sec from timer
                secondsLeft -= 15;
                // move to next question
                nextQuestion();
            } else {
                secondsLeft = 0;
            }
        }
    }
})

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
        ["wrong", "correct", "wrong", "wrong"], 
        ["wrong", "wrong", "wrong", "correct"], 
        ["correct", "wrong", "wrong", "wrong"], 
        ["wrong", "wrong", "correct", "wrong"], 
        ["wrong", "correct", "wrong", "wrong"],
        ["wrong", "correct", "wrong", "wrong"], 
        ["correct", "wrong", "wrong", "wrong"], 
        ["wrong", "wrong", "correct", "wrong"], 
        ["wrong", "wrong", "wrong", "correct"]
    ],
};




var quizObj = {
    questions: questionArr,
    answers: answerObj
};


function nextQuestion() {
    if (index + 1 <= questionArr.length) {
        currentQuestion = quizObj.questions[index];
        questionEl.textContent = currentQuestion;

        var choicesButtons = quizObj.answers.choices[index];
        var choicesAnswers = quizObj.answers.cheatSheet[index];
        for (var i=0; i< choicesButtons.length; i++){
            choicesChild.children[i].children[0].textContent = choicesButtons[i];
            choicesChild.children[i].children[0].setAttribute("data-answer", choicesAnswers[i])
        }


    } else {
        gameOver();
    }
}

// function to end game and show score
function gameOver() {
    quizEl.setAttribute("data-state", "hidden");
    scoreEl.setAttribute("data-state", "visible");
}
