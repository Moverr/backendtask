'use-stroct'
const express = require('express')
const bodyParser = require('body-parser');

const app = express() 
const PORT = process.env.PORT || 3300
 
//Defining static Content to be accessed publically
app.use(express.static(__dirname + 'public')); 
app.use('/images', express.static(__dirname + '/uploads'));
app.use(bodyParser.json());
 

//Defining Application Routes
var routes = require('./app/routes/routes')
routes(app)

app.listen(PORT, () => console.log(`Backend is running on port :${PORT}`))
  