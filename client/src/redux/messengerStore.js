import { compose } from 'redux';
import { applyMiddleware } from 'redux';
import { createStore } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from './reducer';
export const initialState = {
    loggedUser           : "",
    selectedUser         : "",
    conversationList     : [],
    selectedConversation : [],
    loading              : true,
    config               : {},
}
const allEnhancers = compose( 
    applyMiddleware(thunk),
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ === "undefined"                     // FOR DISABLE STORE VIEW MAKE COMMENT LINE
    ? a => a																	   // FOR DISABLE STORE VIEW MAKE COMMENT LINE
	: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // FOR DISABLE STORE VIEW MAKE COMMENT LINE
  )
export const MessengerStore = createStore(reducer, initialState, allEnhancers)