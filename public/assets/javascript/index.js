$(document).ready(function() {

    var articleContainer = $(".article-container");
    $(document).on("click", ".scrape-new", articleScrape);
    $(document).on("click", ".save", articleSave);
    $(document).on("click", ".clear-old", clearArticles);

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

        const aDiv = $([
            "<div class='panel panel-default'>",
            "<div class='panel-heading'>",
            "<h3>",
            article.title,
            "<a class='btn btn-success save'>",
            "Save Article",
            "</a>",
            "</h3>",
            "</div>",
            "<div class='panel-body'>",
            article.summary,
            "</div>",
            "</div>",
        ].join(""));

        aDiv.data("_id", article._id);
        return aDiv;

    }

    function renderEmpty() {
        const emptyAlert = $([
            "<div class='alert alert-warning text-center'>",
            "<h3> No New articles </h3>",
            "</div>",
            "<div class='panel-body text-center'>",
            "<h4><a class='scrape-new'>Scrape for new articles</a></h4>",
            "<h4><a href='/saved'>See Saved Articles</a></h4>",
            "</div>"
        ].join(""));
        articleContainer.append(emptyAlert);
    }

    function articleSave() {

        console.log("saved");

        const articleToSave = $(this).parents(".panel").data();
        articleToSave.saved = true;

        // ajax call
        $.ajax({
            method: "patch",
            url: "/api/headlines",
            data: articleToSave
        })
        .then(function(data) {
            if (data.ok) {
                initialize();
            }
        });
    }

    function articleScrape() {
        $.get("/api/fetch")
        .then(function(data) {
            initialize();
            alert(data.message);
        });
    }

    function clearArticles() {
        console.log("delete button clicked");
        $.ajax({
            method: "delete",
            url: "/api/headlines",
        })
        .then(function() {
            initialize();
        })
    }
});