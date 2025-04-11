
import express from 'express';
const app=express()
import  mongoose from 'mongoose'

import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import cookieParser from 'cookie-parser'
app.use(cookieParser())
const PORT = process.env.PORT || 5000

import userRouter from './router/userRouter.js'

// const allowedOrigins = [
//   'http://localhost:4200',
//   'https://239a-103-214-235-11.ngrok-free.app'
// ];

app.use(cors({
    origin: 'http://localhost:4200', 
    credentials: true,           
  }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


mongoose.connect( process.env.MONGO_URI, {
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error('MongoDB Connection Error:', err));


app.use('/',userRouter)

app.listen(PORT,()=>{
    console.log(`Server is runng at http://localhost:${PORT}`)
    
})