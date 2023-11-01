require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');


const connectDB = require('./server/config/db');
const session = require('express-session');

const app = express();
const PORT = 3000 || process.env.PORT;



// Connect to the DB
connectDB();

//middle ware
app.use(express.urlencoded ({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//Cookie Parser

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
}));


app.use(express.static('public'));

//Templating engine
app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine', 'ejs');


app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));

// This is waiting on the port @ localhost:3000
app.listen(PORT, ()=> {
    console.log('App listening on port ${PORT}');
});