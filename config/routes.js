var scrape = require("../scripts/scrape");

// Require controllers
var headlinesController = require("../controllers/headlines");
var notesController = require("../controllers/notes");

module.exports = function(router) {
    router.get("/", function(req, res) {
        res.render("home");
    });

    router.get("/saved", function(req, res) {
        res.render("saved");
    });

    
}