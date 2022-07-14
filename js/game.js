const numberOfGuesses = 6;
let currentGuess = 0;
let word = "";
let gameIsActive = true;
let guessedWords = [];

async function apiFetch() {
  let response = await fetch("http://192.168.0.38:7083/api/v1/Ordly");
  const json = await response.json();
  return json[0].name;
}

async function apiFetchId()
{
  let response = await fetch("http://192.168.0.38:7083/api/v1/Ordly");
  const json = await response.json();
  return json[0].wordId;
}

async function checkLatestUser() {
  let response = await fetch("http://192.168.0.38:7083/api/v1/User/latestUser");
  const json = await response.json();
  return json.userId;
}

async function postUserScore(user) {
  await fetch("http://192.168.0.38:7083/api/v1/User", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: `${user}`,
      totalGames: window.localStorage.getItem("totalGames").toString(),
      totalWins: window.localStorage.getItem("totalWins").toString(),
      currentStreak: window.localStorage.getItem("currentStreak").toString(),
      longestStreak: window.localStorage.getItem("longestStreak").toString(),
    }),
  })
    .then((result) => {
      console.log("Completed with result:", result);
    })
    .catch((err) => {
      console.error(err);
    });
}

async function fetchUser(userId) {
  let response = await fetch(`http://192.168.0.38:7083/api/v1/User/${userId}`);
  const json = await response.json();
  return json;
}

async function mapUser(userId) {
  await postUserScore(userId);
}

async function initFetch() {
  solutionWord = await apiFetch();
  let userId = window.localStorage.getItem("userId");

  if (!userId) {
    latestUser = await checkLatestUser();
    window.localStorage.setItem("userId", Number(latestUser) + 1);
    latestUser = window.localStorage.getItem("userId");
    window.localStorage.setItem("totalGames", 0),
    window.localStorage.setItem("totalWins", 0),
    window.localStorage.setItem("currentStreak", 0),
    window.localStorage.setItem("longestStreak", 0),
    await postUserScore(Number(latestUser));
  } else {
    getUser = JSON.parse(localStorage.getItem("userId"));
  }

  let guessedWords = JSON.parse(localStorage.getItem("guesses"));
  if (!guessedWords) {
    guessedWords = [];
  }
}

  function gameLoop() {
    if (gameIsActive) {
      checkInput();
      word = localStorage.getItem("currentWordGuess") || '';
      renderCurrentGuess();
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
      if (!locked) {
        const character = e.key;
        if (keys.includes(character)) buildWord(character);
        if (
          (word.length == 5 && character == " ") ||
          (character == "Enter" && word.length == 5)
        )
          lock();
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
      backspaceDivs.push(
        backspaceIcon,
        backspaceIconTwo,
        backspace,
        backspaceSplit
      );

      const play = document.querySelector(".play");

      if (keys.includes(character)) buildWord(character);

      if (backspaceDivs.includes(clickedCharacter) && word.length > 0)
        backspaceKey();

      if (clickedCharacter === play && word.length == 5) lock();
    });
  }

  let locked = false;
  function lock() {
    if (!locked) {
      locked = true;
      setTimeout(() => {
        checkAnswer();
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

  function checkWordExists() {
    if (words.includes(word)) return true;
    else return false;
  }

  function checkAnswer() {
    if (!checkWordExists()) {
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
    if (gameIsActive && checkWordExists()) {
      checkRightWord();

      addGuess();

      setTimeout(() => {
        if (solutionWord === word) {
          winningAnimation();
          endGame();
        } else wrongAnswer();
        locked = false;
      }, 1000);
    }
  }

  function updateStats() {
    const userId = window.localStorage.getItem("userId");
    const totalWins = window.localStorage.getItem("totalWins");
    const currentStreak = window.localStorage.getItem("currentStreak");
    const longestStreak = window.localStorage.getItem("longestStreak");
    window.localStorage.setItem("totalWins", Number(totalWins) + 1);
    window.localStorage.setItem("currentStreak", Number(currentStreak) + 1);
    if (currentStreak > longestStreak)
      window.localStorage.setItem("longestStreak", Number(currentStreak) + 1);
    postUserScore(userId);
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
    // renderAllGuesses();
  }

  function endGame() {
    const totalGames = window.localStorage.getItem("totalGames");
    window.localStorage.setItem("totalGames", Number(totalGames) + 1);
    updateStats();
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

  function checkRightWord() {
    let remainingLetters = solutionWord;

    for (let i = 0; i < word.length; i++) {
      if (word[i] === solutionWord[i]) {
        remainingLetters = remainingLetters.replace(word[i], "");
        renderAnswer(word[i], i, "right");
      } else if (!solutionWord.includes(word[i])) {
        renderAnswer(word[i], i, "wrong");
      }
    }

    for (let i = 0; i < word.length; i++) {
      if (remainingLetters.includes(word[i]) && word[i] !== solutionWord[i]) {
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
    setTimeout(() => {
      selectedTile.classList.add(classname, "flip");
    }, 100 * index);

    const keyboard = document.getElementsByClassName("keys");

    for (let i = 0; i < keyboard.length; i++) {
      for (let y = 0; y < keyboard[i].children.length; y++) {
        if (
          character === keyboard[i].children[y].getAttribute("data-char") &&
          !keyboard[i].children[y].classList.contains("right")
        ) {
          setTimeout(() => {
            keyboard[i].children[y].className = classname;
            keyboard[i].children[y].classList.add("flip");
          }, 100 * index);
        }
      }
    }
  }
