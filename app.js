/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previousRoll;
var diceDOM = document.querySelector('.dice');

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    //only roll if game is still playing
    if(gamePlaying){
        //1.Get a RANDOM number
        var dice = Math.floor(Math.random() * 2) + 5;

        //2.Display the random number
        document.querySelector('#current-' + activePlayer).textContent = dice;
        diceDOM.style.display = "block";
        diceDOM.src = "dice-"+dice+".png";

        //3.Add to the score IF the random number is NOT 1
        if(dice !== 1 && previousRoll + dice !== 12 ){
            //Add to roundScore
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            previousRoll = dice;
        }else{
            //null the previous score
            previousRoll = 0;
            //NEXT PLAYERS TURN
            nextPlayer();

        }
        
    }

})

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //transfer roundScore to score
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if player won the game
        if(scores[activePlayer] >= 20){
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            diceDOM.style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;
        }else{
            //NEXT PLAYERS TURN
            nextPlayer(); 
        }
    }

})

document.querySelector('.btn-new').addEventListener('click', init)

function nextPlayer(){
    //null the score
    roundScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = '0';

    //pass the turn to the other player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    //change the active class
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function init(){

    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    previousRoll = 0;
    gamePlaying = true;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');


    document.querySelector('.dice').style.display = 'none';

}




