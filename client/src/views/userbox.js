import React, { useCallback, useEffect, useState } from 'react'
import { FaCircle, FaUserCircle} from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { CLEAR_SELECTED_CONVERSATION, SET_SELECTED_CONVERSATION, SET_LOADING, SET_SELECTED_USER, UPDATE_EXIST_CONVERSATION } from '../redux/functions'
import { propTypes } from 'react-bootstrap/esm/Image'
import { MessengerStore } from '../redux/messengerStore'
import styles from '../styles.module.css'
import classNames from 'classnames'
import Axios from 'axios'
import MessengerSocket from '../messengerSocket'
import { toast } from 'material-react-toastify'

export default function Userbox(props) {
    const isOnlineProps      = props.isOnline
    const isTyping           = props.isTyping
    const isSelected         = props.isSelected
    const username           = props.username
    const haveRead           = props.haveRead
    const loggedUser         = useSelector(state => state.loggedUser)
    
    useEffect(() => {
        MessengerSocket.on(`${username}_ONLINE_NOTIFY`,()=>{
            MessengerStore.dispatch(UPDATE_EXIST_CONVERSATION(username,null,true))
        })
        MessengerSocket.on(`${username}_OFFLINE_NOTIFY`,()=>{
            MessengerStore.dispatch(UPDATE_EXIST_CONVERSATION(username,null,false))
        })
        let targetUser = username
        MessengerSocket.emit("IS_HE_ONLINE", targetUser )  
    }, [])

    
    const SelectUser = useCallback((_username) => {
        if(!isSelected){
            MessengerStore.dispatch(SET_LOADING(true))
            MessengerStore.dispatch(SET_SELECTED_USER(_username))
            MessengerStore.dispatch(CLEAR_SELECTED_CONVERSATION())
            Axios.post("http://"+window.location.hostname+":4001/api/protected/getMessage", {
                loggedUser : loggedUser, 
                targetUser : _username
            }).then((response)=>{
                MessengerStore.dispatch(SET_SELECTED_CONVERSATION(response.data.message))
                MessengerStore.dispatch(SET_LOADING(false))
                let from = loggedUser
                let target = _username
                MessengerSocket.emit("SET_READ", from, target)
                MessengerStore.dispatch(UPDATE_EXIST_CONVERSATION(target,true,null))
            }).catch((error)=>{
                toast.error('Hata :' + error)
            })
        }
    }, [])

    return (
        <div className={isSelected ? classNames(styles.MuserSelectionBox,styles.MuserBoxSelected) :styles.MuserSelectionBox} onClick={()=>SelectUser(username)} >
            {isOnlineProps
                ? <FaUserCircle className={styles.MuserOnlineAvatar}></FaUserCircle>
                : <FaUserCircle className={styles.MuserOfflineAvatar}></FaUserCircle>
            }
            <span style={{marginLeft:'10px'}}>{username}</span>
            {!haveRead ? <FaCircle className={styles.MmessengerRedDot} /> : ""}
            {isTyping  ? <span className={styles.MtypingBox}>Yazıyor...</span> : ""}
        </div>
    )
}
Userbox.propTypes = {
    username : propTypes.string
}