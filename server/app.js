const express     = require("express");
const socketIo    = require("socket.io");
const http        = require("http");
const route       = require("./routes/routes");
const app         = express();
const port        = process.env.PORT || 4001;
const server      = http.createServer(app);
const SessionManagement = require('./helper/sessions')
const bodyParser  = require('body-parser')
const config      = require('./config');                   
const verifyToken = require("./middleware/verifyToken");
const db          = require('./helper/db')
const cors        = require('cors')
const io          = socketIo(server,{
  cors:{
    origin:"http://localhost:3000", // BURAYA MESSENGER UI'nin çalıştığı ip:port gelecek
    methods:["GET","POST"],
    credentials:true
  }
});
app.set('api_secret_key',config.api_secret_key)
app.use(bodyParser.urlencoded({ extended: true }));   
app.use(bodyParser.json());   
app.use(cors())
app.use('/api',route);
//app.use('/api/protected', verifyToken);  ŞİMDİLİK BURASI DEVRE DIŞI
let interval;
//io.use(verifyToken); // ŞİMDİLİK BURASI DEVRE DIŞI
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("USER_CONNECTED", (username)=>{
    if(username!==null){
      SessionManagement.addClient(username,socket.id)
      socket.broadcast.emit(`${username}_ONLINE_NOTIFY`)
    }
  })

  socket.on("IS_HE_ONLINE", (targetUser)=>{
    var targetUserId = SessionManagement.getClient(targetUser)
    if(targetUserId!==undefined)
    {
      const payload = {
        target:targetUser,
        online:true
      }
      socket.emit("ONLINE_NOTIFY", payload)
    }
  })

  socket.on("disconnect", () => {
    const disconnectedUser = SessionManagement.getClientBySocketId(socket.id)
    console.log("Client disconnected " + disconnectedUser);
    socket.broadcast.emit(`${disconnectedUser}_OFFLINE_NOTIFY`)
  })

  socket.on("SEND_MESSAGE", (sender,receiver,message)=>{
    const date     = new Date()
    const YYYY     = date.getFullYear()
    const dd       = date.getDate()
    const mmonth   = date.getUTCMonth() + 1
    const hh       = date.getHours()
    const MMinute  = date.getMinutes()
    const ss       = date.getSeconds()
    const datetime = `${YYYY}-${mmonth}-${dd} ${hh}:${MMinute}:${ss}`
    const command  = `INSERT INTO messages (sender,receiver,message,datetime) VALUES('${sender}','${receiver}','${message}','${datetime}')`
    db.connect.query(command,(err,data)=>{
        var receiverID = SessionManagement.getClient(receiver)
        const payload = {
          sender    : sender,
          receiver  : receiver,
          message   : message,
          datetime  : datetime
        }
        socket.to(receiverID).emit("INCOMING_MESSAGE", payload) // INCOMING MESSAGES
        //socket.to(sender).emit(sender, dataa)   // OUTGOING MESSAGES
    })
  })

  socket.on("SET_TYPING", (from, target, typing)=> {
    var targetUserId = SessionManagement.getClient(target)
    const payload = {
      from   : from,
      typing : typing
    }
    socket.to(targetUserId).emit("TYPING_NOTIFY", payload)
  })

  socket.on("SET_READ", (from, target)=>{
    const updateReadFlagCommand = `UPDATE messages SET messages.hasRead=1 WHERE sender='${target}' AND receiver='${from}'`
    db.connect.query(updateReadFlagCommand,()=>{
      var targetUserId = SessionManagement.getClient(target)
      const payload = {
        from    : from,
        seen    : true
      }
      socket.to(targetUserId).emit("SEEN_NOTIFY", payload)
    })
    
  })
});
server.listen(port, () => console.log(`Listening on port ${port}`));