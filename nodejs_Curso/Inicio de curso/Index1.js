const os=require('os');
console.log(os.platform());
console.log(os.release());//TypeScript permite el autocompletado de codigo despues de escribir "." aparecen las opciones
console.log('free mem: '+os.freemem()/1e9);
console.log('total mem: '+os.totalmem()/1e9);