
const random=require('short-id')
const User=require('../models/userModel')

const home=async (req,res)=>{
    try {
        let url = req.body.url
        let id=random.generate(8)
        console.log(id)
        return res.status(200).json({
            success:true,
            message:'Heyyy',
            data:url
        })
    } catch (error) {
        
    }
}


const signup= async (req,res)=>{
    try {
        const {email,name,password}=req.body

        let user =await User.findOne({email})
        if(!user){
            console.log('Not find a user')
            user = new User({ name, email, password })
            await user.save()
            res.status(201).json({ message: 'User registered successfully' });
        }

        return res.status(400).json({message:'User already exists'})

    } catch (error) {
        
    }
}



module.exports={
    home,
    signup
}


