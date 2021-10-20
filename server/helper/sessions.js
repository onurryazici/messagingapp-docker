var clients = []

function addClient(_username, _socketId){
    clients[_username] = _socketId;
}

function getClient(_username){
    return clients[_username];
}
function getClientBySocketId(_socketId){
    const index = Object.keys(clients).find((key)=>clients[key]===_socketId)
    return index;
}
function removeClient(_username){
    delete clients[_username]; // BU OLMAYABİLİR
}
function getAllUsers(){
    return clients
}
module.exports = {
    getClient,
    getClientBySocketId,
    addClient,
    getAllUsers,
    removeClient
} 