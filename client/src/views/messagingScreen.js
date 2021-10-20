import React, { useEffect, useRef, useState } from 'react'
import { MOVE_CONVERSATION_TO_TOP, PUSH_TO_SELECTED_CONVERSATION, UPDATE_SELECTED_CONVERSATION } from '../redux/functions'
import { useSelector }  from 'react-redux'
import { Button, Form } from 'react-bootstrap'
import { FaPaperPlane } from 'react-icons/fa'
import { MessengerStore } from '../redux/messengerStore'
import BubbleMe         from './bubbleMe'
import BubbleSender     from './bubbleSender'
import styles           from '../styles.module.css'
import classNames from 'classnames'
import MessengerSocket from '../messengerSocket'

export default function MessagingScreen() {
    const [message, setMessage]  = useState(null)
    const [typing, setTyping]    = useState(false)
    const [isAcceptable, setisAcceptable] = useState(false)
    const messagingStage         = useRef(null)
    const loggedUser             = useSelector((state)=>state.loggedUser)
    const selectedUser           = useSelector((state)=>state.selectedUser)
    const loading                = useSelector((state)=>state.loading)
    const selectedConversation   = useSelector((state)=>state.selectedConversation)

    useEffect(() => {
        MessengerSocket.on("SEEN_NOTIFY",({from, seen})=>{
            if(from === selectedUser)
                MessengerStore.dispatch(UPDATE_SELECTED_CONVERSATION(seen))
        })
        if(messagingStage){
            messagingStage.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget:target } = event
                target.scroll({top:target.scrollHeight, behavior:'smooth'})
            })
        }
    }, [])    
    /*useEffect(() => {
        messagingStage.current.scrollTop = messagingStage.current.scrollHeight
    },[selectedConversation])*/
    useEffect(() => {
        setMessage("")
    }, [selectedUser])

    useEffect(() => {
        if(loading || (message===undefined || message ===null || message.length === 0 || message.trim(' ').length === 0)){
            setisAcceptable(false)
        }
        else {
            setisAcceptable(true)
        }
    }, [message,loading])

    // kalkmalı
    /*useEffect(() => {
        messagingStage.current.scrollTop = messagingStage.current.scrollHeight // BU BLOK KALDIRILACAK
    },)*/
    function onKeyDown(event) {
        if (event.keyCode == 13 && !event.shiftKey)
            event.preventDefault();
    }
    function onKeyUp(event) {
        setMessage(event.target.value)
        const _from    = loggedUser
        const _target  = selectedUser

        if(message!== undefined ){
            if(message.length > 0 && message.trim(' ').length > 0 && !typing){
                setTyping(true)
                const _typing = true
                MessengerSocket.emit("SET_TYPING", _from, _target, _typing)
            }
            else if((event.which === 13 && !event.shiftKey && message.trim(' ').length > 0)){ // If pressed ENTER key
                SendMessage(event)
            } else if (message.trim(' ').length === 0 && typing){
                setTyping(false)
                const _typing = false
                MessengerSocket.emit("SET_TYPING", _from, _target, _typing)
            }
        }
    }
    function SendMessage(event){
        event.preventDefault()
        const _from    = loggedUser
        const _target  = selectedUser
        
        const sender    = loggedUser
        const receiver  = selectedUser
        const date      = new Date().getTime()
        if(message !== "") {
            const payload = {
                sender:sender,
                receiver:receiver,
                message:message,
                datetime:date
            }
            setTyping(false)
            const _typing = false
            MessengerSocket.emit("SET_TYPING", _from, _target, _typing)
            MessengerSocket.emit("SEND_MESSAGE", sender,receiver,message,date)
            MessengerStore.dispatch(PUSH_TO_SELECTED_CONVERSATION(payload))
            MessengerStore.dispatch(MOVE_CONVERSATION_TO_TOP(receiver))
            setMessage("")
        }
    }
    return (
        <React.Fragment>
            <div className={styles.MmessageScrollerStage} ref={messagingStage}>
                { loading 
                  ? <div className={styles.MloadingContainer}>
                        <div className={classNames(styles.Mloading__,styles.Mnoselect)}>
                            <div className={styles.Mloading__letter}>.</div>
                            <div className={styles.Mloading__letter}>.</div>
                            <div className={styles.Mloading__letter}>.</div>
                        </div>
                    </div>
                  : <React.Fragment>
                      {selectedConversation && selectedConversation.map((element)=>{
                            if(element.sender===loggedUser)
                                return <BubbleMe message={element.message} datetime={element.datetime} seen={element.hasRead}/>
                            else
                                return <BubbleSender message={element.message} datetime={element.datetime}/>
                      })}
                    </React.Fragment> }
            </div>
            <Form autoComplete="off" onSubmit={SendMessage} className={styles.MmessageTypingStage}>
                <Form.Control as="textarea" rows={3} 
                    className={styles.MmessageTypingArea} 
                    placeholder="Mesaj yazın..." 
                    onKeyUp={(event)=>onKeyUp(event)}
                    onKeyDown={(event)=>onKeyDown(event)}
                    onChange={(event)=>setMessage(event.target.value)}
                    disabled={loading}
                    value={message}
                    />
                <Button type="submit" variant="flat" className={styles.MmessageSendButton} disabled={!isAcceptable}>
                    <FaPaperPlane color="white"/>
                </Button>
            </Form>
        </React.Fragment>
    )
}