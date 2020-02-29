import { startSession } from "mongoose";

$(document).ready(function() {

    var articleContainer = $(".article-container");
    $(document).on("click", ".scrape-new", articleScrape);
    $(document).on("click", ".btn-save", articleSave);

    initialize();

    function initialize() {

        articleContainer.empty();
        $.get("/api/headlines?saved=false")
        .then(function(data) {
            if (data && data.length) {
                renderArticles(data);
            }
            else {
                renderEmpty();
            }
        });
    }

    function renderArticles(articles) {
        let articleArray = [];

        for (var i = 0; i < articles.length; i++) {
            articleArray.push(createDiv(articles[i]));
        }

        articleContainer.append(articleArray);
    }

    function createDiv(article) {

        const aDiv = $("<div>");
        aDiv.attr("class", "panel panel-default");

    }

})