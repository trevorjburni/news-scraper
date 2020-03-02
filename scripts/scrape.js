// Require axios and cheerio
var axios = require("axios");
var cheerio = require("cheerio");

const Headline = require("../models/Headline");

var scrape = function (message, err, count) {
    axios.get("https://www.foxnews.com/").then(function (response) {
        const $ = cheerio.load(response.data);

        $(".article").each(function (i, element) {

                const articleDiv = $(this).children(".info").children().children(".title").children("a");
                let link = articleDiv.attr("href");
                const title = articleDiv.text().trim();

                if (link && title) {
                    // Add https to the link if it doesn't contain it.
                    if (!link.includes("http:")) {
                        link = "https:" + link;
                    };
                    axios.get(link).then(function (response2) {
                        const $2 = cheerio.load(response2.data);
                        let summary = $2("p.speakable").text();
                        if (!summary) {
                            summary = "Summary Not Available";
                        };
                        // console.log("title: " + title);
                        // console.log("link: " + link);
                        // console.log("summary: " + summary);
                        if (summary == undefined) {
                            return;
                        } else {
                            var dataToAdd = {
                                link: link,
                                summary: summary,
                                title: title,
                                saved: false
                            };
                            console.log("dataToAdd: " + dataToAdd.link);
                            Headline.create(dataToAdd)
                            .then(function(dbArticle) {
                                console.log(dbArticle);
                                count ++;
                            })
                            .catch(function(err) {
                                console.log(err);
                            })
                        }
                    }).catch(error => {
                        if (error) {
                            console.log(error.response)
                        }
                    });
                } else {
                    console.log("Link and Title not found");
                }
        });
        message("scrape compete");
        err(err);
        count(count);
    });
};

module.exports = scrape;