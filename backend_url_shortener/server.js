
const express=require('express')
const app=express()
require('dotenv').config()
const cors=require('cors')
const PORT = process.env.PORT || 5000

app.use(cors())

app.get('/',(req,res)=>{
    res.send('Hellooo')
})

app.listen(PORT,()=>{
    console.log(`Server is runng at http://localhost:${PORT}`);
    
})