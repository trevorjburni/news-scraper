const mongoose = require("mongoose");

// Save a reference to the Schema contructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const headlineSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

    summary: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        default: false
    },
});

const Headline = mongoose.model("Headline", headlineSchema);

module.exports = Headline;