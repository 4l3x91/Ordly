document.addEventListener("DOMContentLoaded", main);
var hasVisited = sessionStorage.getItem("ordly.se");
let serverTime;

async function fetchTime() {
  return await fetch('https://ordlybackend20220713231604.azurewebsites.net/api/v1/Ordly/currentTime')
  .then(async resp => {
     return await resp.json();
  });
}

async function main() {
  let apiTime = await fetchTime();
  serverTime = new Date(apiTime);
    setInterval(() => {
      serverTime.setMilliseconds(serverTime.getMilliseconds() + 500);
    }, 500);

    // TODO: Move to localStorage
    if (!hasVisited) {
      openInfo();
    sessionStorage.setItem("ordly.se", true);
  }
  initColorMode();
  spawnGrid();
  createKeyboard();
  createSplitKeyboard();
  await initFetch();
  await gameLoop();
}