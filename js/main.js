document.addEventListener("DOMContentLoaded", main);

function main() {
    spawnGrid();
    createKeyboard();
    printRandomWord();
}

function printRandomWord() {
    const randomNumber = Math.floor(Math.random() * words.length);
    // console.log(words[randomNumber]);
    return words[randomNumber];
}