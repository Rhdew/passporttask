require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const user = require("./routing");

const app = express();

require("./middlewares/verify")(passport);
app.use(bodyParser.json());
app.use(
  session({
    secret: "secretkey",
    cookie: { _expires: 180 * 1000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/user", user);

mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    reconnectTries: 3,
    reconnectInterval: 500,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Link established to database");
  })
  .catch((err) => {
    console.log("No link to database.", err);
  });

app.listen(3000, () => {
  console.log("connected ");
});
