const SessionManagement = require('../../helper/sessions')
exports.getOnlineUsers = function(req,res){
    res.status(200).json({
        statu:true,
        details:SessionManagement.getAllUsers()
    })
}