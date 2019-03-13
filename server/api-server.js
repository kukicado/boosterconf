var express    = require('express');
var randopeep = require("randopeep");
var expressjwt = require("express-jwt");
var jwks = require('jwks-rsa');
var cors = require("cors");
var app = express();

const useAuth0 = false;

let jwtCheckOptions = {};


jwtCheckOptions = {
  secret: "mysupersecret"
};



var jwtCheck = expressjwt(jwtCheckOptions);

app.use(cors());

app.get("/headline", function(req, res) {
    res.status(200).send(randopeep.clickbait.headline());
});

app.get("/protected/headline", jwtCheck, function(req, res) {
    res.status(200).send(randopeep.clickbait.headline("Ado Kukic"));
});

app.get('*', function (req, res) {
    res.sendStatus(404);
});

app.listen(8888, () => console.log("API started on port 8888"));