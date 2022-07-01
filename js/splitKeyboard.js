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
  spawnSplitBackspace(keydivs);
  parent.append(keydivs);
}
  
  function spawnSplitBackspace(keydivs) {
    const backspace = document.createElement("button");
    backspace.classList.add("split-backspace");
    const backSpaceIcon = document.createElement("i");
    backSpaceIcon.classList.add("backspace-x", "fas", "fa-backspace");
    backspace.append(backSpaceIcon);
    keydivs.append(backspace);
  }