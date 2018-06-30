const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

// Load Word model
const Word = require("../../models/Word");

// Load Teacher model
const Teacher = require("../../models/Teacher");

// @route   GET api/words/test
// @descr   Tests words route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "words works" }));

// @route   POST api/words/:student_id/:item_id   ----the second id refers to a soundItem id
// @descr   create new word for student of current teacher
// @access  Private

router.post(
  "/:student_id/:item_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newWord = new Word({
      spelling: req.body.spelling,
      misspelling: req.body.misspelling,
      student: req.params.student_id,
      soundItem: req.params.item_id
    });
    newWord
      .save()
      .then(word => {
        res.json(word);
      })
      .catch(err => console.log(err));
  }
);

// @route   POST api/words/id
// @descr   Edit word for student of current teacher
// @access  Private

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // res.json(req.body);
    const wordFields = {};
    if (req.body.spelling) wordFields.spelling = req.body.spelling;
    if (req.body.misspelling) wordFields.misspelling = req.body.misspelling;
    if (req.body.needsWork) wordFields.needsWork = req.body.needsWork;

    Word.findOne({ _id: req.params.id })
      .then(word => {
        if (word) {
          Word.findOneAndUpdate(
            { _id: req.params.id },
            { $set: wordFields },
            { new: true }
          ).then(word => res.json(word));
        }
      })
      .catch(err => console.log(err));
  }
);

// @route   DELETE api/words/id
// @descr   DELETE word for student of current teacher
// @access  Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Word.findOneAndRemove({ _id: req.params.id })
      .then(() => {
        res.json({ success: true });
      })
      .catch(err => console.log(err));
  }
);

// @route   GEt api/words/:student_id
// @descr   Get all words for student of current teacher
// @access  Private
router.get(
  "/:student_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Word.find({ student: req.params.student_id })
      .then(word => {
        return res.json(word);
      })
      .catch(err => console.log(err));
  }
);

// TODO: add validations
module.exports = router;
