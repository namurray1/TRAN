var path = require("path");
var db = require("../models");
var sessions = require("express-session");
var crypto = require('crypto');

var session;

//hash functions -- this is for crypto for future implementation
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

module.exports = function (app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function (req, res) {
        res.render('index'); // load the index file
    });


    //REGISTER NEW ADMIN
    app.post("/admin/signup", function (req, res, next) {
        //Validation - checks if form is filled out properly
        // console.log("admin");

        // VALIDATION IS NEVER RETURNING ERRORS

        // var errors = req.validationErrors();
        // if (errors) { //if errors, restart register page
        //     req.session.errors = errors;
        //     req.session.success = false;
        //     res.render('signup', {
        //         errors: errors
        //     });
        // } else {
        //else look if there is a current user with same email address
        db.AllUsers.findAll({
                where: {
                    email: req.body.haemail
                }
            })
            .then(function (adminResults) {
                if (adminResults.length) {
                    //if there is a match of same name, restart register page
                    res.send("E-mail already in use");
                } else {
                    //else hash password and create the user
                    req.session.success = true;
                    var salt = genRandomString(32);
                    var hashedPassword = sha512(req.body.hapass, salt).passwordHash;
                    var role = "admin";
                    console.log("Creating admin");
                    db.AllUsers.create({
                            email: req.body.haemail,
                            role: role,
                            hash: hashedPassword,
                            salt: salt
                        })
                        .then(function (result) {
                            // now create the admin profile
                            db.Admins.create({
                                    full_name: req.body.adminName,
                                    email: req.body.haemail,
                                    address: req.body.astreetAddr,
                                    phone: req.body.aphone,
                                    lat: req.body.alat,
                                    lng: req.body.alng,
                                    organization_name: req.body.orgName,
                                    non_profit_id: req.body.npID
                                })
                                .then(function (result) {
                                    console.log("bam");
                                    req.session.newRegister = true;
                                    res.redirect('/');
                                });
                        })
                        .catch(function (err) {
                            res.send("E-mail already in use");
                        });
                }
            });
        // }
    });

    //REGISTER NEW USER
    app.post("/user/signup", function (req, res, next) {
        //Validation - checks if form is filled out properly
        // console.log("user");

        // VALIDATION IS NEVER RETURNING ERRORS

        // var errors = req.validationErrors();
        // if (errors) { //if errors, restart register page
        //     req.session.errors = errors;
        //     req.session.success = false;
        //     res.render('index', {
        //         errors: errors
        //     });
        // } else {
        //else look if there is a current user with same email address
        db.AllUsers.findAll({
                where: {
                    email: req.body.huemail
                }
            })
            .then(function (userResults) {
                if (userResults.length) {
                    //if there is a match of same name, restart register page
                    res.sendFile('signup', {
                        errors: [{
                            msg: "Email already in use"
                        }]
                    });
                } else {
                    //else hash password and create the user
                    req.session.success = true;
                    var salt = genRandomString(32);
                    var hashedPassword = sha512(req.body.hupass, salt).passwordHash;
                    var role = "user";
                    // create the shared users table first
                    db.AllUsers.create({
                            email: req.body.huemail,
                            role: role,
                            hash: hashedPassword,
                            salt: salt
                        })
                        .then(function (result) {
                            // now create the actual user
                            db.User.create({
                                    email: req.body.huemail,
                                    username: req.body.userName,
                                    address: req.body.vstreetAddr,
                                    phone: req.body.vphone,
                                    lat: req.body.vlat,
                                    lng: req.body.vlng
                                })
                                .then(function (result) {
                                    // redirect to user.html with username in welcome message
                                    req.session.newRegister = true;
                                    res.redirect('/');

                                })
                        });
                }

            });
        // }
    });

    //SESSION LOGIN
    app.post("/login", function (req, res, next) {
        var session = req.session;
        var email = req.body.email;
        var password = req.body.password;
        console.log("am here");
        session.newRegister = false;
        //checks hash against hash for entry validation
        // do if statement for user and for admin here
        db.AllUsers.findOne({
            where: {
                email: email
            }
        }).then(function (data) {
            if (data) {
                var salt = data.salt;
                var hashedPassword = sha512(req.body.pass, salt).passwordHash;
                if (hashedPassword === data.hash) {
                    session.loggedIn = true;
                    req.session.authenticated = true;
                    session.uniqueID = [data.email, data.role, data.id, data.username];
                    if (data.role === "admin") {
                        res.redirect('/');
                    } else if (data.role === "user") {
                        res.redirect('/');
                    } else {
                        res.send('invalid role detected for username');
                        res.redirect('/login');
                    }
                }
            } else {
                res.send('invalid username or password');
                res.redirect('/login');
            }
        });
    });


    //ADD AN ANIMAL
    app.post("/add/animal", function (req, res) {
        // We need validation here
        db.Animal.create({
                pet_name: req.body.pet_name,
                pet_type: req.body.pet_type,
                gender: req.body.gender,
                breed: req.body.breed,
                summary: req.body.summary,
                link_to_picture: req.body.link_to_picture,
                weight: req.body.weight,
                temperament: req.body.temperament,
                special_needs: req.body.special_needs,
                origin_phone: req.body.origin_phone,
                destination_phone: req.body.destination_phone,
                origin_address: req.body.origin_address,
                destination_address: req.body.destination_address,
                lat_origin: req.body.olat,
                lng_origin: req.body.olng,
                lat_destination: req.body.dlat,
                lng_destination: req.body.dlng,
            })
            .then(function (result) {
                // redirect to user.html with username in welcome message
                req.session.newRegister = true;
                res.redirect('/');
            })
            .catch(function (err) {
                res.send(err);
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
                    // THIS NEEDS WORK

                    // var updatedAt = registeredData[0].dataValues.updatedAt;
                    // db.Users.update({
                    //     player_volunteered_flag: 1
                    // }, {
                    //     where: {
                    //         user_id: UserID,
                    //         animal_id: AnimalID,
                    //         updatedAt: updatedAt
                    //     }
                    // }).then(function (data) {
                    //     console.log(data);
                    // });
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

    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    // this needs to be changed from index to a user or admin view or profile view
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('index.html', {
            user: req.user // get the user out of session and pass to template
        });
    });

    // Get request to get session data
    app.get("/loggedIn", function (req, res) {
        res.json(req.session);
    });

    // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
    }

    // GET ALL ANIMALS FOR THE PURPOSES OF MAPPING
    app.get('/animallocations', function (req, res) {
        // var animalID = req.body.animal_id;
        // var userID = req.session.uniqueID[2];
        console.log("Inside api-routing /animallocations function");
        if (userID == req.body.user_id) {
            db.Animals.findAll({}).then(function (animalData) {
                console.log(animalData);
                res.json(animalData);
            });
        }
    });


    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res, next) {
        delete req.session.authenticated;
        res.redirect('/');
    });

};