const jwt             = require('jsonwebtoken');
const Client          = require('node-ssh').NodeSSH;

exports.authentication = async function(req,res){
    var client = new Client();   
    client.connect({
        host              : '127.0.0.1',
        port              : 22,
        username          : req.body.username,
        password          : req.body.password,
    }).then(()=>{
        client.dispose();
        const payload = req.body.username;
        const token = jwt.sign({payload},req.app.get('api_secret_key'),{
            expiresIn: '30m' //30 min
        });
        return res.status(200).json({
            statu            : true,
            loginSuccessfull : true,
            message          : "LOGIN_SUCCESSFULL",
            token            : token
        });
    }).catch(()=>{
        return res.status(200).json({
            statu            : false,
            loginSuccessfull : false,
            message          : "INCORRECT_LOGIN"
        });
    });
}