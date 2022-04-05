// User Clicked pattern array
var userClickedPattern = [];

// Empty array storing colors
var gamePattern = [];

// All colors in an array
var buttonColours = ["red", "blue", "green", "yellow"];

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

var level = 0;
var started = false;

// Random colour choice starts game first time
$(document).keypress(function () {
  if (!started) {
    // If started is false
    setTimeout(function () {
      $("h1").text("Level " + level);
      nextSequence();
      started = true;
    }, 600);
  }
});

// User colour choice
$(".btn").click(function () {
  // Var to store the current clicked colour
  var userChosenColour = $(this).attr("id");
  // Add the the user chosen colour to array (pattern)
  userClickedPattern.push(userChosenColour);
  // Animation for button
  animatePress(userChosenColour);
  // Make sound
  playSound(userChosenColour);
  // Check the answer, passing the last index in the function to check most recent colour
  checkAnswer(userClickedPattern.length - 1);
});

//Check if user clicked button is correct
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // User clicked patter becomes empty array after correct sequence implies it checks every index
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 500);
    $("h1").text("Game Over, Press Any Key to Restart Loser");
    startOver(); //  To restart the game
  }
}

// Function to generate a random number 0-3
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  animatePress(randomChosenColour);
  playSound(randomChosenColour);
}

// Flash button animation
function animatePress(currentColour) {
  var activeButton = $("#" + currentColour);
  activeButton.addClass("pressed");

  setTimeout(function () {
    activeButton.removeClass("pressed");
  }, 100);
}

// Play sound function
function playSound(colour) {
  var audio = new Audio("./static/sounds/" + colour + ".mp3");
  audio.play();
}
