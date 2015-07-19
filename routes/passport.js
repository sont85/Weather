'use strict';
module.exports = function(app, passport) {

  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Weather App' });
  });

  app.post('/login', passport.authenticate('local-login'), function(req, res){
    if (req.user) {
      res.json(req.user);
    }
  res.status(404);
});

  app.post('/register', passport.authenticate('local-signup'), function(req, res) {
    res.json(req.user);
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};

// function isLoggedIn(req, res, next) {
//   console.log(req.user);
//   if (req.isAuthenticated()) {
//     console.log('authenticate');
//     res.redirect('/#/search');
//     return next();
//   }
// }
