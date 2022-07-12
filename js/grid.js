const rows = 6;
const cols = 5;

function spawnGrid() {
    for (let index = 0; index < 30; index++) {
        spawnTile();
    }
}

function spawnTile() {
    const tile = document.createElement('div');
    tile.classList.add("tile");
    const grid = document.querySelector(".grid");
    grid.append(tile);
}

function renderCurrentGuess() {
    for (let index = 0; index <= word.length; index++) {
        const grid = document.querySelector(".grid");
        const span = document.createElement("span");

        if(word.length > 0 && index < word.length) renderLetter(grid, index, span, index);
        if(index === word.length && index != 5) renderCursor(grid, index);
    }
}

function checkInput() {
    const grid = document.querySelector(".grid");
    const span = document.createElement("span");
    const startIndex = currentGuess * 5;
    const endIndex = startIndex + 5;
    
    for (let index = startIndex; index < endIndex; index++) {
        let newIndex = index - startIndex;

        if(word.length > 0 && newIndex < word.length) {
            renderLetter(grid, index, span, newIndex);
        }
        if(newIndex === word.length) {
            renderCursor(grid, index);
            break;
        }
    }
    gameState(gameIsActive);
}

function renderLetter(grid, index, span, newIndex) {
    tile = grid.children[index];
    span.innerHTML = word[newIndex];
    tile.append(span);
    tile.classList.add("input");
    span.classList.add("pop");
    updateGame(tile);
}

function renderCursor(grid, index) {
    tile = grid.children[index];
    updateGame(tile);
    tile.classList.add("input");
}

/**
 * @param {Element} tile
 */
function setCursor(tile) {
    let parent = tile.parentNode;
    const children = parent.children;
    
    for (element of children) {
        element.classList.remove("cursor");   
    }

    if(word.length < 5) tile.classList.add("cursor", "input");
    if(word.length === 5) tile.classList.remove("cursor");
}