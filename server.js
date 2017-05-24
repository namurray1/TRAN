// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var path = require("path");
// var passport = require("passport");
var flash = require("connect-flash");
// require('./config/passport')(passport); // pass passport for configuration
var cookieParser = require('cookie-parser');
var morgan = require("morgan");

// Require History Schema Create Instance of Express
var app = express();

// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Requiring our models for syncing
var db = require("./models");

// set up ejs for templating
// app.set('view engine', 'ejs');

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));
app.use(cookieParser()); // read cookies (needed for auth)
app.use(express.static(path.join(__dirname, "./public")));

// - Mel - commenting this out for now while I work out passportJS to use instead of this
//Express Session
app.use(expressSession({
    secret: 'superheroes',
    // If saveUnitialized is set to true it will save a session to our session
    // storage even if it is not initialized
    saveUninitialized: false,
    // If resave is set to true it will save our session after each request false
    // will only save if we change something
    resave: false
}));

// required for passport
// app.use(session({ secret: 'superhero' })); // session secret
// app.use(passport.initialize());
// app.use(passport.session({ secret: 'superhero' })); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session

require("./controllers/html-routes.js")(app); // add passport back in here when we add it in.
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