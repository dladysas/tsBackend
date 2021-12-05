const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const connectDB = require("./config/db");
connectDB();


const app = express();
app.use(cors());
app.use(bodyParser.json());

//Import routes
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute)

//Routes
app.get('/', (req, res) =>{
    res.send('Home')
});

app.get('/page', (req, res) => {
    res.send('Page')
});

app.listen(process.env.PORT);