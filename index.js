//to store color in form of indexes
let buttonColors = ["red", "blue", "green", "yellow"];
let started = false;

//for matching both patterns
let currentIndex = 0;

//current level of game
let level = 0;

//game pattern
let gamePattern = [];

//user pattern
let userClickedPattern = [];

//handling start of game
$(document).on("keydown", function(event) {
  if ((event.key === "A" && started === false) || started === false) {
    started = true;
    setTimeout(nextSequence, 500);
  }
});

//generating game pattern
function nextSequence() {
  $("h1#level-title").html("Level " + level);
  //generating game color
  let randomNumber = Math.floor(Math.random() * 4);
  //increment level
  level++;
  $("h1#level-title").html("Level " + level);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  //adding sound and animation
  playSound(randomChosenColor);
  addAnimation(randomChosenColor);
}

//recognizing user pattern
$(".btn").click(function(event) {
  //accesing pressed btn and add to user pattern
  let btnPressed = event.target.id;
  userClickedPattern.push(btnPressed);
  //adding sound and animations
  playSound(btnPressed);
  addAnimation(btnPressed);
  //checking pattern
  checkAnswer();

});

//checking pattern element
function checkAnswer() {
  if (userClickedPattern[currentIndex] !== gamePattern[currentIndex]) {
    wrongAnswer();
  } else {
    //checking next element of pattern
    currentIndex++;
    //checking if level is completed
    if (currentIndex === gamePattern.length) {
      currentIndex = 0;
      userClickedPattern = [];
      setTimeout(nextSequence, 1000);
    }
  }
}

//handling wrong pattern
function wrongAnswer() {
  userClickedPattern = [];
  gamePattern = [];
  currentIndex = 0;
  started = false;
  level = 0;
  $("h1#level-title").html("Game Over! Press any key to restart");
  playSound("wrong");
}

//functions to perform actions
function playSound(btnColor) {
  let audio = new Audio("sounds/" + btnColor + ".mp3");
  audio.play();
}

function addAnimation(btnColor) {
  $("#" + btnColor).addClass("pressed");
  setTimeout(function() {
    $("#" + btnColor).removeClass("pressed");
  }, 100)
}
