const express = require("express");
const router = express.Router();

// const Student = require("../../models/Student");

// @route   GET api/students/test
// @descr   Tests students route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "students works" }));

module.exports = router;
