import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'material-react-toastify'
import Content from './components/content'
import Sidebar from './components/sidebar'
import MessengerSocket from './messengerSocket'
import styles from './styles.module.css'
import 'material-react-toastify/dist/ReactToastify.css'

export default function MessengerCore() {
    const loggedUser   = useSelector(state => state.loggedUser)
    useEffect(() => {
        MessengerSocket.auth = { loggedUser }
        MessengerSocket.connect()
        MessengerSocket.emit("USER_CONNECTED", loggedUser)
    }, []);

    return (
        <div className={styles.Mcontainer}>
            <Sidebar />
            <Content />
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
        </div>
    )
}
