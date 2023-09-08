// Get elements
var startButton = document.getElementById("start-button");
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

startButton.addEventListener("click", function(event) {
    event.preventDefault();
    var element = event.target;
    if (element.matches("div")){
        var state = element.dataset.state;
        if (state === "hidden"){
            element.setAttribute("data-state", "visible");
        } else {
            element.setAttribute("data-state", "hidden");
        }
    }
    
    
    
    setTime()

});
