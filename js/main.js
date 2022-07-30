document.addEventListener("DOMContentLoaded", main);
let hasVisited = JSON.parse(localStorage.getItem("hasVisited"));
let serverTime;

async function fetchTime() {
  return await fetch(
    "https://ordlybackend20220713231604.azurewebsites.net/api/v1/Ordly/currentTime"
  ).then(async (resp) => {
    return await resp.json();
  });
}

async function main() {
  if (!hasVisited) {
    openInfo();
    localStorage.setItem("hasVisited", true);
  }

  initColorMode();
  spawnGrid();
  createKeyboard();
  createSplitKeyboard();
  await initFetch();
  await gameLoop();
  let apiTime = await fetchTime();
  serverTime = new Date(apiTime);
  setInterval(() => {
    serverTime.setMilliseconds(serverTime.getMilliseconds() + 500);
  }, 500);
}