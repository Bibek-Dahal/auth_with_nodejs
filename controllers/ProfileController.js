import User from "../models/User.js"
import Joi from "joi"
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

    static async updateProfile(req,res){
        const schema = Joi.object({
            username: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
        })
            // .with('username', 'birth_year')
            // .xor('password', 'access_token')
            // .with('password', 'repeat_password');
        
        const {error,value} = schema.validate({})
        res.send(error.details[0].message)
        

    }
}

export default ProfileController