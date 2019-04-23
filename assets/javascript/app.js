window.onload = function () {

  //  Click events are done for us:
  $("#startButton").click(countDown.start);
  $("#startButton").click(runQuestions.Questions);
  // $("#startButton").click(runQuestions.Answers);
  $(".data-button").click(runQuestions.WinOrLoose);
  $("#modal_window").hide();
  $("#continue").click(countDown.start);
  // $("#stop").click(stopwatch.stop);
  // $("#reset").click(stopwatch.reset);
  // $("#start").click(stopwatch.start);
};

var intervalId;
var correctCount = 0;
var numberDone = 0;
var clockRunning = false;
var correctCount = 0;
var wrongCount = 0;
var picked;
var chosenQuestion = 0;
var textGuess = " ";

var runQuestions = {
  questions: [
    "Hey now, you're an all-star, get your ____ on, go play. Hey now, you're a rock star, get the show on, get paid",
    "A player in a ______ room, the smell of wine and cheap perfumefor",
    "Oh no, not I, I will survive Oh, as long as I know how to ____, I know I'll stay alive",
    "I said maybe, you're gonna be the one that _____ me And after all, you're my wonderwall",
    "I'm just a poor ___ and nobody loves me, He's just a poor ____ from a poor family",
    "His palms are sweaty, knees weak, arms are heavy, There's vomit on his _____ already, mom's spaghetti",
    "My _______ brings all the boys to the yard,And they're like, Its better than yours, Damn right its better than yours",
    "'Cause if you ____ it, then you shoulda put a ring on it, If you ____ it, then you shoulda put a ring on it",
    "As I walk through the ______ of the shadow of death, I take a look at my life and realize there's not much left",
    "You're the ______ thing that I ever did see, I really love your peaches, Want to shake your tree"
  ],
  answers: [
    ['Game', 'Show', 'Thing', 'Play'],
    ['Smokey', 'Dusty', 'Cloudy', 'Pretty'],
    ['Live', 'Love', 'Learn', 'Hate'],
    ['Trades', 'Holds', 'Plays', 'Saves'],
    ['Man', 'Son', 'Boy', 'Father'],
    ['Jeans', 'Shirt', 'Face', 'Sweater'],
    ['Cupcakes', 'Chocolate', 'Milk shake', 'Creampuffs'],
    ['Want', 'Need', 'Like', 'Love'],
    ['Alley', 'River', 'Galley', 'Valley'],
    ['Cutest', 'Sweetest', 'Kindest', 'Pettiest']
  ],

  correctAnswers: [1, 0, 1, 3, 2, 3, 2, 2, 3, 0],


  Questions: function () {
    $("#startButton").hide();
    $("#modal_window").hide();
    $("#gameChoices").show();
    $("#displayScore").text(correctCount);
    $("#header").html("<h1>" + runQuestions.questions[chosenQuestion] + "</h1>");
    picked = runQuestions.correctAnswers[chosenQuestion];
    runQuestions.Answers();


  },

  Answers: function () {

    $( "#gameChoices" ).empty();
    
    $.each(runQuestions.answers[chosenQuestion], function( i, val ) {
      var createQuestions = $("<button>");
      createQuestions.text(val)
      createQuestions.addClass("data-button");
      createQuestions.attr("data-answer", [i]);
      $("#gameChoices").append(createQuestions);
    });

    $(".data-button").click(runQuestions.WinOrLoose);
    
  },

  WinOrLoose: function () {
    userGuess = $(this).attr("data-answer");
    countDown.stop();
    numberDone++;

    // correct guess or wrong guess outcomes
      if (userGuess == picked) {
        correctCount++;
        $("#rightorWrong").text("Correct!");
        $("#rightAnswer").text("");
        console.log("correct" + correctCount);

        runQuestions.ModalBox();
        
        // runQuestions.Questions();

      } else {
        var array = runQuestions.answers[chosenQuestion];
        var string = array[picked];
        wrongCount++;
        userGuess="";
        $("#rightorWrong").text("Wrong!");
        $("#rightAnswer").text("The correct answer is: " + string);
        runQuestions.ModalBox();
        // runQuestions.Questions();
      }
  },

  ModalBox: function () {
    $("#gameChoices").hide();
    $("#modal_window").show();
    $("#image").html("<img src = assets/images/lyric" + (chosenQuestion) + ".jpeg alt='Smiley face'>");
    $( "#header" ).empty();
    chosenQuestion++

    if(numberDone == 10){
      console.log(numberDone)
      runQuestions.Done();
      
    } else{
      console.log("less then" + numberDone)
      $("#continue").click(runQuestions.Questions);
  }
  },

Done: function () {
  $("#continue").hide();
  $("#end").show();
}

};

$(document).ready(function(){
  $("#Restart").click(function(){
      location.reload(true);
  });
});

// Our stopwatch object
var countDown = {

  number: 30,
  intervalId,

  start: function () {

    intervalId = setInterval(countDown.decrement, 1000);
    clockRunning = true;
    $("#timerDisplay").text(countDown.number);
  },

  decrement: function () {
    countDown.number--;
    $("#timerDisplay").text(countDown.number);
    if (countDown.number === 0) {

      countDown.stop();

     runQuestions.WinOrLoose();

    }
  },

  stop: function () {

    countDown.number = 30;
    clearInterval(intervalId);
  }
};
