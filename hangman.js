var inquirer = require('inquirer');
var Word = require('./word.js');

var wordList = ["orioles","red sox", "white sox","indians","tigers","diamondbacks","braves","cubs","rockies","astros","royals",
					"angels","twins","yankees","athletics","dodgers","marlins","brewers","mets","phillies","pirates","mariners",
					"rays","rangers","blue jays","padres","giants","cardinals","nationals"];

function Game(words) {
	this.words = words;
	this.wins = 0;
	this.loses = 0;
	this.wordToGuess = {};
	this.guessesRemaining = 10;
	this.lettersGuessed = [];

	this.initGame = function() {
		this.wins = 0;
		this.initRound();
	};

	this.initRound = function() {
		this.wordToGuess = new Word(this.selectRandomItem(this.words));
		this.guessesRemaining = 10;
		this.lettersGuessed = [];
		this.getInput();
	};

	this.getInput = function() {
		let _this = this;
		console.log(`Guesses remaining: ${this.guessesRemaining}\nGuess this word: ${this.wordToGuess.getDisplayString()}\n`);
		inquirer.prompt([{
			type: "input",
			name: "letter",
			message: "Enter a letter: ",
			validate: function(value) {
				var pass = value.match(/[A-Za-z]/i) && value.length === 1;
				if (pass) {
					return true;
				}
				return "Please enter a letter";
			}
		}]).then(function(answer) {
			_this.evalGuess(answer.letter);
			if(!_this.evalWinLose()) {
				_this.getInput();
			}
			else {
				_this.playAgain();
			}
		});
	}

	this.playAgain = function() {
		let _this = this;
		inquirer.prompt([{
			type: "confirm",
			name: "again",
			message: "Would you like to play again?",
			default: false
		}]).then(function(answer) {
			if (answer.again) {
				_this.initRound();
			}
			else {
				console.log("Thanks for playing!");
			}
		});
	}

	this.evalGuess = function(letter) {
		console.log("\n");
		if(this.lettersGuessed.includes(letter)) {
			console.log(`You already guessed ${letter}!`);
			return;
		}
		else if(this.wordToGuess.evalGuess(letter)) {
			console.log(`Good guess! "${letter.toUpperCase()}" is in the word.`);
		}
		else {
			console.log(`Try again! "${letter.toUpperCase()}" is not in the word.`);
			this.guessesRemaining--;
		}
			this.lettersGuessed.push(letter);
	};

	this.evalWinLose = function() {
		let gameOver = false;

		if (this.wordToGuess.guessed() && this.guessesRemaining > 0) {
			this.wins++;
			console.log(`Congratulations, you won! The word was "${this.wordToGuess.word}".`);
			console.log(`Wins: ${this.wins}`);
			console.log(`Loses: ${this.loses}`);
			gameOver = true;
		}
		else if (this.guessesRemaining < 1) {
			this.loses++;
			console.log(`Sorry, you lost. The word was "${this.wordToGuess.word}".`);
			console.log(`Wins: ${this.wins}`);
			console.log(`Loses: ${this.loses}`);
			gameOver = true;
		}
		return gameOver;
	};


	this.selectRandomItem = function(arr) {
		var item = arr[((Math.floor(Math.random() * arr.length)))];

		return item;
	};


}

var game = new Game(wordList);
game.initGame();