const express =require('express');//framwork  back end express
const morgan=require('morgan');//informacion del servidor en consola
const exphbs =require('express-handlebars');//motor de plantilla como razor pero este se llama handlebars
const path=require('path');//para unir los enlaces de las carpetas
const flash=require('connect-flash');//Modulo para enviar mensajes al cliente
const session=require('express-session');//guardar sesiones en el servidor y en el cliente de inicios de sesion y caracteristicas del servidor
const MySQLStore=require('express-mysql-session');
const{database} = require('./keys');
const passport=require('passport');




//initializations
const app= express();//inizializar el framework
require('./lib/passport');



//settings
//.set guarda como primer dato un nombre de la variable, y segundo parametro el valor
app.set('port',process.env.PORT || 4000);//en la variable port se  configurar el puerto. Si existe un puerto tomalo de lo contrario use el 4000
app.set('views',path.join(__dirname,'views'))//en la variable views se gurda el path o la direccion de la carpeta views 
app.engine('.hbs',exphbs({//configuracion del motor de plantilla como la  principal, vista parcial y demas
    defaultLayout:"main",//vista principal
    layoutsDir: path.join(app.get('views'),'layouts'),//direccion a la vista principal path de views + carpeta layouts donde se encuentra el main.js
    partialsDir: path.join(app.get('views'),'partials'),//direccion a las vistas parciales q son parte de html 
    extname:'.hbs',//extension q se le da a las plantilla main.hbs->handlebars
    helpers:require('./lib/handlebars')//todas las funciones q se necesiten realizar en las vistas son llamadas desde el archivo handlebars en la carpeta lib
}));
//console.log('la ruta a la carpeta views es :'+app.get('views')+'la ruta a layour ya partials es'+ path.join(app.get('views'),'layouts'))
app.set('view engine','.hbs')//se inicializa el motor de busqueda una vez configurado 
//middlewares
app.use(session({
    secret: 'miguelito123',
    resave: false,
    saveUninitialized:false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));//arranque del programa en package.json en la llave scripts se configuraa un arranque automatico con el nombre de "dev" y valor nodemon que hace q se reinicie el servidor por cada cambio q se ha inde.js archivo principal
app.use(express.urlencoded({extended: false}));
app.use(express.json());//trabajar con objetos json
app.use(passport.initialize());
app.use(passport.session());



//gloval variables
app.use((req,res,next)=>{
    app.locals.message=req.flash('message');
    app.locals.success=req.flash('success');
    app.locals.user=req.user;
    next();
})

//routes
app.use(require('./routes'));
app.use(require('./routes/autentication'));
app.use('/links',require('./routes/links'))
//public
app.use(express.static(path.join(__dirname,'public')))
//starting the server
app.listen(app.get('port'),()=>{
    console.log('server on port: ', app.get('p