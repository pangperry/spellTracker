const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const WordSchema = new Schema({
  spelling: {
    type: String,
    required: true
  },
  misspelling: {
    type: String,
    required: true
  },
  needsWork: {
    type: Boolean,
    default: false
  },
  sentence: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: "teachers.students",
    required: true
  },
  soundItem: {
    type: Schema.Types.ObjectId,
    ref: "teachers.soundItems",
    required: true
  }
});

module.exports = Word = mongoose.model("words", WordSchema);
