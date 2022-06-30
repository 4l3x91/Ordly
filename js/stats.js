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

    if(!gameIsActive) createTodayGameStats(modalMid);
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
    if(chosenWord !== word)
    {
        const correctWordContainer = document.createElement('div');
        correctWordContainer.classList.add("correct-word");
        const correctWord = document.createElement('h3');
        correctWord.innerHTML = "Dagens rätta ord var: ";
        const correctWordSpan = document.createElement('strong');
        correctWordSpan.innerHTML = chosenWord;

        correctWordContainer.append(correctWord);
        correctWord.append(correctWordSpan);
        modalMid.append(correctWordContainer);

    }
}


function createTodayGameStats(modalMid) {
    // const guessContainer = document.createElement('div');
    // guessContainer.classList.add("guesses-today");
    // modalMid.append(guessContainer);
    // const guessTitle = document.createElement('h4');
    // guessTitle.innerHTML += "Dagens spel";
    // guessContainer.append(guessTitle);
    // for (let index = 0; index < currentGuess; index++) {
    //     const guessDiv = document.createElement('div');
    //     guessDiv.innerHTML = guessedWords[index];
    //     guessContainer.append(guessDiv);
    // }

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
    let result = `Femman #1 - ${currentGuess}/${numberOfGuesses}`;
        
    for (let i = 0; i < guessedWords.length; i++) {
        result += "\n"
        
        for (let index = 0; index < guessedWords[i].length; index++) {
            if(guessedWords[i][index] === chosenWord[index]) result += " 🟩";
            else if(chosenWord.includes(guessedWords[i][index]) && guessedWords[i][index] !== chosenWord[index]) result += " 🟧";
            else if(!chosenWord.includes(guessedWords[i][index])) result += " ⬛"
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
    const modalMidTitle = document.createElement('h2');
    modalMidTitle.innerHTML = "Statistik";
    modalMid.append(modalMidTitle);

    if(!gameIsActive)
    {
        const modalMidSubtitle = document.createElement('h5');
        if(chosenWord === word) modalMidSubtitle.innerHTML = `Grattis, du klarade dagens spel på ${mapGuesses[currentGuess]} försök!`;
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
    modalMidStatsPlayedNumber.innerHTML = "1";
    modalMidStatsPlayedNumber.classList.add("stat-number");

    modalMidStats.append(modalMidStatsPlayedContainer);

    modalMidStatsPlayedContainer.append(modalMidStatsPlayedNumber);
    modalMidStatsPlayedContainer.append(modalMidStatsPlayed);

    const modalMidStatsWinPercentageContainer = document.createElement('div');
    const modalMidStatsWinPercentage = document.createElement('div');

    modalMidStatsWinPercentage.innerHTML = "vinst %";

    const modalMidStatsWinPercentageNumber = document.createElement('div');
    modalMidStatsWinPercentageNumber.innerHTML = "100";
    modalMidStatsWinPercentageNumber.classList.add("stat-number");

    modalMidStats.append(modalMidStatsWinPercentageContainer);

    modalMidStatsWinPercentageContainer.append(modalMidStatsWinPercentageNumber);
    modalMidStatsWinPercentageContainer.append(modalMidStatsWinPercentage);


    const modalMidStatsCurrentStreakContainer = document.createElement('div');
    const modalMidStatsCurrentStreak = document.createElement('div');

    modalMidStatsCurrentStreak.innerHTML = "vinstperiod";

    const modalMidStatsCurrentStreakNumber = document.createElement('div');
    modalMidStatsCurrentStreakNumber.innerHTML = "2";
    modalMidStatsCurrentStreakNumber.classList.add("stat-number");

    modalMidStats.append(modalMidStatsCurrentStreakContainer);

    modalMidStatsCurrentStreakContainer.append(modalMidStatsCurrentStreakNumber);
    modalMidStatsCurrentStreakContainer.append(modalMidStatsCurrentStreak);

    const modalMidStatsLongestStreakContainer = document.createElement('div');
    const modalMidStatsLongestStreak = document.createElement('div');

    modalMidStatsLongestStreak.innerHTML = "längsta vinstperiod";

    const modalMidStatsLongestStreakNumber = document.createElement('div');
    modalMidStatsLongestStreakNumber.innerHTML = "5";
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