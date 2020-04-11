const express=require('express');
const exphbs=require('express-handlebars');
const path=require('path');
const methodOverride = require('method-override');
const sesion=require('express-session');
const passport=require('passport');
const flash=require('connect-flash');//Modulo para enviar mensajes al cliente

//initialization 
const app= express();
require('./database');
require('./config/passport');

//settings
app.set('port',process.env.port || 3000);
app.set('views',path.join(__dirname,"views"))
app.engine('.hbs',exphbs({
    
    defaultLayout:"main.hbs",
    layoutsDir:path.join(app.get('views'),"layout"),
    partialsDir:path.join(app.get('views'),"partials"),
    extname:".hbs",
    helpers:require('./lib/handlebars')
}));
app.set('view engine','.hbs');


//midelwars

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));//sirve para q los formularios puedan enviar otros metodos com delete update 
app.use(sesion({
    secret:"miguelito",
    resave:true,
    saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//static files
app.use(express.static(path.join(__dirname,'public')));

//global vars
app.use((req,res,next)=>{
    app.locals.message=req.flash('message');
    app.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    res.locals.user=req.user;
    next();
})

//routes 
app.use(require('./routes'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));


app.listen(app.get('port'),()=>{
    console.log('listen on port: ', app.get('port'));
});
