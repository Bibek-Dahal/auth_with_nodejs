import Joi from "joi"
import displayValidationError from '../utils/displayValidationError.js'
const pswdPtrn = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{6,20}$/;

export class validations{
    /*
        validation for registration
    */

    static register(req,res,next){

        const schema = Joi.object({
            first_name: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),

            middle_name: Joi.string().
                min(3).
                max(30),

            last_name: Joi.string().
                alphanum().
                min(3).
                max(30).
                required(),

            email: Joi.
                string().
                email().
                required(),
        
            password: Joi.string().
                pattern(new RegExp(pswdPtrn)).
                required().
                messages({
                    'string.pattern.base':'password must contain atleast one digit one special character and one uppre case letter'
                }),
        
            repeat_password: Joi.
                any().
                valid(Joi.ref('password')).
                required().
                messages({
                    'any.only': 'password and repeat password do not match',
                    'any.required':'{{#label}} is required'
                }) 
        })

        const { error, value } = schema.validate(req.body,{abortEarly:false},{errors:{label:'key'},wrap: {label: false}});
        if(!error){
            next()
        }else{
            const customErr = displayValidationError(error.details)
            res.status(400).send(customErr)
        }
        
    }

    static login(req,res,next){
        const schema = Joi.object({
            email: Joi.
                string().
                email().
                required(),

            password: Joi.string().
                required()
    
        })

        const { error, value } = schema.validate(req.body,{abortEarly:false},{errors:{label:'key'},wrap: {label: false}});
        if(!error) return next()
        
        const customErr = displayValidationError(error.details)
        res.status(400).send(customErr)
        

    }

    static passwordChange(req,res,next){
        const schema = Joi.object({
            old_password:Joi.string().
                required(),

            new_password: Joi.string().
                pattern(new RegExp(pswdPtrn)).
                required().
                messages({
                    'string.pattern.base':'password must contain atleast one digit one special character and one uppre case letter'
                }),
            
            repeat_password: Joi.
                any().
                valid(Joi.ref('new_password')).
                required().
                messages({
                    'any.only': 'password and repeat password do not match',
                    'any.required':'{{#label}} is required'
                }) 

        })

        const { error, value } = schema.validate(req.body,{abortEarly:false},{errors:{label:'key'},wrap: {label: false}});
        if(!error) return next()
        
        const customErr = displayValidationError(error.details)
        res.status(400).send(customErr)
    }

    static passwordResetEmail(req,res,next){
        const schema = Joi.object({
            email: Joi.
                string().
                email().
                required(),
        })

        const { error, value } = schema.validate(req.body,{abortEarly:false},{errors:{label:'key'},wrap: {label: false}});
        if(!error) return next()
        
        const customErr = displayValidationError(error.details)
        res.status(400).send(customErr)
    }
    

    static passwordReset(req,res,next){
        const schema = Joi.object({
            new_password: Joi.string().
                pattern(new RegExp(pswdPtrn)).
                required().
                messages({
                    'string.pattern.base':'password must contain atleast one digit one special character and one uppre case letter'
                }),
            
            repeat_password: Joi.
                any().
                valid(Joi.ref('new_password')).
                required().
                messages({
                    'any.only': 'password and repeat password do not match',
                    'any.required':'{{#label}} is required'
                }) 

        })
        
        const { error, value } = schema.validate(req.body,{abortEarly:false},{errors:{label:'key'},wrap: {label: false}});
        if(!error) return next()
        
        const customErr = displayValidationError(error.details)
        res.status(400).send(customErr)
    }
}