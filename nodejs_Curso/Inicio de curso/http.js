const http =require('http') 
const colors=require('colors')//node package manager npm install colors 
//npm tambien es utilizado para subir nuestro proyecto a un servidor
//npm se encarga de adjuntar todos los archivos necesario el comando es npm init
const handleServer= function(req,res){//request->solicitud del cliente,response->respuesta del servidor
    res.writeHead(404,{'content-type':'text/plain'});
    res.write('paila tu cuca');
    res.end(); 
}   

const server =http.createServer(handleServer);
server.listen(3000,function(){
    console.log('servidor en el puerto 3000'.green)
});//puerto y callback