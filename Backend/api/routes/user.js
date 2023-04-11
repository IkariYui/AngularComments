const express = require('express');
const router = express.Router();

const mysqlConnection = require('../connection/connection');

const jwt = require('jsonwebtoken');


router.get('/',(req,res)=>{
    mysqlConnection.query('select * from user', (error,rows,fields)=>{
        if(!error){
            res.json(rows);
        }else{
            console.log(error);
        }
    })
});

router.post('/singin',(req,res)=>{  
     const {userName, password} = req.body; 
     mysqlConnection.query('select userName, roleId from user where userName=? and password=?',
     [userName,password],
     (error,rows,fields)=>
     {
        if(!error){
           if(rows.length>0){
               let data = JSON.stringify(rows[0]);
               const token = jwt.sign(data, 'Juan');
               res.json({token});
           }else{
             res.json('Usuario o clave incorrectos')
           }
        }else{
            console.log(error);
        }
     }
     )
} );


router.post('/test', verifyToken,(req,res) =>{
    console.log(req.data);
    
    res.json('Información secreta');
})

function verifyToken(req,res,next){
    if(!req.headers.authorization) return res.status(401).json('No autorizado');

    const token = req.headers.authorization.substr(7); 
    if(token !=''){
       const content = jwt.verify(token,'Juan');
       req.data = content;
       next(); 
    }else{
        res.status(401).json('Token vacío'); 
    }
}



module.exports = router;
