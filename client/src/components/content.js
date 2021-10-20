import React from 'react'
import MessagingHeader from '../views/messagingHeader'
import MessagingScreen from '../views/messagingScreen'
import styles from '../styles.module.css'
import { FaFacebookMessenger } from 'react-icons/fa'
import { useSelector } from 'react-redux'

export default function Content() {
    const selectedUser = useSelector(state => state.selectedUser)
    if(selectedUser === "") return (
        <div className={styles.MmessagingScreen}>
            <div className={styles.MmessengerLogo}>
                <FaFacebookMessenger style={{color: '#1e538c',width: '100px',height: '100px'}}/>  
            </div>
        </div>
    )
    else return (
        <div className={styles.MmessagingScreen}>
            <MessagingHeader/>
            <MessagingScreen/>
        </div>
    )
}
