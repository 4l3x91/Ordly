document.addEventListener("DOMContentLoaded", main);
var hasVisited = sessionStorage.getItem("ordentlig.se");

function main() {
  spawnGrid();
  createKeyboard();
  gameLoop();

  if (!hasVisited) {
    openInfo();
    sessionStorage.setItem("ordentlig.se", true);
  }
}