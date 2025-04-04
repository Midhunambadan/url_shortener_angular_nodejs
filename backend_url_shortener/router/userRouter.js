
import express from 'express'
import userController  from '../controllers/userController.js'

const router=express.Router()


router.post('/',userController.home)
router.post('/signup',userController.signup)
router.post('/login',userController.login)



export default router