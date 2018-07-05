# Memory Game
It is a memory based game.In this there are 16 cards ,each card has one image on it,player has to find the card in paried which are having same images.  
# Game Rules
* Start the game with play button.  
* Match the cards according to image on it.
# How moves,stars and score is calculated?
   ## Moves:- 
   One paired (matched or unmatched) of card is equal to one move.
   Star are initially set to 4 then when play crossed the move 30 or time 50 seconds.
   They are calculated as follow :-
   * if move > 15 and move < 19 or time > 50 seconds then 3 stars.
   * if move > 18 and move < 25 or time > 120 seconds then 2 stars.
   * for rest cases given 1 star.
                                   
   ## Score:
   It is calculated by formula score =  star * 500 -  (time / 60).
# What is Leader Board?
Leader board is place where player can see the score and stars of another ,divided in two section one is Top 5 and Recent Player.
  ## How do you reach this page?
  There are 2 ways
  * complete the game and submit score to the leader board by giving your player name or any name that you want to show on board.
  * Just click on visit leader board link.
# Language and Technologies Used
  * Html/CSS/JavaScript.
  * Boostrap/jQuery.
  * Firebase Realtime database.
# Boundary Conditions
* 500 milisecond is consider in human reaction time.When things got way faster then 500 miliseconds ,program will break.
* It is without  authentication system so names of player can be repeated.
# Dependencies
* [Awesome Font](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css)
* [jQuery](https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js)
* [firebase.js](https://www.gstatic.com/firebasejs/5.1.0/firebase-app.js)
# End
The link to game https://hunny123.github.io/memory-game-with-lb/leader%20board/index.html


   
        
