#!/usr/bin/nodejs

// initialize express and app class object
var express = require('express');
var app = express();
var mysql = require('mysql');

// initialize handlebars templating engine
var hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static('static'));

// initialize the built-in library 'path'
var path = require('path');
console.log(__dirname);
app.use(express.static(path.join(__dirname,'static')));

//cookies
var cookieSession = require('cookie-session');
app.set('trust proxy', 1);
app.use(cookieSession({
    name: 'encr',
    keys: ['tAr3]DhKVtV+md?e', 'D3w8ATmew;7^B2y', 'f^hw8,g-K;duS:L:']
}));
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// -------------- mysql initialization -------------- //
var sql_params = {
  connectionLimit : 10,
  user            : process.env.DIRECTOR_DATABASE_USERNAME,
  password        : process.env.DIRECTOR_DATABASE_PASSWORD,
  host            : process.env.DIRECTOR_DATABASE_HOST,
  port            : process.env.DIRECTOR_DATABASE_PORT,
  database        : process.env.DIRECTOR_DATABASE_NAME
};

var pool  = mysql.createPool(sql_params);
app.locals.pool = pool;

// Other endpoint handlers 
const login = require('./routes/1_login_route.js');
app.use(login);

const menu = require('./routes/2_menu_route.js');
app.use(menu);

const map = require('./routes/3_map_route.js');
app.use(map);

const budget = require('./routes/4_budget_route.js');
app.use(budget);

const bank = require('./routes/3_bank_route.js');
app.use(bank);

// Listener
var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});
