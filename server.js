const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const userDetail = require("./app/models/userDetails");
userDetail.sequelize.sync();

const superAdmin = require("./app/models/superAdmin");
superAdmin.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

require("./app/routes/userdetails/userdetails.routes")(app);
require("./app/routes/superAdmin/superAdmin.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}.`);
});