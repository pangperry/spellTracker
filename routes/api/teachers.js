const express = require("express");
const router = express.Router();

// const Teacher = require("../../models/Teacher");

// @route   GET api/teachers/test
// @descr   Tests teachers route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Teachers works" }));

module.exports = router;
