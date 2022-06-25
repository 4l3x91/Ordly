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


function spawnInput() {
    const tile = document.querySelector(".tile");
    tile.classList.add("input", "cursor");
}

function checkInput() {
    const grid = document.querySelector(".grid");
    const span = document.createElement("span");
    const startIndex = currentGuess * 5;
    const endIndex = startIndex + 5;
    
    let tile;
    for (let index = startIndex; index < endIndex; index++) {
        let newIndex = index - startIndex;
        console.log("index: "+ index);
        // console.log(startIndex);
        // console.log(endIndex);
        if(word.length > 0 && newIndex < word.length) {
            console.log(word.length);
            tile = grid.children[index];
            span.innerHTML = word[newIndex];
            tile.append(span);
            updateGame(tile);
        }
        if(newIndex === word.length) {
            tile = grid.children[index];
            updateGame(tile);
            break;
        }
    }
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
    if(word.length === 5) 
    {
        tile.classList.remove("cursor"); 
        tile.classList.add("input");
     }
}