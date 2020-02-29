// Require in dependancies
var express = require("express");
var expressHandlebars = require("express-handlebars");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Require in routes file
require("./config/routes")(app);

// Parse request body as JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Designate the public directory as a static directory
app.use(express.static("public"));

// Connect handlebars to Express
app.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

// Listen on the port
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});