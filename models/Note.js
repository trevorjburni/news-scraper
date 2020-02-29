var mongoose = require("mongoose");

// Save a reference to the Schema contructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var noteSchema = new Schema({
    _headlineId: {
        type: Schema.Types.ObjectId,
        ref: "Headline"
    },
    date: String,
    noteBody: String
});

var Note = mongoose.model("Note", noteSchema);

module.exports = Note;