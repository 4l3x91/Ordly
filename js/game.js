const numberOfGuesses = 6;
let currentGuess = 0;
let chosenWord;
let word = '';
let gameIsActive = true;
let guessedWords = [];


function gameLoop() {
  if(gameIsActive)
  {
    chosenWord = getRandomWord();
    console.log("The correct word is: " + chosenWord);
    checkInput();
    gameState(gameIsActive);
  }
}

function gameState(gameIsActive) {
  console.log(gameIsActive)
  return gameIsActive;
}

function getRandomWord() {
  const randomNumber = Math.floor(Math.random() * words.length);
  return words[randomNumber];
}

if(gameState) {
  document.addEventListener("keydown", keyPressed);
  function keyPressed(e) {
    const character = e.key;
    if (keys.includes(character)) buildWord(character);
    if(word.length == 5 && character == "Enter") checkAnswer();
    if(word.length > 0 && character == "Backspace") backspaceKey();
  }
  
  document.addEventListener("click", (e) => {
  const backspaceIcon = document.querySelector(".fa-backspace");
  const backspace = document.querySelector(".backspace");
  const character = e.target.innerHTML;
  const clickedCharacter = e.target;
  
  const play = document.querySelector(".play");
  
  if (keys.includes(character))
  {
    // console.log(character);
    buildWord(character);
  }
  
  if(clickedCharacter === backspace || clickedCharacter === backspaceIcon && word.length > 0) backspaceKey();
  
  if(clickedCharacter === play && word.length == 5) checkAnswer();
});
}

function buildWord(character) {
  if (word.length != 5 && gameIsActive)
  {
    word += character;
    
    checkInput();
  }
}

function backspaceKey() {
  if(gameIsActive)
  {
    const grid = document.querySelector(".grid");
    let currentTile;
    for(let i = 0; i < word.length; i++)
    {
      currentTile = grid.children[(currentGuess * 5) + i];
    }
    currentTile.classList.remove("input");
    currentTile.firstChild.remove();
    
    let editedWord = word.slice(0, - 1);
    word = editedWord;
    updateGame(currentTile);
  }
}

function checkWordExists() {
  if(words.includes(word)) return true;
  else return false;
}

function checkAnswer() {
  if(!checkWordExists()) console.log("Ordet finns inte.")
  if(gameIsActive && checkWordExists())
  {
    checkRightWord();
    currentGuess++;
    guessedWords.push(word);
    if(chosenWord === word) endGame(); // Add rightAnswer();
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
    grid.children[index].style.color = '#3d3d4a';
    
  }
  playButton.innerHTML = "";
  delButton.style.color = "#3d3d4a";
}

function wrongAnswer() {
  if(currentGuess < numberOfGuesses) {
  word = '';
  const grid = document.querySelector(".grid");
  const startChild = grid.children[currentGuess * 5];
  updateGame(startChild);
  }
  else endGame();
}

function checkRightWord() {
  for(let i = 0; i < word.length; i++)
  {
    if(notExist(word[i]))
    {
      renderAnswer(word[i], i, "wrong");
    }
    else if(isKindaRight(word[i], i))
    {
      renderAnswer(word[i], i, "kinda");
    }
    else if(isRightPlace(word[i], i))
    {
      renderAnswer(word[i], i, "right");
    }
  }
}

function updateGame(tile) {
  setCursor(tile);
}

function renderAnswer(character, index, classname)
{
  const grid = document.querySelector(".grid");
  const selectedTile = grid.children[(currentGuess *5)+index];
  selectedTile.classList.add(classname);
  const keyboard = document.querySelector(".keys");
  const keys = keyboard.children;
  for (let i = 0; i < keys.length; i++) {
    if(character === keyboard.children[i].getAttribute("data-char")) {
      keyboard.children[i].className=classname;
    }
  } 
}

function isRightPlace(character, index)
{
  if(chosenWord.includes(character) && chosenWord.indexOf(character) === index)
  {
    // console.log("Match");
    return true;
  }
  return false;
}

function isKindaRight(character, index)
{
  // console.log("I'm here! " + chosenWord.indexOf(character));
  // Ge keyboard tangenter en annan färg
    if(chosenWord.includes(character) && chosenWord.indexOf(character) != index) return true;
    return false;
}

function notExist(character)
{
  if(!chosenWord.includes(character))
  {
    return true;
  }
  return false;
}