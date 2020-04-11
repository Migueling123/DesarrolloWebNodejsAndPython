const express=require('express');
const colors=require('colors')
const server=express();

server.get('/',function(req,res){
    res.send('<h1>Hola mundo desde nodejs y express</h1>')
    res.end();
});
server.listen(3000,function(){
    console.log('server on port 3000'.blue);
});
