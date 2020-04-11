 

export class Login extends  {
    constructor(username,password){
        this._username = username;
        this._password = password ;
    }

    authenticate(){

    }
    
    generateJwt(){

    }

    populateResponse(){

    }


}

const token = jwt.sign({
  sub: user.id,
  username: user.username
}, "mykey", {expiresIn: "3 hours"});
res.status(200).send({access_token: token})

app.get("/asset/secret", jwtCheck, (req, res) => {
  res.status(200).send("Only logged in people can see me");
});


const expressjwt = require("express-jwt");

