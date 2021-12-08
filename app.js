const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();
const connectDB = require("./config/db");
connectDB();



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
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);
//Import routes
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/auth')
//Routes
app.use("/posts", postsRoute);
app.use('/auth', authRoute);

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('login');
});

app.get('/page', (req, res) => {
  res.send('Page');
});

app.listen(process.env.PORT);

