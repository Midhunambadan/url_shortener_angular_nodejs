
const express=require('express')
const app=express()
const mongoose=require('mongoose')

require('dotenv').config()
const cors=require('cors')
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())



mongoose.connect(process.env.MONGO_URI,{
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
.then(()=>{
    console.log(' MongoDB Connected')

}).catch((err)=>{
    console.error('MongoDB Connection Error:', err)
}
    
)

app.get('/',(req,res)=>{
    res.send('Hellooo')
})

app.listen(PORT,()=>{
    console.log(`Server is runng at http://localhost:${PORT}`)
    
})