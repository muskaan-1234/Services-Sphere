var webtoken=require("jsonwebtoken");

exports.jwtAuth=(req,resp,next)=>
{
    const token=req.headers['authorization']
   const isValid= webtoken.verify(token,process.env.sec_key);
   if(isValid)
   { 
   const dtoken=webtoken.decode(token,process.env.sec_key);
     req.email=dtoken.email;
     next();
   }
   else
   {
     resp.json({status:false,message:"Your token is invalid"});
     return;
   }
}