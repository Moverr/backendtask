let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
 
fs = require('fs');

chai.use(chaiHttp);



describe('Server is reachable', () => {
      it(' It should show that the server is reachable', (done) => {
       chai.request(server)
            .get('/')
            .end((err, res) => {
                  res.should.have.status(200); 
              done();
            });        
      });
  });


 

 
describe('Testing the Login Functionality', () => {
    
 

      it(' It shourld return a valid token ', (done) => {
       chai.request(server)
            .post('/login') 
            .send({
              	"username":"moverr@gmail.com",
	            "password":"password"
            })            
            .end((err, res) => { 
                  res.should.have.status(200)
                  res.body.should.have.property('accessToken')               
              done();
            });        
      });


        it(' It should return 401 un authorized ', (done) => {
       chai.request(server)
            .post('/login') 
            .send({
                 
               
            })            
            .end((err, res) => { 
                   res.should.have.status(401); 
                    res.body.error.should.equal(' Username and Password are mandatory ');
              done();
            });        
      });


  });

 

describe('Testing Prohibited endpoints, Patching and Image upload ', () => {
let access_token = "";
let invalid_token = "";

  it(' It shourld return a valid token ', (done) => {
       chai.request(server)
            .post('/login') 
            .send({
              	"username":"moverr@gmail.com",
	            "password":"password"
            })            
            .end((err, res) => { 
                  res.should.have.status(200)
                  res.body.should.have.property('accessToken')
                  access_token =  res.body.accessToken
                  
              done();
            });        
      });


      it(' It should return forbidden due to invalid token ', (done) => {
       chai.request(server)
            .patch('/')
            .set('authorization', invalid_token)
            .send({
              	 
            })            
            .end((err, res) => {  
              res.should.have.status(403); 
              done();
            });            
      });


    let patch = {
        "original":{
                "baz": "ddateat",
                "foo": "bar"
        },
        "patch":
            [
                { "op": "replace", "path": "/baz", "value": "Corona Virus" },
                { "op": "add", "path": "/hello", "value": "world"},
                { "op": "remove", "path": "/foo" }
                
            ]
        

    };

      it(' Should Pass Token and Patch  ', (done) => {
       chai.request(server)
            .patch('/')
            .set('authorization',"Bearer "+ access_token)
            .send( patch)            
            .end((err, res) => {  
              res.should.have.status(200); 
               res.body.baz.should.equal('Corona Virus');
               res.body.hello.should.equal('world'); 
              done();
            });            
      });


        it(' Should Upload Image and Return thumbnail url   ', (done) => {
       chai.request(server)
            .post('/upload')
             .attach('avatar', fs.readFileSync('./test/assets/ad.jpg'), 'ad.jpg')  
            
            .set('authorization',"Bearer "+ access_token)
                            
            .end((err, res) => {  
              res.should.have.status(200);               
              done();
            });            
      });



  });



 

