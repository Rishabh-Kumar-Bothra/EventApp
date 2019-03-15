var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');


router.get('/signup', function(req, res){
    res.render('signup');
});


router.get('/login', function(req, res){
    res.render('login');
});


router.post('/signup', function(req, res){

    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;


   
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();

    var error = req.validationErrors();

    if(error){
        res.render('signup',{
            error:error
        });
    } else {
        User.findOne({email:email, username:username}).then(function(currentUser){
            if(currentUser){
                console.log('user is already registered:',currentUser)
               
                res.render('signup', { success_msg: 'User is already registered with username or email'});

            }
            else {
                var newUser = new User({
                    email:email,
                    username: username,
                    password: password
                });

                User.createUser(newUser, function(err, user){
                    if(err) throw err;
                    console.log(user);
                });

                res.render('login', { success_msg: 'You are registered and can now login'});
            }
        })

    }
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.getUserByUsername(username, function(err, user){
            if(err) throw err;
            if(!user){
                return done(null, false, {message: 'Unknown User'});
            }

            User.comparePassword(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid password'});
                }
            });
        });
    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

router.post('/login',
    passport.authenticate('local', {successRedirect:'/dashboard', failureRedirect:'/login'}),
    function(req, res) {
        console.log(req.body);
        res.redirect('/dashboard', {success_msg: 'Successfully Login'});
    });

router.get('/logout', function(req, res){
    req.logout();

    res.redirect('/login');
});

module.exports = router;