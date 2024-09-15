var express = require('express');
const app = express();
const indexRouter = require('./routes/index');
const expressSession = require('express-session')

app.set("view engine", "ejs");
app.set('views', path.join(__dirname,'views'));


app.use(expressSession({
    resave : false,
    saveUninitialized : false,
    secret : "hey hey hey",
}));

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));


app.use('/',indexRouter);

app.listen(3000);

