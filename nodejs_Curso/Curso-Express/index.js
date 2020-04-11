/* const http = require('http');
const server=http.createServer((req,res)=>{
    res.statusCode=200;
    res.setHeader('Content-type','text/plain');
    res.end('hello world');
})
server.listen(3000,()=>{
    console.log('serve on port 3000')
}) */
const express=require('express');//->modulos express es un framework para trabajar con nodejs con javaescrtip en el lado del servidor
const morgan=require('morgan');//->modulo morgan para obtener informacion de las solicitudes del front end
//---------------------SETTINGS-_---------//

const app=express();
app.set('appName','MiguelTutorial');
app.set('port',3000);
app.set('view engine','ejs')

//----middlewares-----//
//los middlewar funcionan para procesar datos antes de que lleguen a las rutas
/* function logger(req,res,next){//parecido a "all" pero este funciona para cualquier
//ruta q creeemos primero se ejecuta este codigo y despues las acciones del routing
    console.log('request recived');
    console.log(`route reccived: ${req.protocol}://${req.get('host')}${req.originalUrl}`)
    next();
} */
app.use(morgan('dev'))
app.use(express.json());//->ejecutando un middlewar de express
//app.use(logger)//->ejecutando un middlewar local
/* app.use((req,res,next)=>{
    //este es un middlewar q  es una funcion callback de forma directa
}) */
//-----routing---------//
app.get('/',(req,res)=>{
    const data=[{name:'jhon'},{name:'joe'},{name:'cameron'},{name:'ryan'}]
    res.render('index.ejs',{people:data});
})
app.all('/user',(req,res,next)=>{//all->funciona para ejecutarse antes de todas las rutas en este caso "user"
    console.log('por aqui paso')
    next();
    //res.send('termino');
})
app.get('/user',(req,res)=>{
    res.json({
        name:'miguelito',
        lastname:'burbanito',
        nickname:'the abusadorcito'
    });
})
app.post('/user/:id',(req,res)=>{//:id->parametro de la peticion
    console.log(req.body);//cuertpo de la peticion
    console.log(req.params)
    res.send('post request reccived');
});
app.post('/about',(req,res)=>{
    res.send('<h2>post request reccived</h2>');
});
    
app.put('/user/:userID',(req,res)=>{
    res.send(`<h5>update ${req.params.userID} DATA${req.body.name} reccived</h5>`)
});
app.delete('/user/:userID',(req,res)=>{
    res.send(`user ${req.params.userID} deleted`);
});

//---middlewar q se ejecuta despues de las rutas---//
app.use(express.static('public'));
app.listen(app.get('port'),()=>{
    console.log(`serve on port ${app.get('port')}`);
    console.log(app.get('appName'));

})
