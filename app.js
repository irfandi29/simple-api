const express = require("express");
const app = express();
require("dotenv").config();

//Import all routes
const indexRoute = require("./routes/index");
const apiRoute = require("./routes/api");

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRoute);
app.use("/api", apiRoute);

//Server listen
app.listen(process.env.PORT, () =>
  console.log("> Server Running on http://localhost")
);
