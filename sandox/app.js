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
        element.innerHTML = quiz.getQuestionIndex().text + "?";

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
    element.innerHTML = "Question " + currentQuestionNumber + " of " + shuffleQuestions.length + ".";
};

function showScores() {
    var gameOverHtml = "<h1>Result</h1>";
    gameOverHtml += "<h2 id='score'>Your Score: " + quiz.score + "</h2>";
    gameOverHtml += "<p id='rank'>" + scoreLevel[quiz.score] + "</p>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHtml;
};

function shuffle(array) {
	for(var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
	return array;
};

var scoreLevel = [
    "Your're bloodline has run pure for a 1000 years",
    "You're a stupid science bitch.",
    "It seems you must have a tenuous grasp on the human language in general.",
    "Can I offer you an egg in these trying times?",
    "alright, alright, alright.",
    "Oh, I bet you read a lotta Gordon Wood, huh? You read your Gordon Wood and you regurgitate it from a textbook and you think you're wicked awesome doin' that, And how 'bout 'dem apples? And all that Gordon Wood business.",
    "You haven't even begun to peak.",
    "When you're doing good in the game, you're doing good in life.",
    "Your blowing the nips off everybody with your big brains.",
    "You're a 5 star man!",
    "You are a true Golden God."

];

var questions = [
    new Question("What is Charlie's last name", ["Kelly", "Smith", "Durant", "Thorton"], "Kelly"),
    new Question("Which of the following does Frank always have on him", ["Rumham", "Crack", "His Gun", "Grilled Charlie"], "His Gun"),
    new Question("What was Dee's nickname in high school", ["Ronny the Rat", "The Aluminium Monster", "Dirt Grub", "Fatty McGoo"], "The Aluminium Monster"),
    new Question("What job did Rickety Cricket used to have", ["Lawyer", "Guitar Player", "Janitor", "Priest"], "Priest"),
    new Question("What is the last name of Ryan and Liam", ["McPoyles", "Mathis", "MacDonald", "Birkowitz"], "McPoyles"),
    new Question("What is Mac's favorite type of coat", ["Pea Coat", "Trench Coat", "Duster", "Varsity Letter jacket"], "Duster"),
    new Question("What product does Charlie seek investors for", ["Grilled Charlie's", "Kitten Mittons", "Dick Towel", "Project Badass"], "Kitten Mittons"),
    new Question("What is Charlie's role within the group", ["The Muscle", "The Looks", "The Brains", "The Wildcard"], "The Wildcard"),
    new Question("Who does Mac & Charlie try to hunt", ["Rickety Cricket", "Bill Ponderosa", "Artemis", "The Waitress"], "Rickety Cricket"),
    new Question("Who is Charlie in love with", ["Fatty McGoo", "The Waitress", "Gail the Snail", "Dee"], "The Waitress"),
    new Question("Who does Mac bang that he is ashamed of", ["Gail the Snail", "Artemis", "Carmen", "Mrs. Kelly"], "Carmen"),
    new Question("Who is Dennis & Dee's annoying cousin", ["Maureen Ponderosa", "Jack Kelly", "Lil Kev", "Gail the Snail"], "Gail the Snail"),
    new Question("What is Frank's idea for a band name", ["Chemical Toilet", "Pecan Sandies", "Dayman", "The Freight Train"], "Pecan Sandies"),
    new Question("What is the name of Charlie's play", ["Nightman Cometh", "Dayman The Musical", "Lethal Weapon 6", "Flowers for Charlie"], "Nightman Cometh"),
    new Question("What did the McPoyle's use to rob the bar", ["Knives", "Plastic Guns", "Nunchucks", "Real Guns"], "Plastic Guns"),
    new Question("What does the I in the D.E.N.N.I.S. system stand for", ["Implication", "It's Complicated", "Inspire Hope", "Intercourse"], "Inspire Hope"),
    new Question("What name does Charlie's horse have", ["Pepe Silvia", "Poppins", "Lil' Sebastian", "Peter Nincompoop"], "Peter Nincompoop"),
    new Question("Who is Dennis & Dee's real father", ["Bruce Mathis", "Luther McDonald", "Duncan", "Jack Kelly"], "Bruce Mathis"),
    new Question("What is Rickety Cricket's real name", ["Liam MyPoyle", "Matthew Mara", "Brad Fisher", "Peter Schmidt"], "Matthew Mara"),
    new Question("Whhat was Dee's fake name during football tryouts", ["Z", "Bill", "Cole", "Ernie"], "Cole"),
    new Question("What year did frank go to Vietnam to open his sweatshop", ["1977", "1985", "1993", "1999"], "1993"),
];

shuffleQuestions = shuffle(questions).slice(0,10);

var quiz = new Quiz(shuffleQuestions);

populate();