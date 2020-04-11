require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const PORT = process.env.PORT || 3300
var authController = require('./app/controllers/authController')
// const authenticatetoken = require('app/controllers/authController.js')

app.use(express.json());


app.get('/',authController.authenticatetoken, (req, res) => {
  res.send('Hello World')
})



app.patch('/',authController.authenticatetoken, (req, res) => {
  res.send("Great is the lord")
})




/*
app.get('/',authenticatetoken, (req, res) => {
  res.send('Hello World')
})
 
 app.post('/login', (req, res) => {
   //Authenticate 
   var username = req.body.username
	 var password = req.body.password

   const user = {username:username}
   const accessToken =  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
   res.send({accessToken:accessToken})
})

function authenticatetoken(req,res,next){
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

*/

var authRoutes = require('./app/routes/authRoutes')
authRoutes(app)

app.listen(PORT, () => console.log(`Backend is running on port :${PORT}`))
 



// require('crypto').randomBytes(64).toString('hex')