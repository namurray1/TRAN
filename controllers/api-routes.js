var path = require("path");
var db = require("../models");
var sessions = require("express-session");
var crypto = require('crypto');

var session;

//hash functions
const sha512 = (password, salt) => {
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    let value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};

const genRandomString = (length) => {
    return crypto
        .randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
};

// Routes =============================================================

module.exports = function (app) {
    //REGISTER NEW ADMIN
    app.post("/admin/signup", function (req, res, next) {
        //Validation - checks if form is filled out properly
        console.log("admin");
        // req.checkBody('email', 'Email is required').notEmpty();
        // req.checkBody('email', 'Email is not valid').isEmail();
        // req.checkBody('adminName', 'Username is required').notEmpty();
        // req.checkBody('pswd1', 'Password is required').notEmpty();
        // req.checkBody('pswd2', 'Passwords do not match').equals(req.body.pswd1);

        var errors = req.validationErrors();

        if (errors) { //if errors, restart register page
            req.session.errors = errors;
            req.session.success = false;
            res.render('register', {
                errors: errors
            });
        } else {
            //else look if there is a current user with same username or same email address
            db.Admins.findAll({
                    where: {
                        $or: [{
                            full_name: req.body.adminName
                        }, {
                            email: req.body.email
                        },
                            // google_place_id: req.body.googlePlaceID
                        {
                            non_profit_id: req.body.npID
                        }]
                    }
                })
                .then(function (adminResults) {
                    if (adminResults.length) { //if there is a match of same name, restart register page
                        res.render('register', {
                            errors: [{
                                msg: "Username or e-mail already in use"
                            }]
                        });
                    } else { //else hash password and create the user
                        req.session.success = true;
                        var salt = genRandomString(32);
                        var hashedPassword = sha512(req.body.pass, salt).passwordHash;
                        var role = "admin";
                        db.Admins.create({
                                full_name: req.body.adminName,
                                email: req.body.email,
                                address: req.body.a-streetAddr,
                                phone: req.body.phone,
                                google_place_id: req.body.googlePlaceID,
                                organization_name: req.body.orgName,
                                non_profit_id: req.body.npID,
                                role: role,
                                hash: hashedPassword,
                                salt: salt
                            })
                            .then(function (result) {
                                // redirect to user.html with username in welcome message
                                req.session.newRegister = true;
                                res.redirect('index');
                            });
                    }

                });
        }
    });

    //REGISTER NEW USER
    app.post("/user/signup", function (req, res, next) {
        //Validation - checks if form is filled out properly
        console.log("user");
        // req.checkBody('email', 'Email is required').notEmpty();
        // req.checkBody('email', 'Email is not valid').isEmail();
        // req.checkBody('adminName', 'Username is required').notEmpty();
        // req.checkBody('pswd1', 'Password is required').notEmpty();
        // req.checkBody('pswd2', 'Passwords do not match').equals(req.body.pswd1);

        var errors = req.validationErrors();

        if (errors) { //if errors, restart register page
            req.session.errors = errors;
            req.session.success = false;
            res.render('register', {
                errors: errors
            });
        } else {
            //else look if there is a current user with same username or same email address
            db.Users.findAll({
                    where: {
                        $or: [{
                            username: req.body.userName
                        }, {
                            email: req.body.email
                        },
                            // google_place_id: req.body.googlePlaceID
                        {
                            // non_profit_id: req.body.npID
                        }]
                    }
                })
                .then(function (userResults) {
                    if (userResults.length) { //if there is a match of same name, restart register page
                        res.render('register', {
                            errors: [{
                                msg: "Username or e-mail already in use"
                            }]
                        });
                    } else { //else hash password and create the user
                        req.session.success = true;
                        var salt = genRandomString(32);
                        var hashedPassword = sha512(req.body.pswd1, salt).passwordHash;
                        var role = "user";
                        db.Users.create({
                                username: req.body.username,
                                email: req.body.email,
                                address: req.body.streetAddr,
                                phone: req.body.phone,
                                google_place_id: req.body.googlePlaceID,
                                role: role,
                                hash: hashedPassword,
                                salt: salt
                            })
                            .then(function (result) {
                                // redirect to user.html with username in welcome message
                                req.session.newRegister = true;
                                res.redirect('index');
                            });
                    }

                });
        }
    });

    //SESSION LOGIN
    app.post("/login", function (req, res) {
        var session = req.session;
        var email = req.body.email;
        var password = req.body.password;
        console.log("am here");
        session.newRegister = false;
        //checks hash against hash for entry validation
        db.Users.findOne({
            where: {
                email: email
            }
        }).then(function (data) {
            var salt = data.salt;
            var hashedPassword = sha512(req.body.password, salt).passwordHash;
            if (hashedPassword === data.hash) {
                session.loggedIn = true;
                session.uniqueID = [data.email, data.role, data.id, data.username];
                if (data.role === "admin") {
                    res.send({
                        redirect: '/admin'
                    });
                } else if (data.role === "user") {
                    res.send({
                        redirect: '/user' + data.id
                    });
                } else {
                    console.log('No role found');
                }
            } else {
                console.log("Illegal entry detected.");
                res.status(400).send();
            }

        }).catch(function (err) {
            console.log("The error is" + err);
            res.status(400).send();
        });
    });

    //ADD AN ANIMAL
    app.post("/add/animal", function (req, res) {
        db.Animal.create(req.body).then(function (result) {
            // redirect to admin.html page to add new animal
            res.redirect("/admin");
        });
    });


    //VOLUNTEER FOR A LISTED ANIMAL
    app.put('/volunteer', function (req, res) {
        var animalID = req.body.animal_id;
        var userID = req.session.uniqueID[2];
        console.log("Inside api-routing /volunteer function");
        if (userID == req.body.user_id) {
            console.log("User Id = reqbodyuserId; Data querying now.");
            db.Animals.findAll({
                attributes: ['user_volunteered_flag', 'updatedAt', 'createdAt'],
                where: {
                    user_id: UserID,
                    animal_id: AnimalID
                },
                limit: 1,
                order: [
                    ['updatedAt', 'DESC']
                ]
            }).then(function (volunteerData) {
                console.log(volunteerData);
                if (volunteerData.length === 0) {
                    db.Animals.create({
                        user_id: UserID,
                        animal_id: AnimalID,
                        user_volunteered_flag: 1
                    }).then(function (data) {
                        console.log(data);
                    });
                } else {
                    var updatedAt = registeredData[0].dataValues.updatedAt;
                    db.Users.update({
                        player_volunteered_flag: 1
                    }, {
                        where: {
                            user_id: UserID,
                            animal_id: AnimalID,
                            updatedAt: updatedAt
                        }
                    }).then(function (data) {
                        console.log(data);
                    });
                }
                // res.redirect("/user/"+userID);
                res.json("User has volunteered.");
            });
        }

    });

    // PUT route to update animal location
    app.post("/animal/location", function (req, res) {
        // console.log(req.body.resultsDataArray);
        var resultsArray = req.body.resultsDataArray;
        var updatesPromiseArray = [];
        console.log(req.body.resultsDataArray.animal_id);
        // Looping through data array, and pushing the promise of each sequelize update query into an array
        resultsArray.forEach(function (item) {
            // console.log(item);
            updatesPromiseArray.push(
                db.Animals.update({
                    location: item.location
                }, {
                    where: {
                        // UserId: item.UserId,
                        animal_id: item.AnimalID
                    }
                })
            ); //end of promise array
        });

        updatesPromiseArray.push(
            db.Animals.update({
                active_flag: 0
            }, {
                where: {
                    animal_id: req.body.resultsDataArray[0].AnimalId
                }
            })
        );

        // Waiting for all db updates to complete before deciding success/failure and returning control to client browser
        Promise.all(updatesPromiseArray).then(function (data) {
            // On success
            console.log("success" + data);
            res.json({
                redirectURL: "/admin",
                status: "success"
            });
            // On failure
        }, function (err) {
            console.log("Something failed.");
            res.status(500).send(err);
        });
    });

    //PUT route to update animal info
    app.put("/update/animal", function (req, res) {
        db.Animal.update({
            name: req.body.pet_name,
            location: req.body.AnimalLocation
        }, {
            where: {
                id: req.body.AnimalId
            }
        }).then(function (data) {
            console.log(data);
            res.send("updated");
        });
    });



    //PUT route to delete info for a particular animal
    app.put("/delete/animal", function (req, res) {
        db.Animal.update(
            // {
            //     active_flag: 0
            // },
            {
                where: {
                    id: req.body.AnimalID
                }
            }).then(function (data) {
            console.log(data);
            res.send("deleted animal");
        });
    });


    // Get request to get session data
    app.get("/loggedIn", function (req, res) {
        res.json(req.session);
    });
};