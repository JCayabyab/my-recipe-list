const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
// require("./services/exampleService");

const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "myrecipelist-db"
});

connection.connect();

// middlewares / services go here
app.use(bodyParser.json());

// routes go here
require("./routes/loginRoutes")(app, connection);
require("./routes/recipeRoutes")(app, connection);
require("./routes/reviewRoutes")(app, connection);
require("./routes/userRoutes")(app, connection);
require("./routes/listRoutes")(app, connection);
require("./routes/categoryRoutes")(app, connection);
require("./routes/kitchenItemRoutes")(app, connection);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
