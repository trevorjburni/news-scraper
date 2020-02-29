const mongoose = require("mongoose");

// Save a reference to the Schema contructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const noteSchema = new Schema({
    _headlineId: {
        type: Schema.Types.ObjectId,
        ref: "Headline"
    },
    date: String,
    noteBody: String
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;