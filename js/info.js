function openInfo() {
    createInfo();
    const modalContainer = document.querySelector(".modal-content");
    modalContainer.addEventListener("click", (e) => {
        if(e.target === modalContainer)
        closeInfo();
    })
}

function closeInfo() {
    const removeForm = document.querySelector(".modal-wrapper");
    removeForm.remove();
}

function createInfo() {
    const app = document.querySelector(".app");
    const formContainer = document.createElement('div');
    formContainer.classList.add("modal-wrapper");
    app.append(formContainer);

    const formContent = document.createElement('div');
    formContent.classList.add("modal-content");
    formContainer.append(formContent);

    const infoContainer = document.createElement('div');
    infoContainer.classList.add("modal", "how-to");
    formContent.append(infoContainer);

    const modalTop = document.createElement('div');
    modalTop.classList.add("modal-inner-top");

    const modalCloseButton = document.createElement('i');
    modalCloseButton.classList.add("fa-solid", "fa-xmark", "close");
    modalCloseButton.addEventListener("click", closeForm);

    modalTop.append(modalCloseButton);

    infoContainer.append(modalTop);

    const infoTitle = document.createElement('h2');
    infoTitle.innerHTML = "Hur spelar man?";
    infoContainer.append(infoTitle);

    const infoText = document.createElement('div');
    infoText.classList.add("info-tips");
    infoContainer.append(infoText);

    const infoTextOne = document.createElement('div');
    infoTextOne.innerHTML = "Gissa dagens ord på sex försök!";

    const infoTextTwo = document.createElement('div');
    infoTextTwo.innerHTML = "Endast svenska ord är giltiga.";

    const infoTextThree = document.createElement('div');
    infoTextThree.innerHTML = "Ett tips är att börja med ord som har fem olika bokstäver i sig.";

    const infoTextFour = document.createElement('div');
    infoTextFour.innerHTML = "Notera att alla böjningar och genitiv inte är tillgängliga.";
    infoText.append(infoTextOne, infoTextTwo, infoTextThree, infoTextFour);

    const infoTileContainer = document.createElement('div');
    infoTileContainer.classList.add("example-grid");


    const gridContainer = document.createElement('div');
    gridContainer.classList.add("example-grid-container");
    infoContainer.append(gridContainer);

    const infoGridTitle = document.createElement('h2');
    infoGridTitle.innerHTML = "Exempel";
    gridContainer.append(infoGridTitle);

    const exampleWordOne = "PROVA";
    
    for (let index = 0; index < exampleWordOne.length; index++) {
        const infoTile = document.createElement('div');
        infoTile.classList.add('example-tile');
        if(index == 0 || index == 4) infoTile.classList.add('right');
        else infoTile.classList.add('wrong');
        const infoTileContent = document.createElement('span');
        infoTileContent.innerHTML = exampleWordOne[index];
        infoTile.append(infoTileContent);
        infoTileContainer.append(infoTile);
    }
    
    const exampleWordTwo = "TESTA";
    
    for (let index = 0; index < exampleWordTwo.length; index++) {
        const infoTile = document.createElement('div');
        infoTile.classList.add('example-tile');
        if(index == 2) infoTile.classList.add('kinda');
        else if(index == 3) infoTile.classList.add('right');
        else infoTile.classList.add('wrong');
        const infoTileContent = document.createElement('span');
        infoTileContent.innerHTML = exampleWordTwo[index];
        infoTile.append(infoTileContent);
        infoTileContainer.append(infoTile);
    }
    
    gridContainer.append(infoTileContainer);
    const explainContainer = document.createElement('div');
    explainContainer.classList.add("info-text");
    gridContainer.append(explainContainer);

    const infoCorrectContainer = document.createElement('div');
    const infoCorrectLetter = document.createElement('span');
    const infoCorrectLetterBox = document.createElement('span');
    infoCorrectLetterBox.classList.add("right");
    infoCorrectLetterBox.innerHTML = "Grön";
    infoCorrectLetter.innerHTML = "ruta betyder att bokstaven finns i ordet och är på rätt plats.";
    infoCorrectContainer.append(infoCorrectLetterBox, infoCorrectLetter);
    
    const infoKindaContainer = document.createElement('div');
    const infoKindaLetter = document.createElement('span');
    const infoKindaLetterBox = document.createElement('span');
    infoKindaLetterBox.classList.add("kinda");
    infoKindaLetterBox.innerHTML = "Orange";
    infoKindaLetter.innerHTML = "ruta betyder att bokstaven finns i ordet men är på fel plats.";
    infoKindaContainer.append(infoKindaLetterBox, infoKindaLetter);
    
    const infoWrongContainer = document.createElement('div');
    const infoWrongLetter = document.createElement('span');
    const infoWrongLetterBox = document.createElement('span');
    infoWrongLetterBox.classList.add("wrong");
    infoWrongLetterBox.innerHTML = "Mörkgrå";
    infoWrongLetter.innerHTML = "ruta betyder att bokstaven inte finns i ordet.";
    infoWrongContainer.append(infoWrongLetterBox, infoWrongLetter);
    
    explainContainer.append(infoCorrectContainer, infoKindaContainer, infoWrongContainer);

    const formOverlay = createModalOverlay();
    formContainer.append(formOverlay);
}