$(document).ready(function() {
	//globals
	var time = 20,
		correct = 0, 
		incorrect = 0,
		current = 0,
        trivia = [],
        timer,
        display,
        i,
        randomizedArray,
        mute = false;

    //click to start the game
    $('#start').click(function() {
        game.new();
        playAudio();
    });

    //click to reset the game
    $('#reset').click(function() {
        game.reset();
    });

    //click to toggle the sounds
    $('#mute').click(function() {

        if (mute == false) {

            audio.muted = true;
            $(this).attr('src', 'assets/images/mute.png');
            mute = true;

        } else if (mute == true) {

            audio.muted=false;
            $(this).attr('src', 'assets/images/unmute.png');
            mute = false;

        }
    });

    //audio
    var audio = new Audio();

    //run the audio in a loop
    audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);

    //function to start the music when you click start and show the mute button
    function playAudio() {
        $('#mute').show();
        audio.src = "images/stranger_things.mp3";
        audio.play();
    }


	var game = {

		//pick 10 questions from array
		randomizeQuestions: function() {
			randomizeArray = triviaQuestions.sort(function(a, b) {
				return 0.5 - Math.random();
			});
			for (var i = 0; i < 10; i++) {
				trivia.push(randomizeArray.pop());
			}
		},

		//randomize order of choices
		randomizeChoices: function() {
			for (var i = 0; i < trivia.length; i++) {
				var randomChoice = trivia[i].choices.sort(function(a, b) {
					return 0.5 - Math.random()
				});
			}
		},

		//start new game
		new: function() {
			$("#start").hide();
			game.timerReset();
			timer = setInterval(game.countdown, 1000);
			game.data();
		},
		//countdown clock, if time expires count incorrect, show answer
		countdown: function() {
			if (time > 0) {
				time--;
				$("#timer").html(time);
			} else {
				incorrect++;
				clearInterval(timer);
				$("#timer").html("Time Is UP!");
				$("#question").html("The Correct answer was " + i.correct);
				game.displayAnswer();
			}
		},

		//reset timer to 20 seconds
		timerReset: function() {
			time = 20;
			$("timer").html(time);
		},

		//compare click to correct answer
		check: function() {
			if ($(this).text() == i.correct) {
				game.correct();
			} else {
				game.incorrect();
			}
		},

		//correct answer
		correct: function() {
			correct++;
			clearInterval(timer);
			$("#timer").html("Correct!");
			$("#question").empty();
			game.displayAnswer();
		},

		//incorrect answer
		incorrect: function() {
			incorrect++;
			clearInterval(timer);
			$("#timer").html("incorrect");
			$("#question").html("The correct answer was " + i.correct);
			game.displayAnswer();
		},

		//display current queston
		data: function() {
			i = trivia[current];
			current++;
			$("#question").html(i.question);
			$.each(i.choices, function(index, value) {
				var answer = $("<button>")
					.addClass("btn choice")
					.html(i.choices[index])
					.on("click", game.check);
				$("#answer").append(answer);
			});
		},

		//display the answer after user choice
		displayAnswer: function() {
			var picture = $("<img>")
				.addClass("img-rounded image center-block")
				.attr("src", "assets/images/" + i.images);
			$("#answer").html(picture);
			display = setTimeout(game.nexQuestion, 5000);
		},

		//move to next question/end game
		nexQuestion: function() {
			if (current !== trivia.length) {
				time = 20;
				$("#answer").empty();
				game.new();
			} else {
				game.endGame();
			}
		},

		//show stats on screen on game end
		endGame: function() {
			clearInterval(timer);
			$("#timer").hide();
			$("#question").html("Game Over");
			$("#answer").html("Correct answers: " + correct + "<br>Incorrect Answers: " + incorrect);
			var reset = $("<button>")
				.addClass("btn gameButton")
				.html("Play Again")
				.attr("id", "reset");
			$("#reset").html(reset);
		},

		//reset 
		reset: function() {
			time = 20;
			correct = 0;
			incorrect = 0;
			current = 0;
			timer = undefined;
			choice = undefined;
			display = undefined;
			randomizeArray = undefined;
			i = trivia[current];
			triviaQuestions = triviaQuestions.concat(trivia);
			trivia = [];
		    $('#timer').show();
	        $('#timer').empty();
	        $('#question').empty();
	        $('#answer').empty();
	        $('#reset').empty();
	        game.randomizeQuestions();
	        game.randomizeChoices();
	        game.new();
		}
	};

	//array of questions
	var triviaQuestions = [{
		question: "As seen written on the screen, in what year did season one take place?",
		choices: ["1967", "2001", "1983", "1955"],
		correct: "1983",
		images: "bad_men.gif",
	}, {
		question: "Which of the young boys allowed Eleven to stay at his house as she hid from the Hawkins Lab and Dr. Brenner?",
		choices: ["Mike", "Lucas", "Dustin", "Jonathan"],
		correct: "Mike",
		images: "mike_bike.gif",
	}, {
		question: "Which one of Nancy Wheeler's friends was taken during a get-together at Steve Harrington's house?",
		choices: ["Nancy", "Stacy", "Barb", "Jenny"],
		correct: "Barb",
		images: "barb.gif",
	}, {
		question: "Joyce was able to communicate with her son through the use of which of these?",
		choices: ["Fire", "Electricity", "Automatic Writing", "Ouija Board"],
		correct: "Electricity",
		images: "mom_lights.gif",
	}, {
		question: "Who broke into the government lab in Hawkins, and found the entrance to the creature's world in Chapter Five?",
		choices: ["Steve", "Joyce", "Chief Hopper", "Lonnie"],
		correct: "Chief Hopper",
		images: "hopper_watch.gif",
	}, {
		question: "Which of the following characters entered the Upside Down World first?",
		choices: ["Dustin", "Joyce", "Nancy", "Hopper"],
		correct: "Nancy",
		images: "nancy_bat.gif",
	}, {
		question: "In Chapter Seven, who advised Dustin and the boys on how to make a sensory deprivation tank?",
		choices: ["Lonnie Byers", "Mr. Clark", "Dr. Brenner", "Ted Wheeler"],
		correct: "Mr. Clark",
		images: "mr_clark.gif",
	}, {
		question: "In Chapter One, what was the name of the young boy who vanished in Hawkins, Indiana?",
		choices: ["Jack Sawyer", "Benny Hammond", "Davis Garraty", "Will Byers"],
		correct: "Will Byers",
		images: "will_byers.gif",
	}, {
		question: "Mornings are for ______ and __________.",
		choices: ["Coffee and Contemplation", "Beer and Cigarettes", "Waffles and Syrup", "Leggos and My 'Eggos"],
		correct: "Coffee and Contemplation",
		images: "coffee.gif",
	}, {
		question: "What board-game were the boys playing at the beginning of Chapter One?",
		choices: ["Dungeons and Dragons", "Monopoly", "Risk", "Life"],
		correct: "Dungeons and Dragons",
		images: "d_and_d.gif",
	}, {
		question: "In a flashback scene, Joyce surprises Will with tickets to go see what horror film?",
		choices: ["The Thing", "Friday the 13th: Part 3", "Creepshow", "Poltergeist"],
		correct: "Poltergeist",
		images: "mom_phone.gif",
	}, {
		question: "In the first episode, Will wins one of Dustin's comics. Which one does he ask for?",
		choices: ["Superman", "X-Men", "Batman", "Creepy"],
		correct: "X-Men",
		images: "comic_bet.gif",
	}, {
		question: "What name has Eleven and Dr. Brenner given to the sensory deprivation tank in the secret laboratory?",
		choices: ["The Pond", "The Dip", "The Bath", "The Pool"],
		correct: "The Bath",
		images: "eleven_tank.gif",
	}, {
		question: "Towards the beginning of the first episode, Chief Hopper is told that some kids have been stealing what items from local residents?",
		choices: ["Cars", "Garden Gnomes", "Lawn Chairs", "Mailboxes"],
		correct: "Garden Gnomes",
		images: "hopper_believe.gif",
	}, {
		question: "What is the Dungeons & Dragons inspired name Eleven and the boys give the monster from the Upside-Down?",
		choices: ["Mind Flayer", "Faceless Beast", "Beholder", "Demogorgon"],
		correct: "Demogorgon",
		images: "demagorgon.gif",
	}, {
		question: "When Eleven goes to the diner in search of food, she meets the owner. What is his name?",
		choices: ["Benny", "Barney", "Bobby", "Betsey"],
		correct: "Benny",
		images: "benny_dead.gif",
	}, {
		question: "Dr. Brenner asks Eleven to harm what kind of animal?",
		choices: ["Bunny", "Rat", "Cat", "Bird"],
		correct: "Cat",
		images: "eleven_can.gif",
	}, {
		question: "What is the name of Chief Hopper's daughter?",
		choices: ["Emily", "Anna", "Beth", "Sarah"],
		correct: "Sarah",
		images: "waking_up.gif",
	}, {
		question: "At school, where does Steve tell Nancy to meet him?",
		choices: ["Under The Bleachers", "The Gym", "The Library", "The Bathroom"],
		correct: "The Bathroom",
		images: "nancy_school.gif",
	}, {
		question: "To prove he's alive, how did Eleven make contact with Will?",
		choices: ["The Lights", "Walkie-Talkie", "The Phone", "Text Message"],
		correct: "Walkie-Talkie",
		images: "walkie_talkie.gif",
	}
	];

	game.randomizeQuestions();
	game.randomizeChoices();

})
































