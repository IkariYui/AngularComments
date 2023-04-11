const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Ecorzo33+',
    database:'loginangular',
    insecureAuth: true
    
});

mysqlConnection.connect(error =>{
    if(error){
        console.log('Error al conectar',error);
        return;
    }else{
        console.log('Db connected')
    }
    
});

module.exports = mysqlConnection;