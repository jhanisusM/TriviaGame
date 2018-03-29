 //  Click events for buttons
 window.onload = function () {
    $("#start").click(main);
    $("#start_main").click(start, main);
    $("#start_bottom").click(main);
    $("#pause").click(pause);
    $("#reset").click(restart);
}
// *******CACHE DUMB***************
//countdown 
var x = 10;
var intervalId;

var clockRunning = false;
var excitedState = false;
var countDonwNumber = x;
var random_num = 0;
var checkArr = [];
var count = 0;
var yay = 0;
var nay = 0;


//Main Function
function main() {
    start();
    clear();
    decrement();
    questionGenerator();
    ansChecker();
    wait();
};




//Function clears all divs
function clear() {
    $("#start_main").empty();
    $("#answers_display").empty();
    $("#yaynay_display").empty();
    $("#countdown_display").empty();
    // $("#question_display").empty();
};


//Function Checks answers!!! 
function ansChecker() {
    count++;
    $("#answers_display").on("click", "button", function (event) {
        var respuesta = $(this).attr("data-name");
        // chokePoint = true;
        if (respuesta === TriviaGame.friends[random_num].c_ans) {
            yay++;
            console.log("THis is yay   --- " + yay);
            correct();
            $("#yaynay_display").empty();
            pause();
        }
        else {
            nay++;
            console.log("THis is nay   --- " + nay);
            wrong();
            $("#yaynay_display").empty();
            pause();
        }
    });

};
//Function coleatly shuts down game 
function pararTodo() {
    $("#start_main").empty();
    $("#answers_display").empty();
    $("#yaynay_display").empty();
    $("#countdown_display").empty();
    $("#question_display").empty();
    stop();
    pause();
    random_num = 0;
    clockRunning = false;
    excitedState = false;
    countDonwNumber = x;
    random_num = 0;
    checkArr = [];
    arrStatus = false;
    count = 0;
    yay = 0;
    nay = 0;
    x = 0;
};

//function is recursive 
function wait() {
    setTimeout(function () {
        restart();
        clear();
        start();
        decrement();
        questionGenerator();
        alto();
        wait();
        // ansChecker();
    }, 7000);
};

// Random function for question 
function random() {
    var arbitrario = Math.floor((Math.random() * 9) + 1);
    // if (jQuery.inArray(arbitrario, checkArr) == -1) {
    checkArr.push(arbitrario);
    count++;
    console.log("THis is count   --- " + count);
    random_num = arbitrario;
    console.log("This is my current array  ----- " + checkArr);
    // }
    //random_num = Math.floor((Math.random() * 9) + 1);
    // if (jQuery.inArray(arbitro, checkArr) > -1) {
};

//Function Generates questions
function questionGenerator() {
    random();
    //  random_num = Math.floor((Math.random() * 9) + 1);
    $("#question_display").html("<h3>" + TriviaGame.friends[random_num].question + "</h3");
    renderButtons(random_num);
};
//Button render
function renderButtons(random_num) {
    for (var i = 0; i < 4; i++) {
        var buttonsOfAnswers = $("<button>");
        buttonsOfAnswers.addClass("btn btn-outline-dark");
        buttonsOfAnswers.attr("data-name", TriviaGame.friends[random_num].p_ans[i]);
        buttonsOfAnswers.text(TriviaGame.friends[random_num].p_ans[i]);
        $("#answers_display").append(buttonsOfAnswers);
    }
};
//function displays ajax objects with a gif 
function correct() {

    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=correct";
    $.ajax({
        url: queryURL,
        method: "GET",
        // async: false,
    }).then(function (response) {
        var imageUrl = response.data.image_original_url;
        var correctImage = $("<img>");
        correctImage.attr("src", imageUrl);
        correctImage.attr("alt", "Correct Image");
        $("#yaynay_display").prepend("<h5> Correct!!!</h5>");
        $("#yaynay_display").append(correctImage);
        // $("#yaynay_display").empty();
    });
}

//function displays ajax objects with a gif 
function wrong() {
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=wrong";
    $.ajax({
        url: queryURL,
        method: "GET",
        // async: false,
    }).then(function (response) {
        var imageUrl = response.data.image_original_url;
        var wrongImage = $("<img>");
        wrongImage.attr("src", imageUrl);
        wrongImage.attr("alt", "Correct Image");
        $("#yaynay_display").prepend("<h5> Wrong!!!</h5>");
        $("#yaynay_display").append(wrongImage);
        //   $("#yaynay_display").empty();
    });
};

//Function sums up total score 
function alto() {
    if (count == 10) {
        clearInterval(intervalId);
        clockRunning = false;
        $("#countdown_display").text("Total Score:");
        $("#question_display").text("Correct guesses :" + yay);
        $("#answers_display").text("Incorrect guesses " + nay);
        if (yay > nay) {
            $("#incorrect_display").text("YOU WON!");
            pararTodo();
        }
        else {
            $("#incorrect_display").text("YOU LOST");
            pararTodo();
        }
        
    }
};

//-------------------------------**********************STOP|PAUSE|RESET FUNCTIONS!************************-------------------------------------
//Function Initiates the countdown.
function start() {
    if (!clockRunning) {
        intervalId = setInterval(decrement, 1000);
        clockRunning = true;
    }
};
// FUnction creats countdown timer

function decrement() {
    countDonwNumber--;
    $("#countdown_display").html("<h3>" + countDonwNumber + "</h3>");
    if (countDonwNumber === 0) {
        stop();

    }
};
//function stops the clock from running 
function pause() {
    clearInterval(intervalId);
    clockRunning = false;
};
//Function HARD stops the clock
function stop() {
    clearInterval(intervalId);
    clockRunning = false;
    countDonwNumber = x;

};
//Function resets all parameters
function restart() {
    stop();
    // $("#countdown_display").empty();
    clockRunning = false;
    var countDonwNumber = x;
};

var TriviaGame = {
    //---------------------------------------------------------------------QUERIES--------------------------------------------------------
    //*****************************FRIENDS QUERIES*******************************
    friends: [
        {
            question: "What is Ross' career?",
            p_ans: ["Veterinarian", "Architect", "Paleontologist", "Author"],
            c_ans: "Paleontologist",
        }, {
            question: "Which friend left their fiancé at the altar on their wedding day?",
            p_ans: ["Phoebe", "Chandler", "Rachel", "Monica"],
            c_ans: "Rachel",
        }, {
            question: "How many times has Ross been married?",
            p_ans: ["Never", "2", "3", "1"],
            c_ans: "3",
        }, {
            question: "Who was the only character out of the six friends who never married?",
            p_ans: ["Phoebe", "Joey", "Chandler", "Monica"],
            c_ans: "Joey",
        }, {
            question: "Which Friend did Gunther have a crush on?",
            p_ans: ["Phoebe", "Chandler", "Monica", "Rachel"],
            c_ans: "Rachel",
        }, {
            question: "Which Friend dated a girl with a prosthetic leg?",
            p_ans: ["Joey", "both Joey and Chandler", "Chandler", "Ross"],
            c_ans: "Both Joey and Chandler",
        }, {
            question: "What is the name of Ross' monkey?",
            p_ans: ["Marvel", "Marcel", "Mark", "Hammy"],
            c_ans: "Marcel",
        }, {
            question: "Which of the following was never a romantic couple?",
            p_ans: ["Ross & Monica", "Phoebe & Mike", "Monica & Chandler", "Ross & Rachel"],
            c_ans: "Phoebe & Mike",
        }, {
            question: "Which Friend did Phoebe try to teach guitar to?",
            p_ans: ["Joey", "Ross", "Monica", "Rachel"],
            c_ans: "Joey",
        }, {
            question: "How did Ross find out about Monica and Chandler?",
            p_ans: ["He saw them through his apartment window", "They revealed it to him", "He overheard a conversation between them on the phone.", "He accidentally heard a message, left by Chandler, on Monica's answering machine"],
            c_ans: "He saw them through his apartment window",
        }],
};
