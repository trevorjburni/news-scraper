const scrape = require("../scripts/scrape");

const Headline = require("../models/Headline");

module.exports = {
    fetch: function(cb) {
        scrape(function(message, err, count) {
            console.log(message);
            console.log(err);
            cb(err, count);
        });
    },
    delete: function(query, cb) {
        Headline.remove(query, cb);
    },
    get: function(query, cb) {
        Headline.find(query).sort({
            _id: -1
        })
        .exec(function(err, doc) {
            cb(doc);
        });
    },
    update: function(query, cb) {
        Headline.update({_id: query._id}, {
            $set: query
        }, {}, cb);
    }
}