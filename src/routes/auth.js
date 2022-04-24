const express = require('express'),
  router = express.Router(),
  passport = require('passport')

  router.get('/signup', (req,res)=>{
    res.sendFile('/public/register.html', {root:'src'})
  })

  router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/signin',
    failureRedirect: '/signup'
  }));

  router.get('/notfound', (req,res)=>{
    res.send({ 'errorSession' : "Nombre de usario o contraseña Incorrectos"}) 
  })
  router.get('/profile', (req, res)=> {
    res.sendFile('views/menu.html', {root: 'src'})
  })

  router.get('/signin', (req, res)=>{
    res.sendFile('/public/login.html', {root: 'src'})
  })

  router.post('/signin', (req,res,next)=> {
   passport.authenticate('local.signin', {
     successRedirect : '/profile',
     failureRedirect :'/notfound',
    })(req, res, next) 
  });


module.exports = router;