const express = require('express');
const router = express.Router();
const passport = require('passport');

const Pool = require('../database');

router.get('/signup', (req, res) => {
    res.render('login/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
})); 

router.get('/signin', (req, res) =>{
    res.render('login/signin');
});

router.post('/signin', (req, res) => {
    passport.authenticate('/local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req,res);
});


router.get('/profile', (req, res) => {
    res.render('profile');
});

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      // if you're using express-flash
      req.flash('success_msg', 'session terminated');
      res.redirect('/signin');
    });
  });




module.exports = router; 