const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySqlStore = require('express-mysql-session');
const passport = require('passport');



const {database} = require('./keys');


//Initializations 
const app = express();
require('./lib/passport');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');

//Middlewares
app.use(session({
    secret: 'try',
    resave: false,
    saveUninitialized: false,
    store: new MySqlStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


// Global Variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
})


//Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/expediente', require('./routes/expediente'));
app.use('/busqueda', require('./routes/busqueda'));
app.use('/usuario', require('./routes/usuario'));

//Public files
app.use(express.static(path.join(__dirname, 'public')));

//Starting server
app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'))
})