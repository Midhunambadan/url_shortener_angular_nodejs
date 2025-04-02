
const express=require('express')
const app=express()
const mongoose=require('mongoose')

require('dotenv').config()
const cors=require('cors')
const PORT = process.env.PORT || 5000

const userRouter=require('./router/userRouter')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log(' MongoDB Connected'))
.catch((err)=>console.error('MongoDB Connection Error:', err))


app.use('/',userRouter)




app.listen(PORT,()=>{
    console.log(`Server is runng at http://localhost:${PORT}`)
    
})