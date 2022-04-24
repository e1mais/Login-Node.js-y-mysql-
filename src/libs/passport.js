const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy

  const pool = require('../database'), 
    { compararContras , encriptarContras } = require('../libs/encrypt')


    //Sign in
  passport.use('local.signin', new LocalStrategy({
    usernameField : 'usuario',
    passwordField : 'contrasena',
    passReqToCallback : true
  }, async (req, username, password, done) => {

    const rows = await pool.query('SELECT * FROM user WHERE username = ?', [username])
    if(rows.length > 0){
      const user = rows[0];
      const constrasenaValida = await compararContras(password, user.password)
      console.log(user)
      if(constrasenaValida){
        done(null, user)
      }else{
        done(null, false, {message : 'El nombre de usuario o Contraseña son incorrectos'})
      }
    }else{
      return done(null, false, {message: 'El nombre de usuario o Contraseña son incorrectos'})
    }
  }))

  // Sign up
  passport.use('local.signup', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'contrasena',
    passReqToCallback: true
  }, async (req, username, password, done) => {
  
    let newUser = {
      username,
      password
    };
    newUser.password = await encriptarContras(password);
    // Saving in the Database
    const result = await pool.query('INSERT INTO user SET ?', [newUser]);

    console.log(result)

    newUser.id_user = result.insertId;
    return done(null, newUser);
  }));


  passport.serializeUser((user, done) => {
    done(null, user.id_user);
  });
  
  passport.deserializeUser(async (id_user, done) => {
    const rows = await pool.query('SELECT * FROM user WHERE id_user = ?', [id_user])
    done(null, rows[0]);

  })