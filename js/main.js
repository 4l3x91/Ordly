document.addEventListener("DOMContentLoaded", main);
var hasVisited = sessionStorage.getItem("ordly.se");

async function main() {
  spawnGrid();
  createKeyboard();
  createSplitKeyboard();
  gameLoop();
  await initFetch();

  if (!hasVisited) {
    openInfo();
    sessionStorage.setItem("ordly.se", true);
  }
}