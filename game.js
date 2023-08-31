
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0

var executed = false;

$(document).on("keydown", function() {
    if (executed === false) {
    nextSequence();
    executed = true;
}
});


$(".btn").on("click", function(event) {

    var userChosenColour = event.target.id
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

  })
    
  function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success")

    if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
            nextSequence();
          }, 1000);
        
        }
    
    } else {
        console.log("wrong")
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver()
 
    }

}

function nextSequence() {

    userClickedPattern = [];

    level++
    $("#level-title").text("Level " + level)

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
};

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
    },100);
};

function startOver (){
    gamePattern =[];
    executed = false;
    level = 0;
}