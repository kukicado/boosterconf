
var idToken;
var accessToken;
var expiresAt;
  
var webAuth = new auth0.WebAuth({
  domain: 'adobot.auth0.com',
  clientID: 'rjJ8EtD7z5WQCVBsSoV4mBzOVMfhVPJX',
  redirectUri: window.location.href,
  responseType: 'token id_token',
  scope: 'openid',
  audience: 'headlines'
});
  
function localLogin(authResult) {
  UIUpdate.loggedIn();
  // Set isLoggedIn flag in localStorage
  localStorage.setItem('isLoggedIn', 'true');
  tokenStorage.setItem(ACCESS_TOKEN, authResult.accessToken);
  tokenStorage.setItem('id_token', authResult.idToken);
}
  
function handleAuthentication() {
  webAuth.parseHash(function(err, authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      window.location.hash = '';
      localLogin(authResult);
    } else if (err) {
      console.log(err);
      alert(
        'Error: ' + err.error + '. Check the console for further details.'
      );
    }
  });
}
