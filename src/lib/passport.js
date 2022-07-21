const passport = require('passport');
const Pool = require('../database');
const LocalStrategy = require('passport-local').Strategy;
const helpers = require('../lib/helpers');


passport.use('/local.signin', new LocalStrategy({
    usernameField: 'usuario_ci',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, usuario_ci, password, done) =>{
    const rows = await Pool.query('SELECT * FROM usuario WHERE usuario_ci = ?', [usuario_ci]);

    if(rows.length > 0){
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if(validPassword){
            done(null, user, req.flash('success', 'Welcome' + user.usuario_ci));
        }else{
            done(null, false, req.flash('message', 'Contraseña Incorrecta'));
        }
    
    } else {
        return done(null, false, req.flash('message', 'Usuario no Registrado'));
    }
}));



passport.use('local.signup', new LocalStrategy({
    usernameField: 'usuario_ci',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, usuario_ci, password, done) =>{
    const { nombre, apellido } = req.body;
    const newUser = {
        usuario_ci,
        password,
        nombre,
        apellido
    }
    newUser.password = await helpers.encryptPassword(password);

    const result = await Pool.query('INSERT INTO usuario SET ?', [newUser]);
    return done(null, newUser);
}));



passport.serializeUser((user, done) => {
    done(null, user.usuario_ci);
});

passport.deserializeUser(async (usuario_ci, done) =>{
    const rows = await Pool.query('SELECT * FROM usuario Where usuario_ci = ?', [usuario_ci]);
    done(null, rows[0]);
});