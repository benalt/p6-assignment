const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

console.log(`postgress connection: ${process.env.DATABASE_URL}`)

const app = express();

const db = require("./models");
//db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

var corsOptions = {
  origin: ["http://localhost:8081", "http://localhost:3000"]
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the supplier API" });
});

require("./routes/suppliers.routes")(app);
require("./routes/categories.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});