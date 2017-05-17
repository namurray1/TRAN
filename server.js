// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var path = require("path");

// Require History Schema Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Requiring our models for syncing
var db = require("./models");

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

// After the body is parsed, it's time for validation this starts the express
// validator
app.use(expressValidator());

app.use(express.static(path.join(__dirname, "./public")));

//Express Session
app.use(expressSession({
    secret: 'secret code',
    // If saveUnitialized is set to true it will save a session to our session
    // storage even if it is not initialized
    saveUninitialized: false,
    // If resave is set to true it will save our session after each request false
    // will only save if we change something
    resave: false
}));

require("./controllers/html-routes.js")(app);
require("./controllers/api-routes.js")(app);

// Syncing our sequelize models and then starting our express app
db
    .sequelize
    .sync({force: false})
    .then(function () {
        app
            .listen(PORT, function () {
                console.log("App listening on PORT " + PORT);
            });
    });