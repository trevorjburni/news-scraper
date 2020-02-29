// Require axios and cheerio
var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function (cb) {
    axios.get("https://www.foxnews.com/").then(function (response) {

        var $ = cheerio.load(response.data);

        var articles = [];

        $(".article").each(function (i, element) {

            if (i < 20) {
                return
            } else {

                const articleDiv = $(this).children(".info").children().children(".title").children("a");
                let link = articleDiv.attr("href");
                const title = articleDiv.text().trim();

                if (link && title) {
                    console.log("title: " + title);
                    console.log("link: " + link);

                    if (!link.includes("http:")) {
                       link = "https:" + link; 
                    };

                    axios.get(link).then(function (response2) {

                        const $ = cheerio.load(response2.data);

                        let summary = $("p.speakable").text();

                        if (!summary) {
                            summary = "Summary Not Available";
                        };
                        console.log("summary: " + summary);


                    });

                } else {
                    console.log("Link and Title not found");
                }
            }

        });
        cb(articles)
    });
};

module.exports = scrape;