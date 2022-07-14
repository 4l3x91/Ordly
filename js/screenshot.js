function screenShotMode() {
        const keyboard = document.querySelector(".keyboard--area");
        const leftKeys = document.querySelector(".left-keys");
        const rightKeys = document.querySelector(".right-keys");
        const tiles = document.querySelector(".grid");
        keyboard.classList.toggle("hide");
        leftKeys.classList.toggle("hide");
        rightKeys.classList.toggle("hide");
        for (let index = 0; index < tiles.children.length; index++) {
            const span = tiles.children[index];
            if(span.firstChild != null) span.firstChild.classList.toggle("hide")       
        }
    }