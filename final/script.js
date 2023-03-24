(function(){

    "use strict";
    console.log(`reading js`);
    
    var audioElement = document.getElementById('bgMusic')

    audioElement.addEventListener("canplay", function(event){
        audioElement.volume = ".2";
    }, false);


    const hp1 = document.getElementById("hp1"); //need one for hp2, peck, dodge, start
    const hp2 = document.getElementById("hp2");
    const peck = document.getElementById("peck");
    const dodge = document.getElementById("dodge");
    const action = document.getElementById("action");
    const audio = new Audio("audio/BIRD_1.mp3");
    const gameData = {
        
        players: ["player one", "player two"],
        score: [200, 200],
        roll: 0,
        index: 0
    }
    
        peck.addEventListener("click",function(){

            gameData.roll = Math.floor(Math.random() * 50) + 1;
    
            if (gameData.index == 0){ 
                gameData.score[1] = gameData.score[1] - gameData.roll;
                hp2.innerHTML = `HP: ${gameData.score[1]}/200`;
                action.innerHTML = "<h3>Player One Pecks...</h3>";
                setTimeout(() => {
                    action.innerHTML = "<h3>What would Player Two do?</h3>";
                }, 3000);
                
            } else {
                gameData.score[0] = gameData.score[0] - gameData.roll;
                hp1.innerHTML = `HP: ${gameData.score[0]}/200`;
                action.innerHTML = "<h3>Player Two Pecks...</h3>";
                setTimeout(() => {
                    action.innerHTML = "<h3>What would Player One do?</h3>";
                }, 3000);
                
            }
            checkWinningCondition();
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
    
        });
    
    
        dodge.addEventListener("click",function(){
            gameData.roll = Math.floor(Math.random() * 50) + 1;
    
            if (gameData.index == 0){ 
                gameData.score[0] = gameData.score[0] + gameData.roll;//add a rule that stops it from going over 200hp and less than zero
                hp1.innerHTML = `HP: ${gameData.score[0]}/200`;
                action.innerHTML = "<h3>Player One Dodges...</h3>";
                setTimeout(() => {
                action.innerHTML = "<h3>What would Player Two do?...</h3>";
                }, 3000);
               
            } else {
                gameData.score[1] = gameData.score[1] + gameData.roll;
                hp2.innerHTML = `HP: ${gameData.score[1]}/200`;
                action.innerHTML = "<h3>Player Two Dodges...</h3>";
                setTimeout(() => {
                action.innerHTML = "<h3>What would Player One do?</h3>";
                }, 3000);
            }
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
    
        });
        
    function checkWinningCondition() {
        let winner = "";
        
        if (gameData.index == 0){
            winner = "Player One";
        if (gameData.score[1] < 1){
            action.innerHTML = `<h3>${winner} has won the battle! Hooray!</h3>`; //add a rule that prevents this rule from being
            document.querySelector(".attack").innerHTML = "";
            audio.play();
       }
    }
        else if (gameData.index == 1) {
            winner = "Player Two";
            if (gameData.score[0] < 1){
            action.innerHTML = `<h3>${winner} has won the battle! Hooray!</h3>`;
            document.querySelector(".attack").innerHTML = ""; 
            audio.play();
       } 
    }
            
    }

})();