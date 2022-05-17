var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var can = document.getElementById('can');
var cx = can.getContext('2d');

ctx.fillStyle = "Green";
ctx.font = "60px Courier";
ctx.textAlign = "center";
ctx.textBaseline = "top";

var width = canvas.width;
var height = canvas.height;

var blockSize = 60;

var Game = function(word, id, idImg, idBg) {
	this.bg = idBg;
	this.img = idImg;
	this.realWord = 'blockWord';
	this.audioId = id; 
	this.word = word;
}

var gameKo = new Game('Му', 'kow', 'k', 'f');
var gameGa = new Game('Га', 'goose', 'g', 'f1');
var gameHen = new Game('Ко', 'hen', 'h', 'fh');
var gameGoat = new Game('Ме', 'goat', 'gt', 'fg');
var gameSheep = new Game('Бе', 'sheep', 'sh', 'fsh');
var gameMouse = new Game('Пи', 'mouse', 'm', 'fm');
var start = [gameKo, gameGa, gameGoat, gameHen, gameSheep, gameMouse];

var newGame = function() {
	var startI = start[Math.floor(Math.random()*6)];
	return startI;
}


var Block = function(x, y) {
	this.x = x;
	this.y = y;
	this.direction = "down";
};

Block.prototype.drawStroke = function() {
	var x = this.x;
	var y = this.y;
	ctx.strokeStyle = "DeepPink";
	ctx.lineWidth = 3;
	ctx.strokeRect(x, y, blockSize, blockSize);
};

Block.prototype.drawWord = function(word) {
	var a = this.x;
	var b = this.y;
	/*ctx.strokeStyle = "White";*/
	ctx.fillStyle = "White";
	ctx.globalAlpha = 0.7;
	ctx.shadowColor = 'Blue';
    ctx.shadowBlur = 15;
	ctx.fillRect(a, b, blockSize, blockSize);
	ctx.fillStyle = "#6A19F5";	
    ctx.font = "41px Inter";
    ctx.textAlign = "start";	
    ctx.textBaseline = "top";
    ctx.globalAlpha = 1;
    ctx.shadowColor = 'White';
    ctx.shadowBlur = 25;    
    ctx.fillText(word, a+3, b+8);   
};

Block.prototype.move = function() {

	if (this.direction === "right") {
	this.x += blockSize;
	}
	else if (this.direction === "down") {
		this.y += blockSize; 
	} 
	else if (this.direction === "left") {
		this.x -= blockSize; 
	}
	else if (this.direction === "up") {
		this.y -= blockSize; 
	}
}

 var directions = {
 	37: "left",
 	38: "up",
 	39: "right",
 	40: "down"
 }

 Block.prototype.setDirection = function(newDirection) {
 	this.direction = newDirection;
 }

 Block.prototype.equel = function(otherBlock) {
 	return this.x === otherBlock.x && this.y === otherBlock.y; 
 }

function playSound(startWord) {
	var sound = document.getElementById(startWord.audioId);
	sound.play();
	console.log (sound);	
    cx.fillStyle="White";
    cx.globalAlpha = 0.5;
    cx.strokeStyle="DeepPink";
    cx.shadowColor = "White";
    cx.shadowBlur = 10;
    cx.beginPath();
    cx.moveTo(10,25);
    cx.quadraticCurveTo(5,30,5,47.5);
    cx.quadraticCurveTo(5,85,35,85);
    cx.quadraticCurveTo(35,105,15,110);
    cx.quadraticCurveTo(45,105,50,85);
    cx.quadraticCurveTo(110,85,110,47.5);
    cx.quadraticCurveTo(110,8,10,25);
    cx.fill();
    cx.stroke();
    cx.fillStyle = "Red ";
    cx.font = "bold 32px serif";
    cx.textAlign = "left";
    cx.textBaseline = "top";
    cx.globalAlpha = 1;
    cx.fillText(startWord.word, 37, 35);
}


var element = document.getElementById('btn');

element.onclick = function() {
	document.getElementById('btn').style.display = 'none';
	document.getElementById('canvas').style.display = 'block';
	ctx.clearRect(0, 0, width, height);
	var startI = newGame();
	var bg = document.getElementById(startI.bg);
	bg.classList.add('bgactive');
	var img = document.getElementById(startI.img);
	img.classList.add('active');
	var blockWord = [
            new Block(120, 60),
            new Block(840, 180),
            new Block(600, 240),
            new Block(300, 180)
    ];
    for (i=0; i<blockWord.length; i++) {
    	    
 	        blockWord[i].drawWord(startI.word);
 	        
    };

    var block = new Block(0, 0);
    block.drawStroke();

    
    var letter1 = ['Па', 'Ду', 'Ло', 'На', 'Го', 'Мо', 'Ка', 'Се'];
    var letter2 = ['За', 'Гу', 'Са', 'Ра', 'Ки', 'Ди', 'Ба', 'Не'];
    var letter3 = ['Жа', 'Пу', 'Ву', 'Ха', 'Цо', 'Ти', 'Да', 'Фе'];
    var letters = [letter1, letter2, letter3]
    
    var blockPa = [
            new Block(420, 0),
            new Block(540, 120),
            new Block(120, 300),
            new Block(720, 240),
            new Block(1320, 180),
            new Block(900, 60),
            new Block(1260, 0),
            new Block(1140, 120)
    ];
    var letterGame = letters[Math.floor(Math.random()*3)]

    var gameLetters = function() {

    	for (i=0; i<blockPa.length; i++) {
 	        blockPa[i].drawWord(letterGame[i]);
 	    };
 	    return;
 	};

 	gameLetters();

 $('body').keydown(function(event) {
 	var newDirection = directions[event.keyCode];
 	block.setDirection(newDirection);
 	ctx.clearRect(0, 0, width, height);
 	cx.clearRect(0, 0, 150, 150);
    block.move();
    block.drawStroke();
   
    gameLetters();

    for (i=0; i<blockWord.length; i++) {
    	
 	    if (blockWord[i].equel(block)) {
 		    blockWord.splice(i,1);
 		    playSound(startI);
 		}
 		if (blockWord.length===0){
 		document.getElementById('btn').style.display = 'inline-block';
 		var imgDelete = document.getElementsByClassName('active')[0];
	    imgDelete.classList.remove('active');
	    var bgDelete = document.getElementsByClassName('bgactive')[0];
 		bgDelete.classList.remove('bgactive');
 		document.getElementById('canvas').style.display = 'none'; 		
 	    }
 		
 	  blockWord[i].drawWord(startI.word);
 	};

});
 
};
