// Get time element
var timerEl = document.getElementById("timer");
// Set timer to 60 seconds
var secondsLeft = 60;

// Timer functions
function setTime() {
    var timerInterval = setInterval(function(){
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;
        if (secondsLeft === 0){
            clearInterval(timerInterval);
            // Do something, end game and go to results
        }
    }, 1000);
}

setTime()