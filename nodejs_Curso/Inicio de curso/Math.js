Objeto_Math={};
function Add(x1,x2) {
    return x1+x2;    
}
function divide(x1,x2) {
    if(x2==0){
        console.log('No se puede dividir por cero')
    }    
    else{
        return x1/x2;
    }
}
function substract(x1,x2) {
    return x1+x2;
    
}
/*exports.Add=Add; //->exporta las funciones como un objeto 
exports.divide=divide;//->exporta la funcion divide como elemento de un objeto
*/
Objeto_Math.Add=Add;
Objeto_Math.divide=divide;

//Para exportar directamente funciones variable u objetos utilizamos la palabra clave "module.exports"

module.exports=Objeto_Math;//->Exportar un objeto
//module.exports=substract;//->exportar solo una funcion