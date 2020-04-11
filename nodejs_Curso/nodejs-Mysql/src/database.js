const mysql = require('mysql');
const {database} = require('./keys');//del archivo keys solo se requiere  el objeto llama database y se lo pone entre {}
const {promisify} = require('util');//modulo para convertir callbacks en promesas asyn await

const pool=mysql.createPool(database);

pool.getConnection((err,connection)=>{
    if(err){
        if(err.code==='PROTOCOL_CONNECTION_LOST'){
            console.error('1. database conection was closed')
        }
        if(err.code==='ER_CON_COUT_ERROR'){
            console.error('2. DATABASE HAS TO WAY CONNECTIONS');
        }
        if(err.code==='ECONNREFUSED'){
            console.error('3. database connection was refused')
        }
    }
    if(connection){
        connection.release();        
        console.log('DB is Connected');
        return;
    } 
        
});
//promisify  convertir en promesas lo q eran  callbacks y usar asyn awayt
pool.query=promisify(pool.query);

module.exports = pool;