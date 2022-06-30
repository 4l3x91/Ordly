const keysLeft = [
    "q",
    "w",
    "e",
    "r",
    "t",
    "a",
    "s",
    "d",
    "f",
    "g",
    "z",
    "x",
    "c",
    "v",
    "b"
  ];

const keysRight = [
    "y",
    "u",
    "i",
    "o",
    "p",
    "å",
    "h",
    "j",
    "k",
    "l",
    "ö",
    "ä",
    "n",
    "m"
  ];

  function createSplitKeyboard() {
    createLeftKeys();
    createRightKeys();

  }

function createLeftKeys() {
    const parent = document.querySelector(".container");
    const keydivs = document.createElement('div');
    keydivs.classList.add("keys", "left-keys");
    
    for (let i = 0; i < keysLeft.length; i++) {
        spawnKey(keysLeft, i, keydivs);        
    }
    parent.append(keydivs);
}


function createRightKeys() {
  const parent = document.querySelector(".container");
  const keydivs = document.createElement('div');
  keydivs.classList.add("keys", "right-keys");
  
  for (let i = 0; i < keysRight.length; i++) {
      spawnKey(keysRight, i, keydivs);        
  }
  spawnBackspace(keydivs);
  parent.append(keydivs);
}

function createEnter() {
    const keydivs = document.querySelector(".keys");
    for (let i = 0; i < 1; i++) {

        spawnKey(keysLeft, i, keydivs);

        if (keys[i] == "m")
            spawnBackspace(keydivs);
        if (i + 1 == keys.length)
            spawnPlay(keydivs);
    }
}

  function spawnKey(keys, i, keydivs) {
    const key = document.createElement("button");
    key.setAttribute("data-char", `${keys[i]}`);
    key.innerHTML = keys[i];
    keydivs.append(key);
  }
  
  function spawnBackspace(keydivs) {
    const backspace = document.createElement("button");
    backspace.classList.add("backspace");
    const backSpaceIcon = document.createElement("i");
    backSpaceIcon.classList.add("fas", "fa-backspace");
    backspace.append(backSpaceIcon);
    keydivs.append(backspace);
  }