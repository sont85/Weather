'use strict';
module.exports = function(app, passport) {

  app.get('/', isLoggedIn, function(req, res, next) {
    res.render('index');
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/',
    failureRedirect : '/search'
  }));

  app.post('/register', passport.authenticate('local-signup', {
    successRedirect : '/',
    failureRedirect : '/'
  }));

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
