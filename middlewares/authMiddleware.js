import jwt from "jsonwebtoken";

const authMiddleware = async (req,res,next)=>{
    if(req.headers.authorization.split(" ").length == 2){

        const [token_name,token] = req.headers.authorization.split(" ")
        if(token_name === 'Bearer' && token){
            
            try{
                //verify jwt
                const result = await jwt.verify(token, process.env.JWT_SECRET_KEY);
                console.log(result)
                req.user_id = result.id
                next()
            }catch(error){
                res.status(401).send({
                    message:"unauthorized",
                    success:false
                })
            }
        }
    }else{
        res.status(401).send({
            message:"unauthorized",
            success:false
        })
    }
    
    
}
export default authMiddleware