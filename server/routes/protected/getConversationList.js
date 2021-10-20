const db = require('../../helper/db')
const SessionManagement = require('../../helper/sessions')
exports.getConversationList = function(req,res){
    var tempUsers        =  []
    var conversationList =  []
    const loggedUser     =  req.body.loggedUser
    const command        =  `SELECT t1.id, t1.sender, t1.receiver, t1.message, IF(t1.hasRead,'true','false') hasRead FROM messages t1 ` 
        + `INNER JOIN ( SELECT MAX(id) as id, sender,receiver,message, IF(hasRead,'true','false') hasRead FROM messages `
        + ` WHERE (sender='${loggedUser}' AND senderDeleted=0) OR (receiver='${loggedUser}' AND receiverDeleted=0) GROUP BY sender, receiver) t2 `
        + ` ON t1.id = t2.id ORDER BY t1.id DESC`
    db.connect.query(command,(listError,listData)=>{
        if(listError){
            res.status(400).json({statu:false, message:listError})
        }
        else {
            listData.forEach(element => {
                let sender   = element.sender
                let receiver = element.receiver
                let name     = (sender === loggedUser) ? receiver : sender ///+++
                let read     = (sender === loggedUser) ? true : (element.hasRead === 'true') ///+++
                if(!tempUsers.includes(name)){
                    const socketUser = SessionManagement.getClient(name)
                    const isOnline = socketUser === undefined ? false : true
                    conversationList.push({user:name, read:read, online:isOnline})
                    tempUsers.push(name)
                }
            });
            res.status(200).json({statu:true, conversations:conversationList})
        }
    })
}