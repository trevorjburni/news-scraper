// Require axios and cheerio
var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function (cb) {
    axios.get("https://www.foxnews.com/").then(function (response) {

        var $ = cheerio.load(response.data);

        var articles = [];

        $(".article").each(function (i, element) {

            var link = $(this).children("a").attr("href");
            console.log(link);
        });
        cb(articles)
    });
};

module.exports = scrape;