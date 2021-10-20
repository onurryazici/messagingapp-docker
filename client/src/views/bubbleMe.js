import React, { useEffect } from 'react'
import styles from '../styles.module.css'
import DateFormatter from 'date-and-time'
import { FaCheck, FaCheckDouble } from 'react-icons/fa'

export default function BubbleMe(props) {
    const seen     = props.seen
    const datetime = props.datetime
    const message  = props.message
    const time     = (isToday(new Date(datetime))) 
                     ? DateFormatter.format(new Date(datetime), 'HH:mm')
                     : DateFormatter.format(new Date(datetime), 'DD.MM.YYYY HH:mm')
    
    function isToday(date){
        const today = new Date()
        return date.getDate()  === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    };

    return (
        <div className={styles.MbubbleMe}>
            <div style={{textAlign:'left'}}>{message}</div><br/>
            <span className={styles.MbubbleTimeMe}>{time}
                {seen === "true" || seen===true
                ? <FaCheckDouble style={{marginLeft:'5px', color:'#3f7fb3'}} /> 
                : <FaCheck style={{marginLeft:'5px', color:'#444444'}}/>}
            </span>
        </div>
    )
}