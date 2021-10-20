const jwt = require('jsonwebtoken');

module.exports = (socket,next) => {
    if(socket.handshake.query && socket.handshake.query.token){
        jwt.verify(socket.handshake.query.token, socket.app.get('api_secret_key'),(err,decoded)=>{
            if(err){
                res.json({
                    statu:false,
                    message:"FAILED_AUTHENTICATE_TOKEN",
                    details:err
                })
            }
            else{
                socket.decode = decoded;
                next();
            }
        });
    }
    else{

        res.json({
            statu:false,
            message: "TOKEN_NOT_PROVIDED"
        })
    }
}