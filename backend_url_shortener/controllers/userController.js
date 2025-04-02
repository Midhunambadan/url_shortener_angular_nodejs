
const random=require('short-id')

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


module.exports={
    home
}


