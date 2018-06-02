const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//category, subcategory, sound, spelling, keyword, level, syllable type
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
  date: {
    type: Date,
    default: Date.now
  },
  student: { type: Schema.Types.ObjectId, ref: "students" },
  soundItem: { type: Schema.Types.ObjectId, ref: "sounditems" }
});

module.exports = Word = mongoose.model("words", WordSchema);
