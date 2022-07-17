document.addEventListener("DOMContentLoaded", main);
var hasVisited = sessionStorage.getItem("ordly.se");

async function main() {
  initColorMode();
  spawnGrid();
  createKeyboard();
  createSplitKeyboard();
  await initFetch();
  await gameLoop();

  if (!hasVisited) {
    openInfo();
    sessionStorage.setItem("ordly.se", true);
  }
}