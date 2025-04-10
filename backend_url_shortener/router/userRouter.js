
import express from 'express'
import userController  from '../controllers/userController.js'

const router=express.Router()

import authenticateToken from '../middleware/userAuth.js'


router.get('/',userController.home)
router.post('/signup',userController.signup)
router.post('/login',userController.login)
router.post('/logout',userController.logout)


// router.post('/create', userController.createUrl)
router.post('/create',authenticateToken, userController.createUrl)
router.get('/profile', authenticateToken, userController.userProfile)







export default router