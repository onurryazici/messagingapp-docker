import axios from 'axios';
import { toast } from 'material-react-toastify';
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { FaPlusCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { ADD_NEW_CONVERSATION, MOVE_CONVERSATION_TO_TOP, SET_SELECTED_USER } from '../redux/functions';
import { MessengerStore } from '../redux/messengerStore';
import MessengerSocket from '../messengerSocket';
import styles from '../styles.module.css'
export default function NewConversationModal() {
    const [message, setMessage]       = useState("")
    const [targetUser, setTargetUser] = useState("")
    const [show, setModalShow]        = useState(false);
    const conversationList = useSelector(state => state.conversationList)
    const loggedUser       = useSelector(state => state.loggedUser)
    const tokenName        = useSelector(state => state.config.tokenName)

    function NewConversation(event) {
      event.preventDefault()
      axios.post("http://"+window.location.hostname+":3030/api/secured/isUserExist",{
        user:targetUser,
        token:localStorage.getItem(tokenName)
      }).then((response)=>{
        if(response.data.statu){
          toast.success("Mesajınız gönderildi")
          const sender    = loggedUser
          const receiver  = targetUser
          const date      = new Date().getTime()
          if(message !== ""){
              MessengerSocket.emit("SEND_MESSAGE", sender,receiver,message,date)
              let onlineState = targetUser === loggedUser ? true : null
              let exist = conversationList.some((element)=> element.user === targetUser)
              if(exist){
                MessengerStore.dispatch(SET_SELECTED_USER(""))
                MessengerStore.dispatch(MOVE_CONVERSATION_TO_TOP(targetUser))                
              }
              else {
                MessengerStore.dispatch(ADD_NEW_CONVERSATION(targetUser,true,onlineState))
              }
              setMessage("")
              setModalShow(false)
          }
        }
        else 
          toast.error("Böyle bir kullanıcı yok")
      }).catch(err=>toast.error("Hata :" + err))
    }
    
    return (
        <React.Fragment>
          <Button variant="flat" onClick={()=>setModalShow(true)} className={styles.MnewConversationButton}>
            <FaPlusCircle fontSize="25px"/> Yeni mesaj
          </Button>
          <Modal show={show} onHide={()=>setModalShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Yeni bir konuşma başlat</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Control type="text" 
                    placeholder="Kullanıcı adı" 
                    onChange={(event)=>setTargetUser(event.target.value)}
                    /><br/>
              <Form.Control as="textarea" rows={3} 
                    placeholder="Mesajınız"
                    onChange={(event)=>setMessage(event.target.value)}/>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=>setModalShow(false)}>
                Vazgeç
              </Button>
              <Button variant="flat" 
                  onClick={(event)=>NewConversation(event)} 
                  style={{backgroundColor:'#3f7fb3', color:'#fff'}} 
                  disabled={message.length===0 || message.trim(' ').length === 0 || targetUser.length === 0 || targetUser.trim(' ').length === 0}>
                Gönder
              </Button>
            </Modal.Footer>
          </Modal>
        </React.Fragment>
    );
}
