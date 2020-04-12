'use_strict'
const jwt = require('jsonwebtoken')

const accessToken = process.env.ACCESS_TOKEN_SECRET
/*
Function to handle Verifying Authentication 
*/
exports.verifyauthenticatetoken=(req,res,next)=>{
  console.log(req.headers);
  const authHeader = req.headers['authorization']
  //todo: validate the auth header 
  const token = authHeader &&  authHeader.split(' ')[1]  
  if(token == null) res.status(401).send({'error':'Authorization header is empty '})

  jwt.verify(token,accessToken,(err,user)=>{
    if(err)   return res.sendStatus(403)

    req.user = user
     next()

  })

}

