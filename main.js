var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var board, checkButton, wrongButton, randomColor, blueBox1, blueBox2, seg, intervalo, clearTO1, clearTO2, clearTO3;
var points = 0;

var images = {
  bg: "images/bg.jpg",
  happyFox: "images/happyFoxLogo.png",
  seriousFox: "images/seriousFoxLogo.png",
  thinkingFox: "images/thinkingFoxLogo.png",
  foxLogo: "images/foxLogo.png",
  //Coloricious
  bg3: "images/bg3.png",
  blueBox: "images/blueBox2.png",
  checkButton: "images/checkButton.png",
  wrongButton: "images/wrongButton.png",
  trophy: "images/trophy.png",
  graph: "images/graphic.png",
  //Decklicious
  rightArrowButton: "images/rightArrow.png",
  leftArrowButton: "images/leftArrow copy.png",
  redCard: new Image,
  blueCard: new Image, 
  //Keylicious
  keyBoard: "images/keyBoard.png",
};

var songs = {
    right: "audio/right.wav",
    wrong: "audio/wrong.wav",
    good: "audio/goodAnswer2.wav",
    bad: "audio/badAnswer.mp3",
    turiruri: "audio/turiruri.mp3",
  };

function Board(bgSource){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image();
    this.img.src = bgSource || images.bg;
    this.img.onload = function(){
      this.draw();
    }.bind(this);
    this.draw = function(){
      ctx.drawImage(this.img, this.x,this.y, this.width, this.height);
    }
    this.overlay = function(){
        ctx.globalAlpha=0.9;
        ctx.fillStyle="black"; 
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
  }

  function clearAll(){
    document.getElementById("coloricious").innerHTML = "Coloricious"
    document.getElementById("decklicious").innerHTML = "Decklicious"
    document.getElementById("keylicious").innerHTML = "Keylicious"
    clearInterval(intervalo);
    clearInterval(intervaloDeck);
    clearTimeout(clearTO1);
    clearTimeout(clearTO2);
    clearTimeout(clearTO3);
    clearTimeout(clearTO4);
    clearTimeout(clearTO5);
    ctx.globalAlpha = 1;
    ctx.clearRect(0,0,canvas.width,canvas.height);
  }

  function ColorBox(x,y,width,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.word = "";
    this.randomColor = "";
    this.colors = ["purple", "red", "black", "blue"];
    this.nameColors = ["MORADO", "ROJO", "NEGRO", "AZUL"];
    this.img = new Image();
    this.img.src = images.bg3;
    this.img.onload = function(){
      this.draw();
    }.bind(this);
    this.draw = function(){
      ctx.drawImage(this.img, this.x,this.y, this.width, this.height);
    }
    this.generateRandomColor = function(){
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }
    this.generateRandomWord = function(){
        return this.nameColors[Math.floor(Math.random() * this.nameColors.length)];
    }
    this.write = function(text,color){
        ctx.font = "40px Sigmar One";
        ctx.fillStyle = this.randomColor || color;
        this.word = text;
        switch(this.word){
            case "NEGRO":
            ctx.fillText(this.word, this.x + 55, this.y + 63);
            break;
            case "MORADO":
            ctx.fillText(this.word, this.x + 30, this.y + 63);
            break;
            case "ROJO":
            ctx.fillText(this.word, this.x + 70, this.y + 63);
            break;
            case "AZUL":
            ctx.fillText(this.word, this.x + 70, this.y + 63);
            break;
        }
    }
    this.check = function(randomColor){
        return (this.colors.indexOf(randomColor) === this.nameColors.indexOf(this.word))
    }
  }

  function Button(x,y,width,height,sourceImg,sourceRightAns, sourceWrongAns){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rightAnswerAudio = new Audio();
    this.rightAnswerAudio.src = sourceRightAns;
    this.wrongAnswerAudio = new Audio();
    this.wrongAnswerAudio.src = sourceWrongAns;
    this.img = new Image();
    this.img.src = sourceImg;
    this.img.onload = function(){
    this.draw();
    }.bind(this);
    this.draw = function(){
    ctx.drawImage(this.img, this.x,this.y, this.width, this.height);
    }
  }

  function drawPoints(){
    ctx.fillStyle = "white";
    ctx.fillText("!Haz hecho: " + points + " puntos¡", 190, 250);
    var trophy = new Image();
    trophy.src = images.trophy;
    trophy.onload = function(){
        ctx.drawImage(trophy, 420, 100, 65, 70);
    }
    ctx.font = "20px Sigmar One";
    ctx.fillStyle = "white";
    ctx.fillText("Jugaste mejor que el 60%", 340, 350);
    ctx.fillText("de los jugadores de Coloricious", 340, 380);
    var graph = new Image();
    graph.src = images.graph;
    graph.onload = function(){
        ctx.drawImage(graph, 160, 255, 180, 140);
    }
  }

  function startColorGame(){
    clearAll();
    document.getElementById("coloricious").innerHTML = "Playing Now"
    //Activar teclado
    active = 0;
    timer();
    board = new Board();
    clearTO1 = setTimeout(function(){ 
        blueBox1 = new ColorBox(310,150,275,100);
        blueBox2 = new ColorBox(310,250,275,100);
        checkButton = new Button(700, 200, 100, 100, images.checkButton, songs.right, songs.wrong);
        wrongButton = new Button(100, 200, 100, 100, images.wrongButton, songs.right, songs.wrong); 
        clearTO2 = setTimeout(function(){
            blueBox1.write(blueBox1.generateRandomWord(), "black");
            randomColor = blueBox2.generateRandomColor();
            blueBox2.write(blueBox2.generateRandomWord(), randomColor);
            clearTO3 = setTimeout(function(){
                active = 1;
                board.overlay();
                drawPoints();
                document.getElementById("coloricious").innerHTML = "Coloricious"
            }, 20500);//40500
        },300);
     }, 300);
  }

  function timer(){
    seg = 20; //40
    intervalo = setInterval(function(){
        board.draw();
        checkButton.draw();
        wrongButton.draw();
        blueBox1.draw();
        blueBox2.draw();
        blueBox1.write(blueBox1.word, "black");
        blueBox2.write(blueBox2.word, randomColor);
        ctx.fillStyle = "white";
        ctx.fillText("Timer: " + seg, 340, 80);
        seg--;
        if(seg < 0 ) {clearInterval(intervalo)};
      }, 1000);
  }

  function nextRound(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    board.draw();
    checkButton.draw();
    wrongButton.draw();
    blueBox1.draw();
    blueBox2.draw();
    blueBox1.write(blueBox1.generateRandomWord(),"black");
    randomColor = blueBox2.generateRandomColor();
    blueBox2.write(blueBox2.generateRandomWord(), randomColor);
  }

//End of Coloricious 

//Inicio Decklicious
var deck = [];
var randomCard, lastCard, moreY, cards, intervaloDeck, clearTO4, clearTO5;
var pointsDeck = 0;

//Para pre-cargar las imagenes y que se dibujen respetando el orden en el deck
images.redCard.src ="images/Redcard.png",
images.blueCard.src ="images/blueCard.png";

function Card(x,y,width,height,imageP, name){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.name = name;
    this.img = imageP;
    this.draw = function(){
        ctx.drawImage(this.img, this.x,this.y, this.width, this.height);
    }
}

function generateDeck(){
    moreY = 0; 
    for(var i = 0; i < 20; i++){
        cards = [images.redCard, images.blueCard];
        randomCard = Math.floor(Math.random() * cards.length);
        if(randomCard === 0){
            deck.push(new Card(370, 110 + moreY, 140, 180, cards[randomCard], "red"));
            moreY += 8;
        } else {
            deck.push(new Card(370, 110 + moreY, 140, 180, cards[randomCard], "blue"));
            moreY += 8;
        }
    }
}

function isRightCard(nameCard){
    lastCard = deck[deck.length - 1];
    console.log(lastCard.name);
    console.log(nameCard.name);
    return lastCard.name === nameCard.name;
}

function drawDeck(){
    moreY = 0; 
    for(var i = 0; i < 20; i++){
        deck[i].y = 110 + moreY;
        deck[i].draw();
        moreY += 8;
    }
}

function takeOff(){
    //Limpio y vuelvo a dibujar
    ctx.clearRect(0,0,canvas.width,canvas.height);
    board.draw();
    rightArrow.draw();
    leftArrow.draw();
    redCard.draw();
    blueCard.draw();
    //Se elimina la última carta del array
    deck.pop();
    //Se crea una nueva carta y se coloca al inicio del array
    cards = [images.redCard, images.blueCard];
    randomCard = Math.floor(Math.random() * cards.length);
        if(randomCard === 0){
            deck.unshift(new Card(370, 100 + moreY, 140, 180, cards[randomCard], "red"));
            moreY += 8;
        } else {
            deck.unshift(new Card(370, 100 + moreY, 140, 180, cards[randomCard], "blue"));
            moreY += 8;
        }
    
    //Se vuelve a dibujar el deck
    drawDeck();
}

function drawDeckPoints(){
    ctx.fillStyle = "white";
    ctx.fillText("!Haz hecho: " + pointsDeck + " puntos¡", 190, 250);
    var trophy = new Image();
    trophy.src = images.trophy;
    trophy.onload = function(){
        ctx.drawImage(trophy, 420, 100, 65, 70);
    }
    ctx.font = "20px Sigmar One";
    ctx.fillStyle = "white";
    ctx.fillText("Jugaste mejor que el 40%", 340, 350);
    ctx.fillText("de los jugadores de Decklicious", 340, 380);
    var graph = new Image();
    graph.src = images.graph;
    graph.onload = function(){
        ctx.drawImage(graph, 160, 255, 180, 140);
    }
  }

  function timerDeck(){
    seg = 20; 
    intervaloDeck = setInterval(function(){
        board.draw();
        rightArrow.draw();
        leftArrow.draw();
        redCard.draw();
        blueCard.draw();
        drawDeck();
        ctx.font = "40px Sigmar One";
        ctx.fillStyle = "white";
        ctx.fillText("Timer: " + seg, 330, 80);
        seg--;
        if(seg < 0) {clearInterval(intervaloDeck)};
    }, 1000);
  }

function startDeckGame(){
    clearAll();
    document.getElementById("decklicious").innerHTML = "Playing Now"
    //Activar teclado
    active = 2;
    timerDeck();
    board = new Board();
    clearTO4 = setTimeout(function(){
        rightArrow = new Button(660, 350, 70, 70, images.rightArrowButton, songs.good, songs.bad);
        leftArrow = new Button(160, 350, 70, 70, images.leftArrowButton, songs.good, songs.bad); 
        redCard = new Card(70, 50, 90, 120, images.redCard, "red");
        redCard.draw();
        blueCard = new Card(740, 50, 90, 120, images.blueCard, "blue");
        blueCard.draw();
        generateDeck();
        clearTO5 = setTimeout(function(){
            active = 1;
            board.overlay();
            drawDeckPoints();
            document.getElementById("decklicious").innerHTML = "Decklicious"
            }, 20800);
     }, 300);
}

//Fin de Decklicious

//Inicio de Keylicious
var notes, note1, note2, note3, intervaloKey, rightArea, randomNote;
var pointsKey = 0;
var count = 0;
var timeCount = 0;
//var musicTime = [142 - 142, 159 - 142, 176 - 142, 281 - 142, 303 - 142, 322 - 142, 425 - 142, 451 - 142, 574 - 142, 600 - 142, 622 - 142, 709 - 142, 735 - 142, 769 - 142, 808 - 142, 846 - 142, 867 - 142, 887 - 142, 916 - 142, 946 - 142];
var musicTime = [0, 17, 34, 139, 161, 180, 283, 309, 432, 458, 480, 567, 593, 627, 666, 704, 725, 745, 774, 804];
var musicTrack = [];

function CheckCollition(){
    this.crashWith = function(item){
      return  (this.x < item.x + item.width) &&
              (this.x + this.width > item.x) &&
              (this.y < item.y + item.height) &&
              (this.y + this.height > item.y);
    }
}

function Note(x, y, width, height, color, sourceWrongAns){
    CheckCollition.call(this);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.text = "Ready?";
    this.wrongAnswerAudio = new Audio();
    this.wrongAnswerAudio.src = sourceWrongAns;
    this.draw = function(){
        ctx.fillStyle = this.color; 
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.fall = function(){
        this.y += 3;
    }
}

function drawPointsKey(){
    ctx.font = "40px Sigmar One";
    ctx.fillStyle = "white";
    ctx.fillText("Points: ", 30, 50);
    ctx.fillText(pointsKey + "/21", 30, 100);
}

function TapArea(color){
    CheckCollition.call(this);
    this.x = 230;
    this.y = 420;
    this.width = 438;
    this.height = 50;
    this.color = color;
    this.draw = function(){
        ctx.globalAlpha=0.5;
        ctx.fillStyle = this.color; 
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.globalAlpha=1;
    }
    this.song = new Audio;
    this.song.src = songs.turiruri;
}

function startKeyGame(){
    clearAll();
    document.getElementById("keylicious").innerHTML = "Playing Now"
    //Activar teclado
    active = 3;
    board = new Board(images.keyBoard);
    note1 = new Note(283, 0, 50, 50, "white", songs.bad);
    note2 = new Note(426, 0, 50, 50, "white", songs.bad);
    note3 = new Note(570, 0, 50, 50, "white", songs.bad);
    note4 = new Note(283, 0, 50, 50, "white", songs.bad);
    note5 = new Note(426, 0, 50, 50, "white", songs.bad);
    note6 = new Note(570, 0, 50, 50, "white", songs.bad);
    note7 = new Note(283, 0, 50, 50, "white", songs.bad);
    note8 = new Note(426, 0, 50, 50, "white", songs.bad);
    note9 = new Note(570, 0, 50, 50, "white", songs.bad);
    note10 = new Note(283, 0, 50, 50, "white", songs.bad);
    note11 = new Note(426, 0, 50, 50, "white", songs.bad);
    note12 = new Note(570, 0, 50, 50, "white", songs.bad);
    note13 = new Note(283, 0, 50, 50, "white", songs.bad);
    note14 = new Note(426, 0, 50, 50, "white", songs.bad);
    note15 = new Note(570, 0, 50, 50, "white", songs.bad);
    note16 = new Note(283, 0, 50, 50, "white", songs.bad);
    note17 = new Note(426, 0, 50, 50, "white", songs.bad);
    note18 = new Note(570, 0, 50, 50, "white", songs.bad);
    note19 = new Note(283, 0, 50, 50, "white", songs.bad);
    note20 = new Note(426, 0, 50, 50, "white", songs.bad);
    note21 = new Note(570, 0, 50, 50, "white", songs.bad);
    notes = [note1,note2,note3,note4,note5,note6,note7,note8,note9,note10,note11,note12,note13,note14,note15,note16,note17,note18,note19,note20,note21];
    rightArea = new TapArea("red");
    clearTO7 = setTimeout(function(){
    rightArea.song.play();
    }, 1150);
    interval = setInterval(updateGame, 1000/100)
}

function updateGame(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    board.draw();
    rightArea.draw();
    notes[0].draw();
    notes[0].fall();
    drawPointsKey();
    clearTO9 = setTimeout(function(){
        notes[1].draw();
        notes[1].fall();
    }, 300);
    clearTO9 = setTimeout(function(){
        notes[2].draw();
        notes[2].fall();
    }, 500);
    clearTO9 = setTimeout(function(){
        notes[3].draw();
        notes[3].fall();
    }, 2300);
    clearTO9 = setTimeout(function(){
        notes[4].draw();
        notes[4].fall();
    }, 2600);
    clearTO9 = setTimeout(function(){
        notes[5].draw();
        notes[5].fall();
    }, 2800);
    clearTO9 = setTimeout(function(){
        notes[6].draw();
        notes[6].fall();
    }, 4600);
    clearTO9 = setTimeout(function(){
        notes[7].draw();
        notes[7].fall();
    }, 4900);
    clearTO9 = setTimeout(function(){
        notes[8].draw();
        notes[8].fall();
    }, 5100);
    clearTO9 = setTimeout(function(){
        notes[9].draw();
        notes[9].fall();
    }, 6900);
    clearTO9 = setTimeout(function(){
        notes[10].draw();
        notes[10].fall();
    }, 7200);
    clearTO9 = setTimeout(function(){
        notes[11].draw();
        notes[11].fall();
    }, 7400);
    //se acaba turiruri
    clearTO9 = setTimeout(function(){
        notes[12].draw();
        notes[12].fall();
    }, 9800);
    clearTO9 = setTimeout(function(){
        notes[13].draw();
        notes[13].fall();
    }, 10200);
    clearTO9 = setTimeout(function(){
        notes[14].draw();
        notes[14].fall();
    }, 10700);
    clearTO9 = setTimeout(function(){
        notes[15].draw();
        notes[15].fall();
    }, 11100);
    clearTO9 = setTimeout(function(){
        notes[16].draw();
        notes[16].fall();
    }, 11400);
    clearTO9 = setTimeout(function(){
        notes[17].draw();
        notes[17].fall();
    }, 11700);
    clearTO9 = setTimeout(function(){
        notes[18].draw();
        notes[18].fall();
    }, 12000);
    clearTO9 = setTimeout(function(){
        notes[19].draw();
        notes[19].fall();
    }, 12500);
    clearTO9 = setTimeout(function(){
        notes[20].draw();
        notes[20].fall();
    }, 13000);
      
    timeCount++;
  }

window.onload = function() {
    document.getElementById("coloricious").onclick = function() {
        startColorGame();
    };
    document.getElementById("decklicious").onclick = function() {
        startDeckGame();
    };
    document.getElementById("keylicious").onclick = function() {
        startKeyGame();
    };
};

document.onkeydown = function(e) {
    if(active === 0){
        switch(e.keyCode){
            case 39: //-->
                if(blueBox1.check(randomColor)){
                    points++;
                    checkButton.rightAnswerAudio.play();
                    nextRound();
                } else {
                    checkButton.wrongAnswerAudio.play();
                    nextRound();
                }
            break;
            case 37: //<--
                if(!blueBox1.check(randomColor)){
                    points++;
                    nextRound();
                    wrongButton.rightAnswerAudio.play();
                } else {
                    wrongButton.wrongAnswerAudio.play();
                    nextRound();
                }
            break;
        }
    }
    if(active === 2){
        switch(e.keyCode){
            case 39: //-->
                if(isRightCard(blueCard)){
                    pointsDeck++;
                    takeOff();
                    rightArrow.rightAnswerAudio.play();
                } else {
                    takeOff();
                    rightArrow.wrongAnswerAudio.play();
                }
            break;
            case 37: //<--
                if(isRightCard(redCard)){
                    pointsDeck++;
                    takeOff();
                    leftArrow.rightAnswerAudio.play();
                } else {
                    takeOff();
                    leftArrow.wrongAnswerAudio.play();
                }
            break;
        }
    }
    if(active === 3){
        switch(e.keyCode){
            case 39: //-->
                timeCount = 0;
                if(note3.crashWith(rightArea)){
                    note3.text = "GOOD!";
                    note3.color = "";
                    pointsKey++; 
                    console.log(pointsKey);
                } else {
                    note3.text = "MISS!";
                    //note3.wrongAnswerAudio.play();
                }  
                if(note6.crashWith(rightArea)){
                    note1.text = "GOOD!";
                    pointsKey++; 
                } else {
                    note1.text = "MISS!";
                    //note1.wrongAnswerAudio.play();
                }
                if(note9.crashWith(rightArea)){
                    note1.text = "GOOD!";
                    pointsKey++; 
                } else {
                    note1.text = "MISS!";
                    //note1.wrongAnswerAudio.play();
                }
                if(note12.crashWith(rightArea)){
                    note1.text = "GOOD!";
                    pointsKey++; 
                } else {
                    note1.text = "MISS!";
                    //note1.wrongAnswerAudio.play();
                }
                if(note15.crashWith(rightArea)){
                    note1.text = "GOOD!";
                    pointsKey++; 
                } else {
                    note1.text = "MISS!";
                    //note1.wrongAnswerAudio.play();
                }
                if(note18.crashWith(rightArea)){
                    note1.text = "GOOD!";
                    pointsKey++; 
                } else {
                    note1.text = "MISS!";
                    //note1.wrongAnswerAudio.play();
                }
                if(note21.crashWith(rightArea)){
                    note1.text = "GOOD!";
                    pointsKey++; 
                } else {
                    note1.text = "MISS!";
                    //note1.wrongAnswerAudio.play();
                }
            break;
            case 37: //<--
                //timeCount = 0;
                if(note1.crashWith(rightArea)){
                    note1.text = "GOOD!";
                    pointsKey++; 
                } else {
                    note1.text = "MISS!";
                    //note1.wrongAnswerAudio.play();
                }
                if(note4.crashWith(rightArea)){
                    note1.text = "GOOD!";
                    pointsKey++; 
                } else {
                    note1.text = "MISS!";
                    notes.color = "";
                    //note1.wrongAnswerAudio.play();
                }
                if(note7.crashWith(rightArea)){
                    note1.text = "GOOD!";
                    pointsKey++; 
                } else {
                    note1.text = "MISS!";
                    //note1.wrongAnswerAudio.play();
                }
                if(note10.crashWith(rightArea)){
                    note1.text = "GOOD!";
                    pointsKey++; 
                } else {
                    note1.text = "MISS!";
                    //note1.wrongAnswerAudio.play();
                }
                if(note13.crashWith(rightArea)){
                    note1.text = "GOOD!";
                    pointsKey++; 
                } else {
                    note1.text = "MISS!";
                    //note1.wrongAnswerAudio.play();
                }
                if(note16.crashWith(rightArea)){
                    note1.text = "GOOD!";
                    pointsKey++; 
                } else {
                    note1.text = "MISS!";
                    //note1.wrongAnswerAudio.play();
                }
                if(note19.crashWith(rightArea)){
                    note1.text = "GOOD!";
                    pointsKey++; 
                } else {
                    note1.text = "MISS!";
                    //note1.wrongAnswerAudio.play();
                }
            break;
            case 38: //Up arrow
                timeCount = 0;
                if(note2.crashWith(rightArea)){
                    note1.text = "GOOD!";
                    note2.color = "";
                    pointsKey++; 
                } else {
                    note1.text = "MISS!";
                    //note2.wrongAnswerAudio.play();
                }
                if(note5.crashWith(rightArea)){
                    note1.text = "GOOD!";
                    pointsKey++; 
                } else {
                    note1.text = "MISS!";
                    //note2.wrongAnswerAudio.play();
                }
                if(note8.crashWith(rightArea)){
                    note1.text = "GOOD!";
                    pointsKey++; 
                } else {
                    note1.text = "MISS!";
                    //note2.wrongAnswerAudio.play();
                }
                if(note11.crashWith(rightArea)){
                    note1.text = "GOOD!";
                    pointsKey++; 
                } else {
                    note1.text = "MISS!";
                    //note2.wrongAnswerAudio.play();
                }
                if(note14.crashWith(rightArea)){
                    note1.text = "GOOD!";
                    pointsKey++; 
                } else {
                    note1.text = "MISS!";
                    //note2.wrongAnswerAudio.play();
                }
                if(note17.crashWith(rightArea)){
                    note1.text = "GOOD!";
                    pointsKey++; 
                } else {
                    note1.text = "MISS!";
                    //note2.wrongAnswerAudio.play();
                }
                if(note20.crashWith(rightArea)){
                    note1.text = "GOOD!";
                    pointsKey++; 
                } else {
                    note1.text = "MISS!";
                    //note2.wrongAnswerAudio.play();
                }
            break;
        }
    }
}  
  
  
