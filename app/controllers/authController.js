'use_strict'
require('dotenv').config()
const jwt = require('jsonwebtoken')

exports.login =  (req,res)=> {
   var username = req.body.username
   var password = req.body.password
    //todo: Valiate the Username 
   const user = {username:username}
   const accessToken =  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
   res.send({accessToken:accessToken}) 
}


 exports.authenticatetoken=(req,res,next)=>{
  console.log(req.headers);
  const authHeader = req.headers['authorization']
  //todo: validate the auth header 
  const token = authHeader &&  authHeader.split(' ')[1]  
  if(token == null) res.status(401).send({'error':'Authorization header is empty '})

  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    if(err)   return res.sendStatus(403)

    req.user = user
     next()

  })

}


