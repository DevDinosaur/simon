var buttonColours = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;

var gamePattern = [];
var userClickedPattern = [];

$(window).resize(function() {
    if ($(window).width() <= 650) {
        $('#level-title').text('Tap Anywhere to Start');
    }
}).resize(); // Trigger resize on page load


$(document).keypress(function() {
    
    if (!gameStarted) {
        $("h1").text("Level " + level);
        nextSequence();
        gameStarted = true;
    }
    
});


$(".btn").click(function () {
    
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
})

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        if (level === (userClickedPattern.length)) {
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
    } else {

        console.log("wrong");
        playSound("wrong");
        gameOver();
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();

    }
}

function nextSequence() {
    
    level++;
    console.log("level: " + level);
    $("h1").text("Level " + level.toString());

    
    // Use let to ensure a new binding is created for each iteration
    for (let index = 0; index < gamePattern.length; index++) {
        setTimeout(function() {
            playSound(gamePattern[index]);
            animatePress(gamePattern[index]);
        }, 300 * (index + 1)); // Increase delay for each iteration
    }

    // Wait for all setTimeouts to complete before playing the sound
    setTimeout(function() {
        var randomNumber = Math.round(Math.random() * 3);
        var randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);

        // $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        animatePress(randomChosenColour);

        var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
        audio.play();
    }, 300 * (gamePattern.length + 1)); // Adjust the delay based on the length of gamePattern    
        
    $(".btn").addEventListener("click", function () {
        
        userChosenColour = this.id;
        console.log(userChosenColour);
        
        })
        
    }

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
        
        $("#"+currentColour).removeClass("pressed");

    }, 100);
}

function gameOver() {
    $("body").addClass("game-over");
    setTimeout(function () {
        
        $("body").removeClass("game-over");

    }, 200);
}

function startOver() {
    level = 0;
    gameStarted = false;
    gamePattern = [];
    userClickedPattern = [];
}

