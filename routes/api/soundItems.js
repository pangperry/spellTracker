const express = require("express");
const router = express.Router();

// const Teacher = require("../../models/Teacher");

// @route   GET api/soundItems/test
// @descr   Tests soundItems route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "soundItems works" }));

module.exports = router;
