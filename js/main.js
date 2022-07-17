document.addEventListener("DOMContentLoaded", main);
var hasVisited = sessionStorage.getItem("ordly.se");

async function main() {
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