const db = require('../../helper/db')
exports.getMessage = function(req,res){
    const loggedUser    = req.body.loggedUser
    const targetUser  = req.body.targetUser
    const command   = `SELECT sender, receiver, message, IF(hasRead,'true','false') hasRead, datetime FROM messages WHERE (sender='${loggedUser}' AND receiver='${targetUser}' AND senderDeleted=0) OR (sender='${targetUser}' AND receiver='${loggedUser}' AND receiverDeleted=0)`
    db.connect.query(command,(err,data)=>{
        if(err)
            res.status(400).json({statu:false, message:err})
        else {
            res.status(200).json({statu:true, message:data})
        }
    })
}