import express from 'express';
import mysql from 'mysql';

const app = express();
app.use(express.json());

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'msipc2004',
    database:'code_saver'
})

db.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("MySQL Connected");
    }
})

app.get('/',(req,res)=>{
    res.send("Node is running");
})

app.post('/login',(req,res)=>{
    const{email,password}=req.body;
    console.log(email,password);
})

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})