const numberOfGuesses = 6;
let currentGuess = 0;
let chosenWord;
let word = '';

function gameLoop() {
  chosenWord = getRandomWord();
  console.log("The correct word is: " + chosenWord);
}


function getRandomWord() {
  const randomNumber = Math.floor(Math.random() * words.length);
  return words[randomNumber];
}

document.addEventListener("keydown", keyPressed);
function keyPressed(e) {
  const character = e.key;
  if (keys.includes(character)) buildWord(character);
  if(word.length == 5 && character == "Enter") checkAnswer();
  if(word.length > 0 && e.key == "Backspace") backspaceKey();
}

document.addEventListener("click", (e) => {
  const backspaceIcon = document.querySelector(".fa-backspace");
  const backspace = document.querySelector(".backspace");
  const character = e.target.innerHTML;
  const clickedCharacter = e.target;

  const play = document.querySelector(".play");

  if (keys.includes(character)) buildWord(character);

  if(clickedCharacter === backspace || clickedCharacter === backspaceIcon && word.length > 0) backspaceKey();

  if(clickedCharacter === play && word.length == 5) checkAnswer();
});


function buildWord(character) {
  if (word.length != 5) word += character;
}

function backspaceKey() {
  let editedWord = word.slice(0, -1);
  word = editedWord;
}

function checkAnswer() {
  console.log("Let's see... you guessed: " + word);
  currentGuess++;
  if(chosenWord === word) restartGame(); // Add rightAnswer();
  else wrongAnswer();
}

function restartGame() {
  console.log("Congratulations! You guessed the right word in " + currentGuess + " try!");
  word = '';
  currentGuess = 0;
  gameLoop();
}

function wrongAnswer() {
  if(currentGuess == numberOfGuesses) console.log("You lost the game.");
  else console.log("You're down a guess. You now have " + (numberOfGuesses - currentGuess) + " guesses left.")
}
