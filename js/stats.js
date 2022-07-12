function openForm() {
    createForm();
    const modalContainer = document.querySelector(".modal-content");
    modalContainer.addEventListener("click", (e) => {
        if(e.target === modalContainer)
        closeForm();
    })
}

function closeForm() {
    const removeForm = document.querySelector(".modal-wrapper");
    removeForm.remove();


}

function createForm() {
    const { formContent, formContainer } = createContainerModal();

    const { formModal, modalTop } = createTopModal(formContent);

    const modalMid = createMidModal();

    const modalBottom = createBottomModal();

    formModal.append(modalTop, modalMid, modalBottom);

    const formOverlay = createModalOverlay();
    formContainer.append(formOverlay);
}

function createContainerModal() {
    const app = document.querySelector(".app");
    const formContainer = document.createElement('div');
    formContainer.classList.add("modal-wrapper");
    app.append(formContainer);

    const formContent = document.createElement('div');
    formContent.classList.add("modal-content");
    formContainer.append(formContent);
    return { formContent, formContainer };
}

function createTopModal(formContent) {
    const formModal = document.createElement('div');
    formModal.classList.add("modal");
    formContent.append(formModal);

    const modalTop = document.createElement('div');
    modalTop.classList.add("modal-inner-top");

    const modalCloseButton = document.createElement('i');
    modalCloseButton.classList.add("fa-solid", "fa-xmark", "close");
    modalCloseButton.addEventListener("click", closeForm);

    modalTop.append(modalCloseButton);
    return { formModal, modalTop };
}

function createMidModal() {
    const modalMid = document.createElement('div');
    modalMid.classList.add("modal-inner-mid");

    createStats(modalMid);
    createGuessingStats(modalMid);

    if(!gameIsActive) createShareButton(modalMid);
    if(!gameIsActive) createCorrectWord(modalMid);

    return modalMid;
}

function createGuessingStats(modalMid) {
    const numberOfTriesContainer = document.createElement('div');
    numberOfTriesContainer.classList.add("stats-guess-container");

    const numberOfTriesTitle = document.createElement('h4');
    numberOfTriesTitle.innerHTML = "Antal försök";
    numberOfTriesContainer.append(numberOfTriesTitle);

    const numberOfTriesContent = document.createElement('div');
    numberOfTriesContent.classList.add("stats-guess-content");

    for (let index = 0; index < numberOfGuesses; index++) {
        const guessingNumberContainer = document.createElement('div');
        guessingNumberContainer.classList.add("stats-guess");

        const guessingNumber = document.createElement('div');
        guessingNumber.classList.add("guess-index");
        guessingNumber.innerHTML = index + 1;
        guessingNumberContainer.append(guessingNumber);

        const guessingBar = document.createElement('div');
        guessingBar.classList.add("guess-bar");
        guessingBar.innerHTML = "---";
        guessingNumberContainer.append(guessingBar);

        const guessingResult = document.createElement('div');
        guessingResult.classList.add("guess-counter");
        guessingResult.innerHTML = "0";
        guessingNumberContainer.append(guessingResult);

        numberOfTriesContent.append(guessingNumberContainer);
    }
    numberOfTriesContainer.append(numberOfTriesContent);

    modalMid.append(numberOfTriesContainer);
}

function createCorrectWord(modalMid) {
    if(solutionWord !== word)
    {
        const correctWordContainer = document.createElement('div');
        correctWordContainer.classList.add("correct-word");
        const correctWord = document.createElement('h3');
        correctWord.innerHTML = "Dagens rätta ord var: ";
        const correctWordSpan = document.createElement('strong');
        correctWordSpan.innerHTML = solutionWord;

        correctWordContainer.append(correctWord);
        correctWord.append(correctWordSpan);
        modalMid.append(correctWordContainer);
    }
}

function createShareButton(modalMid) {
    const shareButton = document.createElement('button');
    const shareButtonIcon = document.createElement('i');
    shareButtonIcon.classList.add("fa-solid", "fa-share-nodes");
    shareButton.classList.add("share");
    shareButton.append(shareButtonIcon);
    shareButton.innerHTML += "Dela ditt resultat";
    shareButton.addEventListener("click", (e) => {if(e.target === shareButton) shareResult(modalMid)});
    modalMid.append(shareButton);
}

function shareResult(modalMid) {
    let result = `Ordly #gameId - ${currentGuess}/${numberOfGuesses}`;

    for (let i = 0; i < guessedWords.length; i++) {
        result += "\n"
        for (let y = 0; y < guessedWords[i].word.length; y++) {
            if(guessedWords[i].word[y] === solutionWord[y]) result += " 🟩";
            else if(solutionWord.includes(guessedWords[i].word[y]) && guessedWords[i].word[y] !== solutionWord[y]) result += " 🟧";
            else if(!solutionWord.includes(guessedWords[i].word[y])) result += " ⬛"
        }   
    }

    navigator.clipboard.writeText(result);
    const copyText = document.createElement('div');
    copyText.classList.add("result-text");
    copyText.innerHTML = "Resultat kopierat, klistra in i valfritt textfält!";
    modalMid.append(copyText);
}

const mapGuesses = {
    "1": "ett",
    "2": "två",
    "3": "tre",
    "4": "fyra",
    "5": "fem",
    "6": "sex"
}
  
function createStats(modalMid) {
    const totalGames = window.localStorage.getItem("totalGames") || 0;
    const totalWins = window.localStorage.getItem("totalWins") || 0;
    const currentStreak = window.localStorage.getItem("currentStreak") || 0;
    const longestStreak = window.localStorage.getItem("longestStreak") || 0;

    const winPercentage = Math.round((totalWins / totalGames) * 100) || 0;
    const modalMidTitle = document.createElement('h2');
    modalMidTitle.innerHTML = "Statistik";
    modalMid.append(modalMidTitle);

    if(!gameIsActive)
    {
        const modalMidSubtitle = document.createElement('h5');
        if(solutionWord === word) modalMidSubtitle.innerHTML = `Grattis, du klarade dagens spel på ${mapGuesses[currentGuess]} försök!`;
        else modalMidSubtitle.innerHTML = "Du klarade tyvärr inte dagens spel. Försök igen imorgon!";
        modalMid.append(modalMidSubtitle);
    }

    const modalMidStats = document.createElement('div');
    modalMidStats.classList.add("stats");
    modalMid.append(modalMidStats);

    const modalMidStatsPlayedContainer = document.createElement('div');
    const modalMidStatsPlayed = document.createElement('div');

    modalMidStatsPlayed.innerHTML = "spelade";

    const modalMidStatsPlayedNumber = document.createElement('div');
    modalMidStatsPlayedNumber.innerHTML = totalGames;
    modalMidStatsPlayedNumber.classList.add("stat-number");

    modalMidStats.append(modalMidStatsPlayedContainer);

    modalMidStatsPlayedContainer.append(modalMidStatsPlayedNumber);
    modalMidStatsPlayedContainer.append(modalMidStatsPlayed);

    const modalMidStatsWinPercentageContainer = document.createElement('div');
    const modalMidStatsWinPercentage = document.createElement('div');

    modalMidStatsWinPercentage.innerHTML = "vinst %";

    const modalMidStatsWinPercentageNumber = document.createElement('div');
    modalMidStatsWinPercentageNumber.innerHTML = winPercentage;
    modalMidStatsWinPercentageNumber.classList.add("stat-number");

    modalMidStats.append(modalMidStatsWinPercentageContainer);

    modalMidStatsWinPercentageContainer.append(modalMidStatsWinPercentageNumber);
    modalMidStatsWinPercentageContainer.append(modalMidStatsWinPercentage);


    const modalMidStatsCurrentStreakContainer = document.createElement('div');
    const modalMidStatsCurrentStreak = document.createElement('div');

    modalMidStatsCurrentStreak.innerHTML = "vinstperiod";

    const modalMidStatsCurrentStreakNumber = document.createElement('div');
    modalMidStatsCurrentStreakNumber.innerHTML = currentStreak;
    modalMidStatsCurrentStreakNumber.classList.add("stat-number");

    modalMidStats.append(modalMidStatsCurrentStreakContainer);

    modalMidStatsCurrentStreakContainer.append(modalMidStatsCurrentStreakNumber);
    modalMidStatsCurrentStreakContainer.append(modalMidStatsCurrentStreak);

    const modalMidStatsLongestStreakContainer = document.createElement('div');
    const modalMidStatsLongestStreak = document.createElement('div');

    modalMidStatsLongestStreak.innerHTML = "längsta vinstperiod";

    const modalMidStatsLongestStreakNumber = document.createElement('div');
    modalMidStatsLongestStreakNumber.innerHTML = longestStreak;
    modalMidStatsLongestStreakNumber.classList.add("stat-number");

    modalMidStats.append(modalMidStatsLongestStreakContainer);

    modalMidStatsLongestStreakContainer.append(modalMidStatsLongestStreakNumber);
    modalMidStatsLongestStreakContainer.append(modalMidStatsLongestStreak);
}

function createBottomModal() {
    const modalBottom = document.createElement('div');
    modalBottom.classList.add("modal-inner-bottom");

    const modalBottomContent = document.createElement('div');
    modalBottomContent.classList.add("contact");
    const modalBottomContentLeft = document.createElement('div');
    const modalBottomContentRight = document.createElement('div');

    modalBottomContentLeft.innerHTML = "Skapad av Alex";
    modalBottomContentRight.innerHTML = "Inspirerat av engelska Wordle";
    modalBottomContent.append(modalBottomContentLeft);
    modalBottomContent.append(modalBottomContentRight);

    modalBottom.append(modalBottomContent);
    return modalBottom;
}

function createModalOverlay() {
    const formOverlay = document.createElement('div');
    formOverlay.classList.add("modal-overlay");
    return formOverlay;
}