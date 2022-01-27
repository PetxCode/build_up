const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const port = 3456;
const app = express();

const url = "mongodb://localhost/foodDB";

mongoose.connect(url).then(() => {
  console.log("database is ready to GO>>>!");
});

app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use("/", require("./router"));

app.listen(port, () => {
  console.log("We are good to go on 3456!");
});
