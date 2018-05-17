const express = require("express");
const router = express.Router();

// const Word = require("../../models/Word");

// @route   GET api/words/test
// @descr   Tests words route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "words works" }));

module.exports = router;
