document.addEventListener("DOMContentLoaded", main);
var hasVisited = sessionStorage.getItem("ordly.se");

function main() {
  spawnGrid();
  createKeyboard();
  createSplitKeyboard();
  gameLoop();

  if (!hasVisited) {
    openInfo();
    sessionStorage.setItem("ordly.se", true);
  }
}