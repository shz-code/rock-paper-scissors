const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  console.log("hello");
  return res.send({ msg: "ok" });
});

app.listen(3000, () => {
  console.log("Listing on port 8000");
});
