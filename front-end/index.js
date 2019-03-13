let serverUrl = "http://localhost:8888";

const headlineBtn = document.querySelector("#headline");
const secretBtn = document.querySelector("#secret");
const loginBtn = document.querySelector("#loginBtn");
const logoutBtn = document.querySelector("#logoutBtn");

headlineBtn.addEventListener("click", () => {
  fetcher(serverUrl + "/headline");
});

secretBtn.addEventListener("click", (event) => {
  fetcher(serverUrl + "/protected/headline");
});

logoutBtn.addEventListener("click", (event) => {
  auth.logout();
  UIUpdate.loggedOut();
});

loginBtn.addEventListener("click", (event) => {
  auth.login()
});

document.querySelector("#loginModalBtn").setAttribute("data-toggle", "modal");
/*
loginBtnModal.addEventListener("click", (event) => {
  webAuth.authorize();
})
*/
auth.parseHash();
//handleAuthentication();


auth.isLoggedIn();

