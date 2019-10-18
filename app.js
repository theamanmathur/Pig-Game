/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, rs, cp, gp;

function init() {
    scores = [0, 0];
    rs = 0; //round score
    cp = 0; //current player
    gp = true; //game is being played or not

    //Hide dice
    document.querySelector(".dice").style.display = "none";

    //resetting all values to Zero
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //resetting player names
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    //removing "winner" class from both players
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    //removing "active" class from both players
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    //setting player1 to be "active"
    document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() {
    //changing the current player
    cp = cp === 0 ? 1 : 0;

    //resetting round score to ZERO
    rs = 0;

    //setting current scores to zero
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //assigning "active" class to the next player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //hiding dice
    document.querySelector(".dice").style.display = "none";


}

//Event listener method for "NEW GAME" button
document.querySelector('.btn-new').addEventListener('click', init);

//initializing the game.
init();

//Event listener method for "ROLL DICE" button
document.querySelector(".btn-roll").addEventListener("click", function () {
    if (gp) {
        var dice = Math.floor(Math.random() * 6) + 1;

        diceObj = document.querySelector(".dice");
        diceObj.style.display = 'block';
        diceObj.src = "dice-" + dice + ".png";

        if (dice !== 1) {
            rs += dice;
            //console.log(cp);
            document.getElementById('current-' + cp).textContent = rs;
        } else {
            nextPlayer();
        }
    }
});

//Event listener method for "HOLD" button
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gp) {
        //adding "current round score" of player to the SCORE
        scores[cp] += rs;

        //updating the game page
        document.getElementById('score-' + cp).textContent = scores[cp];

        //checking if current player won the game
        if (scores[cp] >= 20) {
            document.getElementById('name-' + cp).textContent = 'Winner!';

            //Hide dice
            document.querySelector('.dice').style.display = 'none';

            //adding "winner" class to Winner player
            document.querySelector('.player-' + cp + '-panel').classList.add('winner');

            // removing "active" class from Winner
            document.querySelector('.player-' + cp + '-panel').classList.remove('active');

            //game is Over so, resetting gp to ZERO
            gp = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});
