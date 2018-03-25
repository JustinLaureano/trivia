var startBtn = document.getElementById('start-btn');
var quizProgress = document.getElementById('progress');
var quizBox = document.getElementById('quiz-box');
var warning = document.getElementById('warning');

var titleCard = `<div class="title-card">
                    <div id="time">Time</div>
                </div>`;

var questionCard = `<h4 id="question">What movie character does Frank often confuse his life with?</h4>
                    <div class="buttons">
                        <button class="btn" id="btn0"><span id="choice0">Eggs</span></button>
                        <button class="btn" id="btn1"><span id="choice1">Pudding</span></button>
                        <button class="btn" id="btn2"><span id="choice2">Darko</span></button>
                        <button class="btn" id="btn3"><span id="choice3">Lambone</span></button>
                    </div>`;

var scoreCard = `<h4 id="score"></h4>
                <p id="rank"></p>
                <a href="index.html" id="restart">
                    <h4>Play Again</h4>
                    <i class='fas fa-redo-alt fa-2x'></i>
                </a>`;

var date = new Date();
var hour = date.getHours();
var minute = date.getMinutes();
var day = date.getDay();

function currentSuffix(hour) {
    if (hour < 12) {
        var suffix = "a.m.";
    } else {
        var suffix = "p.m.";
    }
    return suffix;
};

function currentHour(hour) {
    if (hour > 12) {
        hour -= 12;
    }
    return hour;
};

function currentMinute(minute) {
    if (minute < 10) {
        minute = "0" + minute;
    }
    return minute;
}

function currentTime(hour, minute) {
    var hour = currentHour(hour);
    var minute = currentMinute(minute);
    return hour + ":" + minute
};

function currentDay(day) {
    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    day = weekdays[day];
    return day;
};

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
        quizBox.innerHTML = questionCard;

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
    quizBox.innerHTML = scoreCard;
    var score = document.getElementById('score');
    var rank = document.getElementById('rank');

    score.innerHTML = "Your Score: " + quiz.score + " out of " + shuffleQuestions.length + ".";
    rank.innerHTML = scoreLevel[quiz.score];
};

function shuffle(array) {
	for(var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
	return array;
};

function quizReset() {
    shuffleQuestions = shuffle(questions).slice(0,10);
    var quiz = new Quiz(shuffleQuestions);
    return quiz;
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
    new Question("What product does Charlie seek investors for", ["Grilled Charlie's", "Kitten Mittens", "Dick Towel", "Project Badass"], "Kitten Mittens"),
    new Question("What is Charlie's role within the group", ["The Muscle", "The Looks", "The Brains", "The Wildcard"], "The Wildcard"),
    new Question("Who does Mac & Charlie try to hunt", ["Rickety Cricket", "Bill Ponderosa", "Artemis", "The Waitress"], "Rickety Cricket"),
    new Question("Who is Charlie in love with", ["Fatty McGoo", "The Waitress", "Gail the Snail", "Dee"], "The Waitress"),
    new Question("Who does Mac bang that he is ashamed of", ["Gail the Snail", "Artemis", "Carmen", "Mrs. Kelly"], "Carmen"),
    new Question("Who is Dennis & Dee's annoying cousin", ["Maureen Ponderosa", "Jack Kelly", "Lil Kev", "Gail the Snail"], "Gail the Snail"),
    new Question("What is Frank's idea for a band name", ["Chemical Toilet", "Pecan Sandies", "Dayman", "The Freight Train"], "Pecan Sandies"),
    new Question("What is the name of Charlie's play", ["Nightman Cometh", "Dayman The Musical", "Lethal Weapon 6", "Flowers for Charlie"], "Nightman Cometh"),
    new Question("What did the McPoyle's use to rob the bar", ["Knives", "Plastic Guns", "Nunchucks", "Real Guns"], "Plastic Guns"),
    new Question("What does the I in the D.E.N.N.I.S. system stand for", ["Implication", "It's Complicated", "Inspire Hope", "Intercourse"], "Inspire Hope"),
    new Question("What is the name of Charlie's Horse", ["Pepe Silvia", "Poppins", "Lil' Sebastian", "Peter Nincompoop"], "Peter Nincompoop"),
    new Question("Who is Dennis & Dee's real father", ["Bruce Mathis", "Luther McDonald", "Duncan", "Jack Kelly"], "Bruce Mathis"),
    new Question("What is Rickety Cricket's real name", ["Liam MyPoyle", "Matthew Mara", "Brad Fisher", "Peter Schmidt"], "Matthew Mara"),
    new Question("Whhat was Dee's fake name during football tryouts", ["Duncan", "Bill", "Cole", "Ernie"], "Cole"),
    new Question("What job does Dennis run for in 'The Gang Runs for Office'", ["Comptroller", "Mayor", "County Auditor", "Councelman"], "Comptroller"),
    new Question("What movie character does Frank often confuse his life with", ["John McClane", "Rambo", "Terminator", "Rocky"], "Rambo"),
    new Question("What does Charlies want to smash 'his' kids face into", ["A Pulp", "A Milksteak", "A Jelly", "A Rat"], "A Jelly"),
    new Question("Who takes off their shirt last in 'The Gang Solves the Gas Crisis'", ["Dennis", "Charlie", "Frank", "Mac"], "Mac"),
    new Question("Who is the most underrated actor of all time", ["Dolph Lundgren", "Bruce Willis", "Sinbad", "Al Pacino"], "Dolph Lundgren"),
    new Question("What do Charlie & Dee have the taste for", ["Racoon Meat", "Human Meat", "Beak", "Rum Ham"], "Human Meat"),
    new Question("What game do Frank & Charlie like to play together", ["Gruesome Twosome", "Chess", "Night Crawlers", "Project Badass"], "Night Crawlers"),
    new Question("What is Charlie's favorite hobby", ["Spa Days", "Bashing Rats", "Boiling Denim", "Magnets"], "Magnets"),
    new Question("Who in the show is Dee married to in real life", ["Mac", "Dennis", "Charlie", "Rickety Cricket"], "Mac"),
    new Question("Who has Frank NOT had 'relations' with", ["Charlie's Mom", "Gail the Snail", "Margaret McPoyle", "Artemis"], "Margaret McPoyle"),
    new Question("What actor play's the gang's long lost friend 'Schmitty'", ["Rob Thomas", "Rob Lowe", "Jason Bateman", "Jason Sudeikis"], "Jason Sudeikis"),
    new Question("What year did frank go to Vietnam to open his sweatshop", ["1977", "1985", "1993", "1999"], "1993"),
];

shuffleQuestions = shuffle(questions).slice(0,10);
var quiz = new Quiz(shuffleQuestions);

startBtn.addEventListener('click', function() {
    quizProgress.style.visibility = 'visible';
    warning.style.visibility = "hidden";
    quizBox.innerHTML = titleCard;
    var titleTime = document.getElementById('time');
    titleTime.innerHTML = "<h3>" + currentTime(hour, minute) + currentSuffix(hour) +  " on a " + currentDay(day) + "</h3>";
    setTimeout(populate, 2000);
});
