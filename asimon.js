var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
const dugmad = document.querySelectorAll(".btn");
var level = 0;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Ниво " + level);
    return randomNumber;
};

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(cc) {
    $("#" + cc).fadeOut(100).fadeIn(100);
    $("#" + cc).addClass("pressed");
    setTimeout(function() {
        $("#" + cc).removeClass("pressed");
    }, 100);
};

function igra() {
    userClickedPattern = [];
    dugmad.forEach((pojDugme) => {
        pojDugme.addEventListener("click", function() {
            var userChosenColour = this.id;
            playSound(userChosenColour);
            animatePress(userChosenColour);
            userClickedPattern.push(userChosenColour);
            ul = userClickedPattern.length
            if (userClickedPattern[ul - 1] != gamePattern[ul - 1]) {
                $("h1").text(level + " Крај игре Притисните било који тастер за наставак ");
                var audio = new Audio("sounds/wrong.mp3");
                document.body.style.background = "#fde4cf";
                setTimeout(function() {
                    document.body.style.background = "white";
                }, 700);
                audio.play();
                igra_traje = false;
            } else if (ul >= gamePattern.length) {
                userClickedPattern = [];
                setTimeout(function() {
                    nextSequence();
                }, 700);
            }
        });
    });
}

var divs = $('div');
var igra_traje = true;

document.onkeypress = function(e) {
    nextSequence();
};

if (igra_traje) {
    igra();
    document.onkeypress = function(e) {
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        nextSequence();
        igra_traje = true;
    };
}
