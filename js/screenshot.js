const date = new Date();
const currentMonth = date.getMonth() + 1;
const currentDayOfMonth = date.getDate();
const currentYear = date.getFullYear().toString().substr(2, 2);
const weekdays = ["Sön", "Mån", "Tis", "Ons", "Tors", "Fre", "Lör"];
const currentWeekDay = weekdays[date.getDay()];
const currentDate = `${currentWeekDay} ${currentDayOfMonth}/${currentMonth} -${currentYear}`;

async function screenShotMode() {
  if (!gameIsActive) {
    const keyboard = document.querySelector(".keyboard--area");
    const leftKeys = document.querySelector(".left-keys");
    const rightKeys = document.querySelector(".right-keys");
    const tiles = document.querySelector(".grid");
    keyboard.classList.toggle("hide");
    leftKeys.classList.toggle("hide");
    rightKeys.classList.toggle("hide");
    for (let index = 0; index < tiles.children.length; index++) {
      const span = tiles.children[index];
      if (span.firstChild != null) span.firstChild.classList.toggle("hide");
    }
    const removeForm = document.querySelector(".prtsc");

    if (removeForm != null) removeForm.remove();
    
    else {
      const container = document.querySelector(".play--area");
      const screenModeContainer = document.createElement("div");
      screenModeContainer.classList.add("prtsc");
      const screenModeContentTop = document.createElement("div");
      
      const screenModeContentMiddle = document.createElement("div");
      screenModeContentMiddle.classList.add("rank-container");

      const screenModeContentBottom = document.createElement("div");
      screenModeContentTop.innerHTML += `Ordly.se #${await apiFetchId()} - ${currentGuess}/${numberOfGuesses}`;

      const rankImageContainer = document.createElement('div');
      rankImageContainer.classList.add("rank-image-container");
      const rankImage = document.createElement('img');
      rankImage.src = 'https://static.wikia.nocookie.net/leagueoflegends/images/e/ec/Season_2019_-_Diamond_4.png';
      rankImage.style.width = '60px';
      rankImageContainer.append(rankImage);

      const rankBarContainer = document.createElement('div');
      rankBarContainer.classList.add("rank-info-container");

      const rankText = document.createElement('div');
      rankText.innerHTML = 'Platinum';
      rankText.classList.add('rank-text');

      const rankBar = document.createElement('div');
      rankBar.classList.add('rank-bar-container');
      const rankBarText = document.createElement('span');
      rankBarText.classList.add('rank-bar-progress');
      rankBarText.innerHTML = '1200/1500';
      const rankbarFill = document.createElement('div');
      rankbarFill.classList.add("rank-bar-fill");

      rankBar.append(rankBarText, rankbarFill);
      rankBarContainer.append(rankText, rankBar);

      screenModeContentMiddle.append(rankImageContainer, rankBarContainer);

      screenModeContentBottom.innerHTML = `${currentDate}`;
      container.append(screenModeContainer);
      screenModeContainer.append(screenModeContentTop, screenModeContentMiddle, screenModeContentBottom);
    }
  }
}
