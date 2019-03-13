const ACCESS_TOKEN = "access_token";
const AUTH_URL = "http://localhost:8080";

let auth = {};
let tokenStorage = localStorage;

auth.logout = () => {
  tokenStorage.removeItem("access_token");
  tokenStorage.removeItem("id_token");
  tokenStorage.removeItem("isLoggedIn");
};

auth.isLoggedIn = () => {
  if(!!tokenStorage.getItem(ACCESS_TOKEN)){
    UIUpdate.loggedIn();
    return true;
  } else {
    return false
  }
};

auth.login = () => {
  const userData = UIUpdate.getUsernamePassword();
  const body = {
    email: userData.username,
    callback: window.location.href
  };
  return fetch(AUTH_URL + "/authorize", {method: "POST", body: JSON.stringify(body), headers: {"Content-type": "application/json"}})
      .then((resp) => {
        if (resp.status == 200) {
          UIUpdate.alertBox("Magic Link sent via email");
          return Promise.resolve(resp);
        } else {
          console.log("Something went wrong");
          return Promise.reject(resp);
        }
      });
};

auth.parseHash = () => {
  let hash = window.location.hash.substr(0,1) == "#" ? window.location.hash.substr(1) : window.location.hash;
  let queryParams = {};
  hash.split("&").map(param => {
    param = param.split("=");
    queryParams[param[0]] = param[1];
  });
  if (queryParams.access_token) {
    tokenStorage.setItem(ACCESS_TOKEN, queryParams.access_token);
    UIUpdate.loggedIn();
    UIUpdate.alertBox("Logged in<br>Access Token: " + queryParams.access_token + "<br>ID Token: " + queryParams.id_token);
  }
  window.location.hash = "";
};