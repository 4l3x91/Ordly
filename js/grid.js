const rows = 6;
const cols = 5;

function spawnGrid() {
    for (let index = 0; index < 30; index++) {
        spawnTile();
    }
    currentInput();
}

function spawnTile() {
    const tile = document.createElement('div');
    tile.classList.add("tile");
    const row = document.querySelector(".grid");
    row.append(tile);
}


function currentInput() {
    const currentInput = document.createElement('div');
    currentInput.classList.add("cursor");
    const tile = document.querySelector(".tile");
    tile.append(currentInput);
}