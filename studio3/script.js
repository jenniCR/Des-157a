(function(){

    "use strict";
    console.log(`reading js`);

    const startGame = document.getElementById("startgame");
    const gameCtrl = document.getElementById("gamecontrol");
    const game = document.getElementById("game");
    const score = document.getElementById("score");
    const actionArea = document.getElementById("actions");

    const gameData = {
        dice: ["1die.jpg", "2die.jpg", "3die.jpg", "4die.jpg", "5die.jpg", "6die.jpg"],
        players: ["player 1", "player 2"],
        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0, //sets it randomly to either 0 or 1 - to pick player!
        gameEnd: 29 //any number that ends the game
    }

    //event handler to start game and changes content on the gameControl <div>
    startGame.addEventListener("click", function(){

        gameData.index = Math.round(Math.random()); //random generates b/w 0-1, round rounds ip/down to 0 or 1
        
        gameCtrl.innerHTML = "<h2>The game has started</h2>"; // quotes for static data
        
        //add quit button to the h2 above
        gameCtrl.innerHTML += '<button id="quit">Wanna Quit?</button>'; //single quote here allows me to use double quotes for the ID no problem. 

        document.getElementById("quit").addEventListener("click", function(){
            location.reload(); //reloads browser page - everything back to where it started
        });

        console.log(gameData.index); //randomly picks player

        setUpTurn();
        console.log("turn set up!");
    });

    //sets the content of game <div> and adds an event handler for the button that will roll the dice.
    function setUpTurn(){
        
        game.innerHTML = `<p>Roll dice for ${gameData.players[gameData.index]}</p>`; //dynamic data (variables) - tick marks
        
        actionArea.innerHTML = '<button id="roll">Roll the dice</button>';

        document.getElementById("roll").addEventListener("click", function(){
            throwDice();
            console.log("rolled the dice");
        });
    }

    //clear actionArea, record 2 dice rolls, send message + show dice, show total
    function throwDice(){
        
        actionArea.innerHTML = ""; //empty! zilch! nada!

        gameData.roll1 = Math.floor(Math.random() * 6) + 1; //generate random number 0-6, round down. Math.ceil has the very low chance to get a 0. 
        gameData.roll2 = Math.floor(Math.random() * 6) + 1;

        game.innerHTML = `<p>Roll the dice for ${gameData.players[gameData.index]}</p>`;
        game.innerHTML += `<img src="${gameData.dice[gameData.roll1-1]}">`; //+= ie adding to the html above
        game.innerHTML += `<img src="${gameData.dice[gameData.roll2-1]}">`;

        gameData.rollSum = gameData.roll1 + gameData.roll2;

        //if statements to check if a 1 is rolled anywhere, or snake eyes
        if(gameData.rollSum == 2){ 
            //ie roll1 + roll2 = 2 - snake eyes
            game.innerHTML += "<p>Oh Snap! Snake eyes - player out. Resetting scores Now. </p>";

            gameData.score[gameData.index] = 0; //score of individual player

            gameData.index ? (gameData.index = 0) : (gameData.index = 1); //ternary operator!

            showCurrentScore();

            setTimeout(setUpTurn, 3000); //gives user time to read and then switches by calling the set up function. 
        }
        else if(gameData.roll1 == 1 || gameData.roll2 == 1){
            
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);

            game.innerHTML += `<p>Oops, ya rolled a one. Switching to ${gameData.players[gameData.index]}</p`;

            setTimeout(setUpTurn, 2000); //setTimeout(function, time-in-ms)
        }
        else{
            
            gameData.score[gameData.index] += gameData.rollSum;

            actionArea.innerHTML = '<button id="rollAgain">Roll Again</button>  <button id="pass">Pass</button>';

            document.getElementById("rollAgain").addEventListener("click", function(){
                setUpTurn();
            });

            document.getElementById("pass").addEventListener("click", function(){
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            });

            checkWinningCondition();
        }
    }

    function checkWinningCondition(){
        
        if(gameData.score[gameData.index] > gameData.gameEnd){ 
            //score of current player > score to end game
            score.innerHTML = `<h2>${gameData.players[gameData.index]} has won the game with a score of ${gameData.score[gameData.index]}! Hooray!</h2>`;

            actionArea.innerHTML = "";

            document.getElementById("quit").innerHTML = "Start a New Game"; //reloads page for new game, same button, new copy
        }
        else{
            //show current score
            showCurrentScore();
        }
    }

    function showCurrentScore(){

        score.innerHTML = `<p>The current score is <strong>${gameData.players[0]}: ${gameData.score[0]}</strong> to <strong>${gameData.players[1]}: ${gameData.score[1]}</strong> </p>`;
    }
})();