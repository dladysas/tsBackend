const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();
const connectDB = require("./config/db");
connectDB();

require("./config/passport")(passport);

const app = express();
app.use(cors());
app.use(bodyParser.json());
//Sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

//Passport middleware
app.use(passport.initialize);
app.use(passport.session);
//Import routes
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/auth')
//Routes
app.use("/posts", postsRoute);
app.use('/auth', authRoute);


app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/page", (req, res) => {
  res.send("Page");
});

app.listen(process.env.PORT);

