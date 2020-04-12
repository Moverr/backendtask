# Backend Task
This backend task is mearnt to achieve the following tasks

* Create a login functionality that returns a JWT token 
* Apply authentication verification on protected urls 
* Apply PATCH functionality on a request body (protected url)
* Create thumbnail on an image request via url , resizing it to a 50 x 50  pixels 

## How to work with the application

* Clone this URL 
* Run NPM Install to install all the packages 
* npm start to start the server 
* npm test to test the application
* npm run devStart to start the nodedemon development server 
* npm run coverage to run tests and their coverage

 
 # Example Payloadds
  * Login 
 url = localhost:port/login
 method = POST
 {
	"username":"username",
	"password":"password"
 }


 * Uploading Image
 url = localhost:port/upload
 method = POST
 filename  = avatar
 filevalue = choose an image from your machine 

 * Sending a patch request 
 url : localhost:port/ 
 method = patch

 body
 {
	"original":{
			 "baz": "ddateat",
			 "foo": "bar"
	},
	"patch":
		[
			{ "op": "replace", "path": "/baz", "value": "Belowved Nation" },
			  { "op": "add", "path": "/hello", "value": ["world"] },
			  { "op": "remove", "path": "/foo" }
			  
		]
	

}
