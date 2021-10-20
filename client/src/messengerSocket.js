import  io  from "socket.io-client";
import { ADD_NEW_CONVERSATION, MOVE_CONVERSATION_TO_TOP, PUSH_TO_SELECTED_CONVERSATION, SET_CONVERSATION_IS_TYPING, SET_CONVERSATION_READ, UPDATE_EXIST_CONVERSATION} from "./redux/functions";
import { MessengerStore } from "./redux/messengerStore";

const URL    = "http://localhost:4001";
const MessengerSocket = io(URL, { autoConnect:false, query:{token:localStorage.getItem("user-token")} });

MessengerSocket.onAny((event, ...args) => {
  console.log(event, args);
});

MessengerSocket.on("INCOMING_MESSAGE", (data)=>{
  const loggedUser       = MessengerStore.getState().loggedUser
  const selectedUser     = MessengerStore.getState().selectedUser
  const conversationList = MessengerStore.getState().conversationList
  if(data.sender === selectedUser) {
      MessengerStore.dispatch(PUSH_TO_SELECTED_CONVERSATION(data))
      MessengerStore.dispatch(SET_CONVERSATION_READ(selectedUser,true))
      let from     = loggedUser
      let target   = selectedUser
      MessengerSocket.emit("SET_READ", from, target)
      MessengerStore.dispatch(UPDATE_EXIST_CONVERSATION(target,true,true))
  } else {
      let isConversationExist = conversationList.some((element)=>element.user===data.sender)
      if (isConversationExist) {
        MessengerStore.dispatch(UPDATE_EXIST_CONVERSATION(data.sender,false,null))
        MessengerStore.dispatch(MOVE_CONVERSATION_TO_TOP(data.sender))
      }
      else
        MessengerStore.dispatch(ADD_NEW_CONVERSATION(data.sender,false,true))
  }
})

MessengerSocket.on("TYPING_NOTIFY", ({from, typing})=>{
  MessengerStore.dispatch(SET_CONVERSATION_IS_TYPING(from,typing))
})

MessengerSocket.on("ONLINE_NOTIFY", ({target,online})=>{
  const conversationList = MessengerStore.getState().conversationList
  let isConversationExist = conversationList.some((element)=>element.user===target)
  if(isConversationExist)
    MessengerStore.dispatch(UPDATE_EXIST_CONVERSATION(target,null,online))
})

export default MessengerSocket;
