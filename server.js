const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const teachers = require("./routes/api/teachers");
const students = require("./routes/api/students");
const words = require("./routes/api/words");
const soundItems = require("./routes/api/soundItems");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello"));

app.use("/api/teachers", teachers);
app.use("/api/students", students);
app.use("/api/words", words);
app.use("/api/sound-items", soundItems);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on ${port}`));
