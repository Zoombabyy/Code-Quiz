var questions = [
  {
    question: "How do you link your javascript in HTML?",
    choice1: "`<link>`",
    choice2: "`<span>`",
    choice3: "`<script>`",
    choice4: "`<main>`",
    correctChoice: "choice3",
  },
  {
    question: `What is the correct way to call a class in CSS?(class="fancy")`,
    choice1: "#fancy",
    choice2: ".fancy",
    choice3: "fancy",
    choice4: "fancy();",
    correctChoice: "choice2",
  },
  {
    question: "Where does <script> go in HTML",
    choice1: "In <head>",
    choice2: "Outside the <html>",
    choice3: "At the bottom of <body>",
    choice4: "None of these",
    correctChoice: "choice3",
  },
  {
    question: "What is the correct way to link your Javascript?",
    choice1: `"<script href="script.js">"`,
    choice2: `"<script link="script.js">"`,
    choice3: `"<script source="script.js">"`,
    choice4: `"<script src="script.js">"`,
    correctChoice: "choice4",
  },
  {
    question: "What is the correct way to link your CSS?",
    choice1: `"<link href="style.css">"`,
    choice2: `"<link src="style.css">"`,
    choice3: `"<link source="style.css">"`,
    choice4: `"<link rel="style.css">"`,
    correctChoice: "choice1",
  },
  {
    question: "What is the correct sytanx for creating a function?",
    choice1: `function = "#"`,
    choice2: "function() {}",
    choice3: "function:myFunction()",
    choice4: "var function = myFunction()",
    correctChoice: "choice2",
  },
  {
    question: "What is the correct way to call a fucntion?",
    choice1: "myFucntion()",
    choice2: "myFucntion = call",
    choice3: "myFunction[]",
    choice4: "call.myFunction()",
    correctChoice: "choice1",
  },
  {
    question: `What is the definiton of "this"?`,
    choice1:
      "Used to identify a specific person or thing close at hand or being indicated or experienced",
    choice2: `The "this" keyword refers to the object from which the function was called`,
    choice3: "Referring to a specific thing or situation just mentioned",
    choice4: "To the degree or extent indicated",
    correctChoice: "choice2",
  },
  {
    question: "What is the correct way to comment out something?",
    choice1: "// Comment",
    choice2: "/* Comment */",
    choice3: "<-- Comment -->",
    choice4: "These are all correct",
    correctChoice: "choice4",
  },
  {
    question: "What is the correct syntax for writing out an array?",
    choice1: `var choices = ["1", "2", "3", "4"]`,
    choice2: `var choices = {"1 2 3 4"}`,
    choice3: `var choices = "1 2 3 4"`,
    choice4: `var choices = ("1", "2", "3", "4")`,
    correctChoice: "choice1",
  },
];

var nxtBttn = document.querySelector(".next-button");
var endBttn = document.getElementById("end-button");
var choices = document.getElementsByName("choice");
var questionNumber = 1;
var currentScore = 0;
var wrongAttempt = 0;
var indexNumber = 0;

var questionShuffle = [];

function questionShuffler() {
  while (questionShuffle.length <= 9) {
    var random = questions[Math.floor(Math.random() * questions.length)];
    if (!questionShuffle.includes(random)) {
      questionShuffle.push(random);
    }
  }
}

function nextQuestion(input) {
  questionShuffler();

  var currentQuestion = questionShuffle[input];
  document.querySelector(".question-number").innerHTML = questionNumber;
  document.querySelector(".current-score").innerHTML = currentScore;
  document.querySelector(".question-display").innerHTML =
    currentQuestion.question;
  document.getElementById("choice-one-label").innerHTML =
    currentQuestion.choice1;
  document.getElementById("choice-two-label").innerHTML =
    currentQuestion.choice2;
  document.getElementById("choice-three-label").innerHTML =
    currentQuestion.choice3;
  document.getElementById("choice-four-label").innerHTML =
    currentQuestion.choice4;
}

function checkAnswer() {
  var currentQuestion = questionShuffle[indexNumber];
  var currentQuestionAnswer = currentQuestion.correctChoice;
  var correctChoice = null;

  choices.forEach((choice) => {
    if (choice.value === currentQuestionAnswer) {
      correctChoice = choice.labels[0].id;
    }
  });

  if (
    choices[0].checked === false &&
    choices[1].checked === false &&
    choices[2].checked === false &&
    choices[3].checked === false
  ) {
    document.getElementById("choices-con").style.display = "flex";
  }

  choices.forEach((choice) => {
    if (choice.checked === true && choice.value === currentQuestionAnswer) {
      document.getElementById(correctChoice).style.background = "green";

      currentScore++;
      indexNumber++;
    } else if (choice.checked && choice.value !== currentQuestionAnswer) {
      var wrongId = choice.labels[0].id;

      document.getElementById(wrongId).style.background = "red";
      document.getElementById(correctChoice).style.background = "green";

      wrongAttempt++;
      indexNumber++;
    }
  });
}

function handleNextQuestion() {
  checkAnswer();
  clearChecks();

  setTimeout(() => {
    if (indexNumber <= 9) {
      nextQuestion(indexNumber);
    } else {
      endGame();
    }
    resetBackground();
  }, 1000);
}

function resetBackground() {
  choices.forEach((choice) => {
    document.getElementById(choice.labels[0].id).style.background = "";
  });
}

function clearChecks() {
  for (var i = 0; i < choices.length; i++) {
    choices[i].checked = false;
  }
}

function endGame() {
  var finalGrade = (currentScore / 10) * 100;

  document.getElementById("final-grade").innerHTML = finalGrade;
  document.getElementById("wrong-score").innerHTML = wrongAttempt;
  document.getElementById("correct-score").innerHTML = currentScore;
  document.getElementById("score").style.display = "flex";
}

function closeScore() {
  questionNumber = 1;
  currentScore = 0;
  wrongAttempt = 0;
  indexNumber = 0;
  questionShuffle = [];
  nextQuestion(indexNumber);
  document.getElementById("score").style.display = "none";
}

nxtBttn.addEventListener("click", function () {
  questionNumber++;
  handleNextQuestion();
});

endBttn.addEventListener("click", function () {
  closeScore();
});
