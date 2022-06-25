const rows = 6;
const cols = 5;

function spawnGrid() {
    for (let index = 0; index < 30; index++) {
        let rowNumber = index + 1;
        spawnTile(rowNumber);
    }
    currentInput();
}

function spawnRow(rowNumber) {
        const grid = document.querySelector(".grid");
        const row = document.createElement('div');
        row.classList.add("row" + rowNumber, "grid--rows");
        grid.append(row);
        for (let index = 0; index < cols; index++) {
            spawnTile(rowNumber);
        }
    }

function spawnTile(rowNumber) {
    const tile = document.createElement('div');
    tile.classList.add("tile");
    const row = document.querySelector(".grid");
    row.append(tile);
    console.log(rowNumber);
}


function currentInput() {
    const currentInput = document.createElement('div');
    currentInput.classList.add("input", "cursor");
    const tile = document.querySelector(".tile");
    tile.append(currentInput);
}