require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const app = express();
const PORT = 3000 || process.env.PORT;

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