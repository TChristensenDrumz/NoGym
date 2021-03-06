// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

    app.get("/signup", function(req, res) {
        console.log()
            // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/environment");
        }
        res.sendFile(path.join(__dirname, "../public/assets/signup.html"));
    });

    app.get("/login", function(req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/");
        }
        res.sendFile(path.join(__dirname, "../public/assets/login.html"));
    });

    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/environment", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/assets/environment.html"));
    });

    app.get("/home", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/assets/home.html"));
    });

    app.get("/virtualgym", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/assets/virtualgym.html"));
    });

    app.get("/routine", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/assets/routine.html"));
    });

    app.get("/", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/assets/home.html"));
    });

    app.get("/aboutus", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/assets/aboutus.html"));
    });

    app.get("*", function(req, res) {
        res.redirect("/home");
    });
};