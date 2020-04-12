'use_strict'
require('dotenv').config()
const jwt = require('jsonwebtoken')
const jsonpatch  = require('fast-json-patch');

var resize = require('../services/resize'); 
const path = require('path'); 
const PORT = process.env.PORT || 3300
const HOST_URL = process.env.HOST_URL 


/*
Function to handle Login Functionality
*/
exports.login =  (req,res)=> {
   let username = (req.body.username === undefined) ? null : req.body.username
   let password = (req.body.password  === undefined) ? null : req.body.password
   if(username === null || password === null){
     return res.status(401).json({error: ' Username and Password are mandatory '});
   }  

   const user = {username:username}
   const accessToken =  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
   res.send({accessToken:accessToken}) 
}



/* Function to Handle Patch */
exports.patch =  (req,res)=> {
   let document  = null
  
   let original = (req.body.original === undefined) ? null : req.body.original
   let patch = (req.body.patch  === undefined) ? null : req.body.patch
   if(original === null || patch === null){
     return res.status(401).json({error: 'Invalid Request body, Origina and Patch are Mandatory'});
   }  
   document = jsonpatch.applyPatch(req.body.original, req.body.patch).newDocument; 
   res.send(document)

}




/* Function to Handle Thumbanail */
exports.thumbnailGenerator = async (req,res)=> {
  const imagePath = path.join(__dirname, '../../uploads');
  console.log(req.file);
  const fileUpload = new resize(imagePath);
  if (!req.file) {
    res.status(401).json({error: 'Please provide an image'});
  }
   fileUpload.save(req.file.buffer).
  then((filename)=>{
 return res.status(200).json({ "url":"http://"+HOST_URL+":"+PORT+"/images/"+filename });

  }).catch((err)=>console.log(err))
 

}
