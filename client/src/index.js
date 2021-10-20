import React from 'react'
import PropTypes from 'prop-types'
import MessengerCore from './core'
import MessengerSocket from './messengerSocket'
import { MessengerStore } from './redux/messengerStore'
import { Provider } from 'react-redux'
import { SET_CONFIG, SET_LOGGED_USER } from './redux/functions'

export default function ReactMessenger (props){
  const configPayload={
    tokenName:props.tokenName
  }
  
  //MessengerStore.dispatch(SET_LOGGED_USER(props.username))
  MessengerStore.dispatch(SET_LOGGED_USER(prompt("Your username","user1"))) // You will change here. There is two users on database user1, user2 for sample
  MessengerStore.dispatch(SET_CONFIG(configPayload))  
  return (
    <Provider store={MessengerStore}>
      <MessengerCore/>
    </Provider>
  )
}

export {
  MessengerSocket,
  MessengerStore,
}
ReactMessenger.PropTypes = {
  username : PropTypes.string,
  tokenName : PropTypes.string,
}
