# Guess the Number Game

A simple web app game where the player guesses a number between 1 and 100. Written using HTML, CSS, and JS. The game's concept is based off of the exercise given in <https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/A_first_splash>, but the JS code and most if not all of the HTML code is written completely from scratch.

## How to Play

The player enters their guess (between 1 and 100) into the guess field, then uses the submit button to submit their guess. The game was built to meet the simple criteria given below:

1. Generate a random number between 1 and 100.
2. Record the turn number the player is on. Start it on 1.
3. Provide the player with a way to guess what the number is.
4. Once a guess has been submitted first record it somewhere so the user can see their previous guesses.
5. Next, check whether it is the correct number.
6. If it is correct:

- Display congratulations message.
- Stop the player from being able to enter more guesses (this would mess the game up).
- Display control allowing the player to restart the game.

7. If it is wrong and the player has turns left:

- Tell the player they are wrong and whether their guess was too high or too low.
- Allow them to enter another guess.
- Increment the turn number by 1.

8. If it is wrong and the player has no turns left:

- Tell the player it is game over.
- Stop the player from being able to enter more guesses (this would mess the game up).
- Display control allowing the player to restart the game.

9. Once the game restarts, make sure the game logic and UI are completely reset, then go back to step 1.

The game also has some styling and extra small functions added to it for quality improvement purposes.
