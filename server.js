const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const session = require('express-session');
const validator = require('express-validator');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const _ = require('lowdash');
var app = express();

app.set('view engine','ejs');
//app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://geekychaser:p1234567@ds131711.mlab.com:31711/eventsapp');

var home = require('./routes/home');
var dashboard = require('./routes/dashboard');
var users = require('./routes/users');
var event = require('./routes/events');


app.use(validator());
app.use(session({
	secret: 'nottobetold',
	resave: true,
	saveInitialized:true,
    store:new MongoStore({mongooseConnection:mongoose.connection})
}))

app.use(passport.initialize());
app.use(passport.session());


app.use(validator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length){
            formParam += '[' +namespace.shift() + ']';
        }
        return{
            param : formParam,
            msg : msg,
            value : value
        };
    }
}));


app.use('/',home);
app.use('/dashboard',dashboard);
app.use('/users', users);
app.use('/event', event);

app.listen(3000,()=>{
    console.log("server started");
})

