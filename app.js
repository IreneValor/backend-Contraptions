require("dotenv").config();
require("./db"); // REQUIERO MONGO
//const { isAuthenticated } = require("./middlewares/Token.middleware");

const express = require("express");
const app = express();

require("./config")(app);
//const Router = require("./routes");
app.use("/", require("./routes")); //isAuthenticated  como MIDDELWARE

require("./error-handling")(app);

module.exports = app;
