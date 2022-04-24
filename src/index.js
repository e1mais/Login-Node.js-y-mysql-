const express = require('express');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session);

const { database } = require('./keys');

//inicialización 
const app = express()
require('./libs/passport') //libreria completa

// configuración
app.set('port', process.env.PORT || 3001);

//middlewares
app.use(session({
  secret: 'elmaisConnectsql',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())
//variables

//Rutas
app.use(require('./routes/index'))
app.use(require('./routes/auth'))

//Public
app.use(express.static(path.join(__dirname, 'public')))

//Iniciar
app.listen(app.get('port'), ()=>{
  console.log('Servidor en el puerto', app.get('port'))
})