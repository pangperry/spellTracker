const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TeacherSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  soundItems: [
    new Schema({
      category: {
        type: String,
        required: true
      },
      subcategory: {
        type: String
      },
      sound: {
        type: String
      },
      spelling: {
        type: String
      },
      keyword: {
        type: String
      },
      level: {
        type: String
      },
      syllableType: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    })
  ]
});

module.exports = Teacher = mongoose.model("teachers", TeacherSchema);
