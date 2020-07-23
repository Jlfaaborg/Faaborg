const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(bodyParser.json());
app.use(cors());

const api = require("./api");
app.use("/api", api);

app.use(express.static(path.join(__dirname, "../build")));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
