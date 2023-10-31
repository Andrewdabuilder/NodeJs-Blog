require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const connectDB = require('./server/config/db');

const app = express();
const PORT = 3000 || process.env.PORT;



// Connect to the DB
connectDB();

//middle ware
app.use(express.urlencoded ({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

//Templating engine
app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine', 'ejs');


app.use('/', require('./server/routes/main'));

// This is waiting on the port @ localhost:3000
app.listen(PORT, ()=> {
    console.log('App listening on port ${PORT}');
});