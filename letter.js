function Letter(letter) {
	this.letter = letter;
	this.visible = false;
	if(this.letter === " ") {
		this.visible = true;
	}

	this.reveal = function() {
		this.visible = true;
		return this;
	}
}


module.exports = Letter;