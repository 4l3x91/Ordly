function createKeyboard() {
    const keys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "å", "a", "s", "d", "f", "g", "h", "j", "k", "l", "ö", "ä", "z", "x", "c", "v", "b", "n", "m"];
    const keydivs = document.querySelector(".keys");
    for (let i = 0; i < keys.length; i++)
    {
        if(keys[i] == "z") spawnSpacer(keydivs);
        
        spawnKey(keys, i, keydivs);    

        if(keys[i] == "m") spawnBackspace(keydivs);
        if(i + 1 == keys.length) spawnPlay(keydivs);
    }
}

function spawnKey(keys, i, keydivs) {
    const key = document.createElement('button');
    key.setAttribute("data-char", `${keys[i]}`);
    key.innerHTML = keys[i];
    keydivs.append(key);
}

function spawnSpacer(keydivs) {
    const spacer = document.createElement('div');
    spacer.classList.add("spacer");
    keydivs.append(spacer);
}

function spawnBackspace(keydivs) {
    const backspace = document.createElement('button');
    backspace.classList.add("backspace");
    const backSpaceIcon = document.createElement('i');
    backSpaceIcon.classList.add("fas", "fa-backspace");
    backspace.append(backSpaceIcon);
    keydivs.append(backspace);
}

function spawnPlay(keydivs) {
    const play = document.createElement('button');
    play.classList.add("play");
    play.innerHTML = "Spela";
    keydivs.append(play);
}

document.addEventListener("click", (e) => {
    console.log(e.target)
});