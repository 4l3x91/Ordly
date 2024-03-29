const numberOfGuesses = 6;
let currentGuess = 0;
let word = "";
let gameIsActive = true;
let guessedWords = [];
let prevGames = [];
let guessResult = "";

async function apiFetch() {
  let response = await fetch("https://ordlybackend20220713231604.azurewebsites.net/api/v1/ordly");
  const json = await response.json();
  console.log(json)
  return json;
}

// del
async function apiFetchId() {
  let response = await fetch("https://ordlybackend20220713231604.azurewebsites.net/api/v1/ordly");
  const json = await response.json();
  return json.dailyGameId;
}

async function initFetch() {
  const GetDailyGame = await apiFetch();
  solutionWord = GetDailyGame.word;
  solutionId = GetDailyGame.dailyGameId;
  }

  async function postGuess() {
    let response;
    await fetch("https://ordlybackend20220713231604.azurewebsites.net/api/v2/Ordly/Guess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guess: word
      }),
    })
    .then(result => {
      response = result.json();
    })
      .catch((err) => {
        console.error(err);
      });
      return response;
  }

  async function addPrevGame() {
    let prevGame;
    if(word === solutionWord)
    {
      prevGame = {
        gameID: await apiFetchId(),
        guesses: currentGuess
      }
    }
    else
    {
      prevGame = {
        gameID: await apiFetchId(),
        guesses: "X"
      }
    }

    prevGames.push(prevGame);
    
    stats = JSON.parse(localStorage.getItem("stats"));
    const setStats = {
      totalGames: stats.totalGames.toString(),
      totalWins: stats.totalWins.toString(),
      currentStreak: stats.currentStreak.toString(),
      longestStreak: stats.longestStreak.toString(),
      previousGames: prevGames
    }
    localStorage.setItem("stats", JSON.stringify(setStats));
  }
  async function gameLoop() {
    if (gameIsActive) {
      checkInput();
      word = localStorage.getItem("currentWordGuess") || '';
      renderCurrentGuess();
      await initLocalStorage();
    }
  }

  async function initLocalStorage() {

    let stats = JSON.parse(localStorage.getItem("stats"));
      if (!stats) {
        prevGames = [];
        const initStats = {
          totalGames: 0,
          totalWins: 0,
          currentStreak: 0,
          longestStreak: 0,
          previousGames: prevGames
        }
        localStorage.setItem("stats", JSON.stringify(initStats));
        stats = JSON.parse(localStorage.getItem("stats"));
        console.log(stats)
      }
      prevGames = stats.previousGames;
      gameID = await apiFetchId();
      for (let index = 0; index < prevGames.length; index++) {
        if(prevGames[index].gameID === gameID)
        {
          gameIsActive = false;
          endGameStyling();
        }
      }
  }

  if (gameIsActive) {
    document.addEventListener("keydown", keyPressed);
    function keyPressed(e) {
      if (!locked) {
        const character = e.key;
        if (keys.includes(character)) buildWord(character);
        if ((word.length == 5 && character == " ") || (character == "Enter" && word.length == 5)) lock();
        if (word.length > 0 && character == "Backspace") backspaceKey();
        window.localStorage.setItem("currentWordGuess", word);
      }
    }

    document.addEventListener("click", (e) => {
      const backspaceIcon = document.querySelector(".backspace-i");
      const backspaceIconTwo = document.querySelector(".backspace-x");
      const backspace = document.querySelector(".backspace");
      const backspaceSplit = document.querySelector(".split-backspace");
      const character = e.target.innerHTML;
      const clickedCharacter = e.target;
      const backspaceDivs = [];
      backspaceDivs.push(backspaceIcon, backspaceIconTwo, backspace, backspaceSplit);

      const play = document.querySelector(".play");

      if (keys.includes(character)) buildWord(character);
      if (backspaceDivs.includes(clickedCharacter) && word.length > 0) backspaceKey();
      if (clickedCharacter === play && word.length == 5) lock();
    });
  }

  let locked = false;
  function lock() {
    if (!locked) {
      locked = true;
      setTimeout(async () => {
        await checkAnswer();
      }, 10);
    }
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
      if (currentGuess == 5 && word.length == 5) {
        currentTile.classList.remove("input");
        currentTile.firstChild.remove();
      } else {
        currentTile.nextSibling.classList.remove("input");
        currentTile.firstChild.remove();
      }

      let editedWord = word.slice(0, -1);
      word = editedWord;
      updateGame(currentTile);
    }
  }

  function wordDoesNotExist() {
    for (let index = 0; index < word.length; index++) {
      const grid = document.querySelector(".grid");
      const selectedTile = grid.children[currentGuess * 5 + index];
      setTimeout(() => {
        selectedTile.classList.add("faulty");
      }, 10 * index);
      setTimeout(() => {
        selectedTile.classList.remove("faulty");
      }, 500);
      locked = false;
    }
    alertWordDoesNotExist();
  }

  function winningAnimation() {
    for (let index = 0; index < word.length; index++) {
      const grid = document.querySelector(".grid");
      const selectedTile = grid.children[(currentGuess - 1) * 5 + index];
      setTimeout(() => {
        selectedTile.classList.add("jumpy");
      }, 50 * index);
    }
  }

  function addGuess() {
    const guess = {
      word,
      currentGuess,
    };

    guessedWords.push(guess);
    currentGuess++;
    window.localStorage.setItem("guesses", JSON.stringify(guessedWords));
  }

  function endGame() {
    addPrevGame();
    gameIsActive = false;
    setTimeout(() => {
      openForm();
      endGameStyling();
    }, 2000);
  }

  function endGameStyling() {
    const keyboard = document.getElementsByClassName("keys");
    for (let i = 0; i < keyboard.length; i++) {
      for (let y = 0; y < keyboard[i].children.length; y++) {
        if (
          !keyboard[i].children[y].classList.contains("right") &&
          !keyboard[i].children[y].classList.contains("kinda") &&
          !keyboard[i].children[y].classList.contains("wrong")
        )
          keyboard[i].children[y].style.color = "transparent";
      }

      const backspace = document.getElementsByClassName("fa-backspace");
      for (let index = 0; index < backspace.length; index++) {
        backspace[index].style.color = "transparent";
      }
    }
  }

  function wrongAnswer() {
    if (currentGuess < numberOfGuesses) {
      word = "";
      localStorage.setItem("currentWordGuess", word);
      const grid = document.querySelector(".grid");
      const startChild = grid.children[currentGuess * 5];
      updateGame(startChild);
    } else {
      window.localStorage.setItem("currentStreak", 0);
      endGame();
    }
  }

 async function checkAnswer() {
  try
  {
    let result = await postGuess();
    for (let index = 0; index < word.length; index++) {
      if(result.result[index] === 2) renderAnswer(word[index], index, "right")
      if(result.result[index] === 1) renderAnswer(word[index], index, "kinda")
      if(result.result[index] === 0) renderAnswer(word[index], index, "wrong")
    }
    addGuess();
    setTimeout(() => {
      if (result.isCompleted) {
        winningAnimation();
        endGame();
      } else wrongAnswer();
      locked = false;
    }, 1000);
  }
  catch {
    wordDoesNotExist();
  }
}

  function updateGame(tile) {
    setCursor(tile);
  }
  function renderAnswer(character, index, classname) {
    const grid = document.querySelector(".grid");
    const selectedTile = grid.children[currentGuess * 5 + index];
    setTimeout(() => {
      selectedTile.classList.add(classname, "flip");
    }, 100 * index);

    const keyboard = document.getElementsByClassName("keys");

    for (let i = 0; i < keyboard.length; i++) {
      for (let y = 0; y < keyboard[i].children.length; y++) {
        if(character === keyboard[i].children[y].getAttribute("data-char") && classname == "right")
        {
          setTimeout(() => {keyboard[i].children[y].classList.add("flip")}, 100 * index)
          keyboard[i].children[y].className = classname;
        }
        else if(character === keyboard[i].children[y].getAttribute("data-char") && !keyboard[i].children[y].classList.contains("right") && classname == "kinda")
        {
          setTimeout(() => {keyboard[i].children[y].classList.add("flip")}, 100 * index)
          keyboard[i].children[y].className = classname;
        }
        else if(character === keyboard[i].children[y].getAttribute("data-char") && !keyboard[i].children[y].classList.contains("right") && !keyboard[i].children[y].classList.contains("kinda") && classname == "wrong")
        {
          setTimeout(() => {keyboard[i].children[y].classList.add("flip")}, 100 * index)
          keyboard[i].children[y].className = classname;
        }
        
        keyboard[i].children[y].classList.remove("flip");
      }
    }
  }
