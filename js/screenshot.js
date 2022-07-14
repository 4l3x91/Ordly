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
      const screenModeContentBottom = document.createElement("div");
      screenModeContentTop.innerHTML += `Ordly.se #${await apiFetchId()} - ${currentGuess}/${numberOfGuesses}`;
      screenModeContentBottom.innerHTML = `${currentDate}`;
      container.append(screenModeContainer);
      screenModeContainer.append(screenModeContentTop);
      screenModeContainer.append(screenModeContentBottom);
    }
  }
}
