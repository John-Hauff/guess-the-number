// Track which turn the user is on
let turn = 1;

const guessTbl = generateTurnHistoryTable();
document.body.append(guessTbl);

// Create a tbody element node which will contain
// the body rows of data for past turns & guesses
// and append it onto the turn history table node
const guessTblBdy = document.createElement('tbody');
guessTbl.appendChild(guessTblBdy);

// Create a number for the user to guess (1 <= n <= 100)
// TODO: Find a way to hide the solution from the player's view in the console
let solution = generateNewSolution(1, 100);
let solutionGuessed = false;

const submissionButton = document.getElementById('guessSubmissionButton');

// Get what the user guessed when the user clicks the submit guess button
submissionButton.addEventListener('click', handleGuessSubmission);

const guessField = document.getElementById('guessField');

// Add event listener for submitting guess when the player presses
// the Enter key while filling out the guess field
guessField.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();

    submissionButton.click();
    // handleGuessSubmission();
  }
});

// Reset the game to its original state
document.getElementById('restartButton').onclick = handleGameRestart;

// Handle a guess submission
function handleGuessSubmission() {
  // Get the user's guess value from the DOM node
  const guess = Number(document.getElementById('guessField').value);

  // Check the validity of the user's guess
  if (!guessIsValid(guess, 1, 100)) {
    return;
  }

  appendRowToTurnHistory(guess);

  // Check if the max turn count has been reached without correct answer guessed
  if (turn >= 10 && guess !== solution) {
    // Tell the user that the game is over and allow user to restart the game
    alert(
      `Sorry, you ran out of guesses. Game over!\nThe correct answer was ${solution}.\nTry again...`
    );

    // Display a button for user to restart the game
    document.getElementById('restartButton').hidden = false;

    return;
  }

  // Check if guess is correct
  if (guess > solution) {
    alert('Sorry, your guess is too high. Try again.');
  } else if (guess < solution) {
    alert('Sorry, your guess is too low. Try again.');
  } else {
    // Otherwise, the guess must be correct
    alert(
      'Congratulations! You have guessed the correct number.\nWant to play again? Select the Restart button.'
    );

    // Set flag to prevent player from making more guesses
    solutionGuessed = true;

    // Display a button for user to restart the game
    document.getElementById('restartButton').hidden = false;
  }

  turn++;
}

function handleGameRestart() {
  // Reset turn count to 1
  turn = 1;

  // Create a new number for the user to guess (1 <= n <= 100)
  solution = generateNewSolution(1, 100);

  clearTableBody();

  clearGuessField();

  solutionGuessed = false;

  document.getElementById('restartButton').hidden = true;
}

// Checks if guess is made and if it's between n and m
function guessIsValid(guess, n, m) {
  if (!guess) {
    alert('No guess detected. Please enter a guess before submitting!');
    return false;
  } else if (solutionGuessed) {
    alert(
      "You've already guessed the correct number.\nPlease select the restart button to start a new game."
    );
    return false;
  } else if (guess < n || guess > m) {
    alert('Invalid guess! Please guess a number between 1 and 100.');
    return false;
  }

  return true;
}

// Generates a random number between n and m
function generateNewSolution(n, m) {
  return Math.floor(Math.random() * (n - m) + m);
}

// Create a table (and its header row) which will display the guesses history
function generateTurnHistoryTable() {
  const guessTbl = document.createElement('table');
  const guessTblHead = document.createElement('thead');

  // Create the column header cells for the table
  const headerRow = document.createElement('tr');
  const turnsColHeaderCell = document.createElement('th');
  const guessesColHeaderCell = document.createElement('th');

  // Append the column header labels to the column header cells of the table
  turnsColHeaderCell.appendChild(document.createTextNode('Turn #'));
  guessesColHeaderCell.appendChild(document.createTextNode('Guess'));

  // Append the column's header cells to the header row of the table
  headerRow.appendChild(turnsColHeaderCell);
  headerRow.appendChild(guessesColHeaderCell);

  // Append the header row of the table to the table's column head node
  guessTblHead.appendChild(headerRow);

  // Append the table head node to the table node
  guessTbl.appendChild(guessTblHead);

  // Give the table a border so it shows on the page
  guessTbl.setAttribute('border', '2');

  return guessTbl;
}

// Creates another row with cells for the guess history table to record the previous turn
function appendRowToTurnHistory(guess) {
  const row = document.createElement('tr');

  const rowHeaderCell = document.createElement('th');
  const prevGuessCell = document.createElement('td');

  // Append the relevant text to the header and guess data cells
  rowHeaderCell.appendChild(document.createTextNode(turn));
  prevGuessCell.appendChild(document.createTextNode(guess));

  // Append the new cells to the new row
  row.appendChild(rowHeaderCell);
  row.appendChild(prevGuessCell);

  // Give the row a class name based on the accuracy of the guess
  row.className = guess === solution ? 'correctGuess' : 'incorrectGuess';

  // Append the new row to the existing table body
  guessTblBdy.appendChild(row);
}

function clearTableBody() {
  while (guessTblBdy.hasChildNodes()) {
    guessTblBdy.removeChild(guessTblBdy.firstChild);
  }
}

function clearGuessField() {
  document.getElementById('guessField').value = '';
}
