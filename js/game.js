const numberOfGuesses = 6;
let currentGuess = 0;
let chosenWord;
let word = "";
let gameIsActive = true;
let guessedWords = [];

function gameLoop() {
  if (gameIsActive) {
    chosenWord = getRandomWord();
    console.log("The correct word is: " + chosenWord);
    checkInput();
    gameState(gameIsActive);
  }
}

function gameState(gameIsActive) {
  return gameIsActive;
}

function getRandomWord() {
  const randomNumber = Math.floor(Math.random() * words.length);
  return words[randomNumber];
}

if (gameState) {
  document.addEventListener("keydown", keyPressed);
  function keyPressed(e) {
    const character = e.key;
    if (keys.includes(character)) buildWord(character);
    if (word.length == 5 && character == "Enter") checkAnswer();
    if (word.length > 0 && character == "Backspace") backspaceKey();
  }

  document.addEventListener("click", (e) => {
    const backspaceIcon = document.querySelector(".fa-backspace");
    const backspace = document.querySelector(".backspace");
    const character = e.target.innerHTML;
    const clickedCharacter = e.target;

    const play = document.querySelector(".play");

    if (keys.includes(character)) buildWord(character);

    if (
      clickedCharacter === backspace ||
      (clickedCharacter === backspaceIcon && word.length > 0)
    )
      backspaceKey();

    if (clickedCharacter === play && word.length == 5) checkAnswer();
  });
}

function buildWord(character) {
  if (word.length != 5 && gameIsActive) {
    word += character;

    checkInput();
  }
}

function backspaceKey() {
  if (gameIsActive) {
    const grid = document.querySelector(".grid");
    let currentTile;
    for (let i = 0; i < word.length; i++) {
      currentTile = grid.children[currentGuess * 5 + i];
    }
    currentTile.classList.remove("input");
    currentTile.firstChild.remove();

    let editedWord = word.slice(0, -1);
    word = editedWord;
    updateGame(currentTile);
  }
}

function checkWordExists() {
  if (words.includes(word)) return true;
  else return false;
}

function checkAnswer() {
  if (!checkWordExists()) {
    alertWordDoesNotExist();
  }
  if (gameIsActive && checkWordExists()) {
    checkRightWord();
    currentGuess++;
    guessedWords.push(word);
    if (chosenWord === word) endGame();
    else wrongAnswer();
  }
}

function endGame() {
  gameIsActive = false;
  endGameStyling();
  openForm();
}

function endGameStyling() {
  const playButton = document.querySelector(".play");
  const delButton = document.querySelector(".fa-backspace");
  const grid = document.querySelector(".keys");
  for (let index = 0; index < grid.children.length; index++) {
    grid.children[index].style.color = "#3d3d4a";
  }
  playButton.innerHTML = "";
  delButton.style.color = "#3d3d4a";
}

function wrongAnswer() {
  if (currentGuess < numberOfGuesses) {
    word = "";
    const grid = document.querySelector(".grid");
    const startChild = grid.children[currentGuess * 5];
    updateGame(startChild);
  } else endGame();
}

function checkRightWord() {
  let remainingLetters = chosenWord;

  for (let i = 0; i < word.length; i++) {
    if (word[i] === chosenWord[i]) {
      remainingLetters = remainingLetters.replace(word[i], "");
      renderAnswer(word[i], i, "right");
    } else if (!chosenWord.includes(word[i])) {
      renderAnswer(word[i], i, "wrong");
    }
  }

  for (let i = 0; i < word.length; i++) {
    if (remainingLetters.includes(word[i]) && word[i] !== chosenWord[i]) {
      remainingLetters = remainingLetters.replace(word[i], "");
      renderAnswer(word[i], i, "kinda");
    }
  }
}

function updateGame(tile) {
  setCursor(tile);
}

function renderAnswer(character, index, classname) {
  const grid = document.querySelector(".grid");
  const selectedTile = grid.children[currentGuess * 5 + index];
  selectedTile.classList.add(classname);
  const keyboard = document.querySelector(".keys");
  const keys = keyboard.children;
  for (let i = 0; i < keys.length; i++) {
    if (
      character === keyboard.children[i].getAttribute("data-char") &&
      !keyboard.children[i].classList.contains("right")
    ) {
      keyboard.children[i].className = classname;
    }
  }
}
