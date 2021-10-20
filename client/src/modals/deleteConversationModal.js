import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { DELETE_SELECTED_CONVERSATION } from '../redux/functions';
import { MessengerStore } from '../redux/messengerStore';
import styles from '../styles.module.css'
import axios from 'axios';

export default function DeleteConversationModal() {
    const [show, setModalShow] = useState(false);
    const selectedUser = useSelector(state => state.selectedUser)
    const loggedUser   = useSelector(state => state.loggedUser)
    //const API_URL = MessengerStore.getState().config.API_URL
    //const API_URL_DeleteConversation = MessengerStore.getState().config.API_URL_DeleteConversation
    function DeleteConversation() {
        axios.post("http://"+window.location.hostname+":4001/api/protected/deleteConversation",{
            loggedUser   : loggedUser,
            selectedUser : selectedUser
        }).then((response)=>{
            if(response.data.statu){
                MessengerStore.dispatch(DELETE_SELECTED_CONVERSATION(selectedUser))
                setModalShow(false)
            }
        })
    }
    return (
        <React.Fragment>
          <Button variant="flat" onClick={()=>setModalShow(true)} className={styles.MdeleteConversationButton}>
            Konuşmayı Sil
          </Button>
          <Modal show={show} onHide={()=>setModalShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Uyarı!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Bu konuşmayı silmek istediğinize emin misiniz?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=>setModalShow(false)}>
                Hayır
              </Button>
              <Button variant="danger" onClick={()=>DeleteConversation()} >
                Evet
              </Button>
            </Modal.Footer>
          </Modal>
        </React.Fragment>
    )
}
