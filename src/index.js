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

const port = process.env.PORT;
//Settings
app.listen(port || 3000);
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
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());



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

