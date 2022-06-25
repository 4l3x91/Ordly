const numberOfGuesses = 6;
let currentGuess = 0;
let chosenWord;
let word = '';

function gameLoop() {
  chosenWord = getRandomWord();
  console.log("The correct word is: " + chosenWord);
  checkInput();
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
    console.log(character);
    buildWord(character);
  }

  if(clickedCharacter === backspace || clickedCharacter === backspaceIcon && word.length > 0) backspaceKey();

  if(clickedCharacter === play && word.length == 5) checkAnswer();
});


function buildWord(character) {
  if (word.length != 5)
  {
    word += character;
    checkInput();
  }

  if(chosenWord.includes(character))
  {
    console.log("There is a " + character + " in this word")
  }
}

function backspaceKey() {
  const element = document.getElementsByClassName("input")[word.length-1];
  element.firstChild.remove();
  
  let editedWord = word.slice(0, -1);
  word = editedWord;
  updateGame(element);
}

function checkAnswer() {
  checkRightWord();
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
  if(currentGuess < numberOfGuesses){
  word = '';
  const grid = document.querySelector(".grid");
  const startChild = grid.children[currentGuess*5];
  updateGame(startChild);
  }
  else{
    console.log("You lost the game.");
  }
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
    console.log("Match");
    return true;
  }
  return false;
}

function isKindaRight(character, index)
{
  // Ge keyboard tangenter en annan färg
  if(chosenWord.includes(character) && chosenWord.indexOf(character) !== index)
  {
    return true;
  }
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