'use_strict'
require('dotenv').config()
const jwt = require('jsonwebtoken')
const jsonpatch  = require('fast-json-patch');

var resize = require('../services/resize');
var multer  = require('multer')
const path = require('path');
const PORT = process.env.PORT || 3300
const HOST_URL = process.env.HOST_URL 


/*
Function to handle Login Functionality
*/
exports.login =  (req,res)=> {
   var username = req.body.username
   var password = req.body.password 
   const user = {username:username}
   const accessToken =  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
   res.send({accessToken:accessToken}) 
}



/* Function to Handle Patch */
exports.patch =  (req,res)=> {
   let document  = null
   document = jsonpatch.applyPatch(req.body['original'], req.body['patch']).newDocument; 
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
