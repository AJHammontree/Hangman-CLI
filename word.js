var Letter = require('./letter.js');

function Word(word) {
	this.word = word;
	this.length = this.word.length;
	this.letters = [];
	this.word.split("").forEach(function(letter) {
		let letterObj = new Letter(letter);
		this.letters.push(letterObj);
	}, this);

	this.getDisplayString = function() {
		let displayString = "";
		this.letters.forEach(function(letter) {
			if(letter.visible) {
				displayString += letter.letter + " ";
			}
			else {
				displayString += "_ ";
			}
		}, this);
		return displayString;
	}

	this.evalGuess = function(guessLetter) {
		let result = false;
		this.letters.forEach(function(letter) {
			if(guessLetter.toLowerCase() === letter.letter.toLowerCase()) {
				letter.reveal();
				result = true;
			}
		});
		return result;
	}

	this.guessed = function() {
		let result = false;
		let hiddenLetters = this.letters.filter(function(letter) {
			return !letter.visible;
		});
		if(hiddenLetters.length < 1) {
			result = true;
		}
		return result;
	}
}

module.exports = Word;