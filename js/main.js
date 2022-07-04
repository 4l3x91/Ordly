document.addEventListener("DOMContentLoaded", main);
var hasVisited = sessionStorage.getItem("ordly.se");

async function main() {
  spawnGrid();
  createKeyboard();
  createSplitKeyboard();
  await gameLoop();
  
  if (!hasVisited) {
    openInfo();
    sessionStorage.setItem("ordly.se", true);
  }
}