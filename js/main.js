document.addEventListener("DOMContentLoaded", main);
let hasVisited = JSON.parse(localStorage.getItem("hasVisited"));
let user = JSON.parse(localStorage.getItem("user"));
let serverTime;
// const url = 'https://ordlybackend20220713231604.azurewebsites.net'
const url = 'https://localhost:7083';

async function validateUser() {
  let response;
  await fetch(url + "/api/v1/User/validate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: Number(user.userId),
      userKey: user.userKey
    }),
  })
  .then(result => {
    response = result.json();
  })
    .catch((err) => {
      console.error(err);
    });
    return response;
}
  

async function main() {
  if (!hasVisited) {
    openInfo();
    localStorage.setItem("hasVisited", true);
  }
  
  if (!user || !await validateUser()) {
    user = await apiFetch("/api/v1/User");
    localStorage.setItem("user", JSON.stringify(user));
    console.log("Validation failed.")
  }


  initColorMode();
  spawnGrid();
  createKeyboard();
  createSplitKeyboard();
  // await initFetch();
  await gameLoop();
  let apiTime = await apiFetch("/api/v1/Ordly/currentTime");
  serverTime = new Date(apiTime);
  setInterval(() => {
    serverTime.setMilliseconds(serverTime.getMilliseconds() + 500);
  }, 500);
  console.log(user)
}

async function apiFetch(endpoint) {
  let response = await fetch(`${url}${endpoint}`);
  const result = await response.json();
  return result;
}