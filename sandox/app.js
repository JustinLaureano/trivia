function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.isEnded = function() {
    return this.questions.length === this.questionIndex;
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().correctAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.correctAnswer = function(choice) {
    return choice === this.answer;
}

function populate() {
    if (quiz.isEnded()) {
        showScores();
    }
    else {
        //show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show choices
        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        populate();
    }
};

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length + ".";
};

function showScores() {
    var gameOverHtml = "<h1>Result</h1>";
    gameOverHtml += "<h2 id='score'>Your Score: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHtml;
};

function shuffle(array) {
	for(var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
	return array;
};

var questions = [
    new Question("What is Charlie's last name", ["Kelly", "Smith", "Durant", "Thorton"], "Kelly"),
    new Question("Which of the following does Frank always have on him", ["Rumham", "Crack", "His Gun", "Grilled Charlie"], "His Gun"),
    new Question("What was Dee's nickname in high school", ["Ronny the Rat", "The Aluminium Monster", "Dirt Grub", "Fatty McGoo"], "The Aluminium Monster"),
    new Question("What job did Rickety Cricket used to have", ["Lawyer", "Guitar Player", "Janitor", "Priest"], "Priest"),
    new Question("What is the last name of Ryan and Liam", ["McPoyles", "Mathis", "MacDonald", "Birkowitz"], "McPoyles"),
    new Question("What is Mac's favorite type of coat", ["Pea Coat", "Trench Coat", "Duster", "Varsity Letter jacket"], "Duster"),
];

shuffleQuestions = shuffle(questions);

var quiz = new Quiz(shuffleQuestions.slice(3));

populate();