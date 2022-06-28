function alertWordDoesNotExist() {
    const alertContainer = document.createElement('div')
    alertContainer.innerHTML = "Ordet " + word.toUpperCase() + " finns inte.";
    alertContainer.classList.add("word-does-not-exist");
    const app = document.querySelector(".app");
    app.append(alertContainer);

    setTimeout(() => {
        removeWordDoesNotExist()
      }, 5000);
}

function removeWordDoesNotExist() {
    const div = document.querySelector(".word-does-not-exist");
    div.remove();
}