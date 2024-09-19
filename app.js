const express = require('express');
const expressSession = require('express-session')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const passport = require('passport');

const app = express();

app.set("view engine", "ejs");
app.set('views', path.join(__dirname,'views'));

app.use(flash());
app.use(expressSession({
    resave : false,
    saveUninitialized : false,
    secret : "hey hey hey",
}));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));


app.use('/',indexRouter);

app.listen(3000);

