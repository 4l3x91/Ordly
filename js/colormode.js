function initColorMode() {
    theme = JSON.parse(localStorage.getItem("data-theme"));
    if (!theme) theme = "dark-mode";
    setDataTheme(theme);
  }
  
  document.querySelector("#colorMode").addEventListener("click", () => {
    var element = document.body;
    element.classList.toggle("light-mode");
  
    if (document.documentElement.getAttribute("data-theme") === "dark-mode")
      setDataTheme("light-mode");
    else setDataTheme("dark-mode");
  });
  
  function setDataTheme(theme) {
    button = document.querySelector("#colorMode");
    button.checked = theme === "dark-mode";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("data-theme", JSON.stringify(theme));
  }
  