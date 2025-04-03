
const express=require('express')
const router=express.Router()

const userController=require('../controllers/userController')


router.post('/',userController.home)
router.post('/signup',userController.signup)


module.exports=router