const jsonpatch  = require('fast-json-patch');
const express = require('express')
const bodyParser = require('body-parser');

const app = express() 
const PORT = process.env.PORT || 3300
var authController = require('./app/controllers/authController')
var Resize = require('./app/middleware/Resize');
var multer  = require('multer')
//  var upload = multer({ dest: 'uploads/' })
var upload = require('./app/middleware/uploadMiddleware');

app.use(express.static(__dirname + 'public')); 
app.use('/images', express.static(__dirname + '/uploads'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.get('/',authController.authenticatetoken, (req, res) => {
  res.send('Hello World')
})


//not yest implemented staff 
app.patch('/',authController.authenticatetoken, (req, res) => {
   let document  = null
   document = jsonpatch.applyPatch(req.body['original'], req.body['patch']).newDocument; 
   res.send(document)
})
app.use(express.static('/uploads'))
const path = require('path');
app.post('/upload',authController.authenticatetoken,upload.single('avatar'),  async   (req, res) => {
  const imagePath = path.join(__dirname, '/uploads');
  console.log(req.file);
  const fileUpload = new Resize(imagePath);
  if (!req.file) {
    res.status(401).json({error: 'Please provide an image'});
  }
  const filename = await fileUpload.save(req.file.buffer);
  return res.status(200).json({ "url":"http://localhost:"+PORT+"/images/"+filename });

 
   
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