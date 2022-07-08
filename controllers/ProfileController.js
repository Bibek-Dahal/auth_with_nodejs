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

    static async joiVlaidation(req,res){
        const schema = Joi.object({
            username: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
        
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).
                required().
                messages({
                    'string.pattern.base':'password must contain atleast one digit one special character and one uppre case letter'
                }),
        
            repeat_password: Joi.
                any().
                valid(Joi.ref('password')).
                required().
                messages({
                    'any.only': 'kese ho vai log',
                    'any.required':'{{#label}} field is required'
                }),
        
        
            email: Joi.
                string().
                email().
                required().
                messages({
                    'any.required':'please provide your email'
                })
        })

        const { error, value } = schema.validate(req.body,{abortEarly:false});
        if(error){
            res.status(400).send(error)
        }
        
    }

    
}

export default ProfileController