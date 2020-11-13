var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function(){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Call a function to generate user input

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer (currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("Success")

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();

      }, 1000);

    }

  } else {

    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {$("body").removeClass("game-over");},200);
    $("h1").text("Game over, Click any button to restart");


    startOver();
  }

}



//Generates the random number

function nextSequence() {

  userClickedPattern = [];

  level ++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);
  playSound(randomChosenColour);


}


//Get the sounds for the buttons
function playSound(name) {

  var gameaudio = new Audio("sounds/" + name + ".mp3");
  gameaudio.play();

}

//Animate the buttons
function animatePress(currentColor) {


  $("#" + currentColor).addClass("pressed");


  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}



function startOver() {

  level = 0;
  started = false;
  gamePattern = [];

}
