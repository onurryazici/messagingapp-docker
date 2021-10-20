const db = require('../../helper/db')
exports.deleteConversation = function(req,res){
    const loggedUser   = req.body.loggedUser
    const selectedUser = req.body.selectedUser
    const updateSFlagcommand = `UPDATE messages SET senderDeleted=1 WHERE (sender='${loggedUser}' AND receiver='${selectedUser}'); `
    const updateRFlagcommand = `UPDATE messages SET receiverDeleted=1 WHERE (sender='${selectedUser}' AND receiver='${loggedUser}'); `
    const deleteCommand      = `DELETE FROM messages WHERE (receiver='${loggedUser}' AND sender='${selectedUser}' AND senderDeleted=1 AND receiverDeleted=1) `
                                + `OR (receiver='${selectedUser}' AND sender='${loggedUser}' AND senderDeleted=1 AND receiverDeleted=1)`
    function UpdateReceiverFlag(){
        return new Promise((resolve,reject)=>{
            db.connect.query(updateRFlagcommand,(error)=>{
                if(error)
                    reject()
                else
                    resolve()
            })
        })
    }
    function UpdateSenderFlag(){
        return new Promise((resolve,reject)=>{
            db.connect.query(updateSFlagcommand,(error)=>{
                if(error)
                    reject()
                else
                    resolve()
            })
        })
    }
    function Delete(){
        return new Promise((resolve,reject)=>{
            db.connect.query(deleteCommand,(error)=>{
                if(error)
                    reject()
                else
                    resolve()
            })
        })
    }

    UpdateReceiverFlag().then(()=>
    UpdateSenderFlag()).then(()=>
    Delete().then(()=>{
        res.status(200).json({statu:true, message:"CONVERSATION_DELETED"})
    }).catch((error)=>{
        res.status(400).json({statu:false, message:error})
    })
    )
    /*
    db.connect.query(updateSFlagcommand,(err1)=>{
        db.connect.query(updateRFlagcommand,(err2)=>{
            db.connect.query
        })
        if(err1){
            res.status(400).json({statu:false, message:err})
        }
        else
            res.status(200).json({statu:true, message:"CONVERSATION_DELETED"})
    })*/
}


