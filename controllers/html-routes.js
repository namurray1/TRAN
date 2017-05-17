var path = require("path");
var db = require("../models");
var moment = require("moment");

var session;

// Routes
// =============================================================
module.exports = function (app) {

    app.get("/", function (req, res) {
        res.sendFile(__dirname + "/public/index.html");
    });

    // Render animal data on admin page
    // app.get("/admin", function (req, res) {
    //     session = req.session;
    //     if (session.uniqueID[1] === 'admin') {
    //         db.Animal.findAll({}).then(function (animalResults) {
    //             res.render("admin", {
    //                 animal: animalResults,
    //                 userName: req.session.uniqueID[3],
    //             });
    //         });
    //     } else {
    //         console.log('unauthorized access');
    //         res.redirect('/');
    //     }
    // });

    app.get("/css/*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/css/" + req.params[0]));
    });
    
    app.get("/img/*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/img/" + req.params[0]));
    });

    app.get("/login", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/signin.html" ));
        // res.sendFile(path.join(__dirname, "./signin.html" + req.params[0]));
    });


    app.get("/signup", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/signup.html"));
        // res.sendFile(path.join(__dirname, "../public/signup.html" + req.params[0]));
    });

    // Render animal info specific to user who volunteered
    app.get("/user/:id", function (req, res) {
        console.log("------");
        console.log(req.session.uniqueID);
        console.log("------");
        var userId = req.params.id;
        console.log(typeof req.session.uniqueID[2]);
        console.log(typeof userId);
    });

    // app.get("/register", function(req, res) {
    //     //Todo//
    //     res.render('register', { title: 'Form Validation', success: req.session.success, errors: req.session.errors });
    //     //this resets the errors and success properties to null after they have been shown to user
    //     req.session.errors = null;
    //     req.session.success = null;

    // });

    // // Volunteer page display
    // app.get("/volunteer/:id", function(req, res) {
    //     var volunteerUsers = [];
    //     var volunteer_id = req.params.id;
    //     SELECT user.username FROM Users INNER JOIN Volunteer ON user.user_id = volunteer.user_Id WHERE volunteer.volunteered_flag = 1;
    //     db.user.findAll({
    //         include: [{
    //             model: db.user,
    //             where: {
    //                 user_id: user_id,
    //                 volunteered_flag: 1,
    //             }
    //         }]

    //LOGOUT
    app.get('/logout', function (req, res) {
        console.log('get logout');
        req.session.destroy(function (error) {
            console.log(error);
            res.redirect('/');
        });
    });

    // app.use(function (err, req, res, next) {
    //     console.log(err.stack);
    //     res.status(401);
    //     res.render('401');
    // });

    // app.use(function (err, req, res, next) {
    //     console.log(err.stack);
    //     res.status(500);
    //     res.render('500');
    // });

}