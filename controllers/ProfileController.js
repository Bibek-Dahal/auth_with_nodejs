import User from "../models/User.js"

class ProfileController{
    /*
        fetch user profile
    */

    static async profile(req,res){
        try{
            let user = await User.findById(req.user_id,{password:0})
            console.log(user)
            res.status(200).send({
                data:user,
                success:true
            })
        }catch(error){
            res.status(500).send({
                message:"Something went wrong",
                success:false
            })
        }
    }

    
}

export default ProfileController