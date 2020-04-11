const fs= require('fs');//usualmente se le llama a la constante con el mismo nombre del modulo pero puede ser diferente

//const crear= fs.writeFile('','')-> de esta manera trabaja de forma sincrona es decir espera 
// a que termine la funcion para seguir con la proxima instruccion. 

// Para crear archivos->"forma asincrona. El objetivo principal"
fs.writeFile('./hola.txt','Hola mi mundo',function(error){//aqui esta trabajaondo de forma asincrona es decir
    //manda al sistema operativo a crear el archivo mientras nodejs delega la proxima instruccion
    if(error){
        console.log(error);
    }
    else{
        console.log('archivo creado exitosamente');
    }

})

fs.readFile('./hola.txt',function(error_Mio,datos){
    if(error_Mio){
        console.log(error_Mio);
    }else{
        console.log(datos)//forma maquina
        console.log(datos.toString())//forma de lectura
    }
})

