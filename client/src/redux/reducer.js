import { Actions } from './actions';

export function reducer (state,action){
    switch(action.type){
        case Actions.SET_LOGGED_USER:
            return {
                ...state,
                loggedUser:action.payload
            }
        case Actions.SET_SELECTED_USER:
            return {
                ...state,
                selectedUser:action.payload
            }
        case Actions.SET_LOADING:
            return {
                ...state,
                loading:action.payload
            }
        case Actions.SET_CONVERSATION_LIST:
            const conversationList4 = action.payload
            conversationList4.forEach((element)=>{
                element.typing=null
            })
            return {
                ...state,
                conversationList: conversationList4
            }
        case Actions.SET_CONVERSATION_IS_TYPING:
            const conversationList5 = [...state.conversationList]

            const existIndex = conversationList5.findIndex((element)=>element.user===action.payload.user)
            if(existIndex !== -1) {
                conversationList5[existIndex].typing=action.payload.typing
            }

            return {
                ...state,
                conversationList: conversationList5
            }
        case Actions.CLEAR_SELECTED_CONVERSATION:
            return {
                ...state,
                selectedConversation:[]
            }
        case Actions.SET_SELECTED_CONVERSATION:
            return {
                ...state,
                selectedConversation:action.payload
            }
        case Actions.ADD_NEW_CONVERSATION:
            const newConversationList3 = [...state.conversationList]
            newConversationList3.unshift(action.payload)
            return {
                ...state,
                conversationList:newConversationList3
            }
        case Actions.MOVE_CONVERSATION_TO_TOP:
            const newConversationList = [...state.conversationList]
            
            const firstIndex = action.payload.user
            newConversationList.sort((x,y)=> {return x.user == firstIndex ? -1 : y.user==firstIndex ? 1 : 0})

            return {
                ...state,
                conversationList:newConversationList,
            }
        case Actions.UPDATE_EXIST_CONVERSATION:
            const updatedConversationList = [...state.conversationList]
            updatedConversationList.map((element)=>{
                if(element.user===action.payload.user){
                    action.payload.read !== null ? element.read = action.payload.read : null;
                    action.payload.online !==null ? element.online = action.payload.online : null;
                }
            })
            return {
                ...state,
                conversationList:updatedConversationList
            }
        case Actions.UPDATE_SELECTED_CONVERSATION:
            const updatedSelectedConversation = [...state.selectedConversation]
            updatedSelectedConversation.map((element) => {
               element.hasRead = action.payload.read
            })
            return {
                ...state,
                selectedConversation:updatedSelectedConversation
            }
        case Actions.DELETE_SELECTED_CONVERSATION:
            return {
                ...state,
                selectedUser:"",
                conversationList:state.conversationList.filter((element) => element.user!==action.payload.username),
                selectedConversation:[]
            }
        case Actions.PUSH_TO_SELECTED_CONVERSATION: 
            const newConversation = [...state.selectedConversation]
           /* const newConversationList = [...state.conversationList]
            
            const firstIndex = action.payload.receiver
            newConversationList.sort((x,y)=> {return x.user == firstIndex ? -1 : y.user==firstIndex ? 1 : 0})*/

            newConversation.push(action.payload)
            return {
                ...state,
                selectedConversation:newConversation,
            }

        case Actions.SET_CONVERSATION_READ:
            const newConversationList2 = [...state.conversationList]
            const targetUser = action.payload.user
            const read       = action.payload.read
            newConversationList2.filter((element)=>element.user===targetUser ? element.read = read : element)
            return {
                ...state,
                conversationList: newConversationList2
            }
        case Actions.SET_CONFIG:
            return {
                ...state,
                config:action.payload
            }
        default:
            return state;
    }
}