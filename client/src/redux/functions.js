import { Actions } from "./actions"

export function SET_LOGGED_USER(_username){
    return dispatch => {
        dispatch({type:Actions.SET_LOGGED_USER, payload:_username})
    }
}

export function SET_SELECTED_USER(_username){
    return dispatch => {
        dispatch({type:Actions.SET_SELECTED_USER, payload:_username})
    }
}
export function SET_LOADING(_value){
    return dispatch => {
        dispatch({type:Actions.SET_LOADING, payload: _value})
    }
}
export function SET_CONVERSATION_LIST(_list){
    return dispatch => {
        dispatch({type:Actions.SET_CONVERSATION_LIST, payload: _list})
    }
}
export function SET_CONVERSATION_IS_TYPING(_user,_typing){
    const payload={
        user   : _user,
        typing : _typing
    }
    return dispatch => {
        dispatch({type:Actions.SET_CONVERSATION_IS_TYPING, payload: payload})
    }
}
export function CLEAR_SELECTED_CONVERSATION(){
    return dispatch => {
        dispatch({type:Actions.CLEAR_SELECTED_CONVERSATION, payload: null})
    }
}
export function SET_SELECTED_CONVERSATION(_conversationArray){
    return dispatch => {
        dispatch({type:Actions.SET_SELECTED_CONVERSATION, payload: _conversationArray})
    }
}

export function ADD_NEW_CONVERSATION(_user,_read,_online){
    const _payload={
        user:_user,
        read:_read,
        online:_online
    }
    return dispatch => {
        dispatch({type:Actions.ADD_NEW_CONVERSATION, payload: _payload})
    }
}

export function MOVE_CONVERSATION_TO_TOP(_user){
    const _payload={
        user:_user,
    }
    return dispatch => {
        dispatch({type:Actions.MOVE_CONVERSATION_TO_TOP, payload: _payload})
    }
}

export function UPDATE_EXIST_CONVERSATION(_user,_read,_online){
    const _payload={
        user:_user,
        read:_read,
        online:_online
    }
    return dispatch => {
        dispatch({type:Actions.UPDATE_EXIST_CONVERSATION, payload: _payload})
    }
}
export function UPDATE_SELECTED_CONVERSATION(_read){
    const _payload={
        read:_read,
    }
    return dispatch => {
        dispatch({type:Actions.UPDATE_SELECTED_CONVERSATION, payload: _payload})
    }
}
export function DELETE_SELECTED_CONVERSATION(_username){
    return dispatch => {
        const payload = {
            username:_username
        }
        dispatch({type:Actions.DELETE_SELECTED_CONVERSATION, payload: payload})
    }
}

export function PUSH_TO_SELECTED_CONVERSATION(_messagePayload){
    return dispatch => {
        dispatch({type:Actions.PUSH_TO_SELECTED_CONVERSATION, payload: _messagePayload})
    }
}
export function SET_CONVERSATION_READ(_whichUser, _isRead){
    const _payload ={
        user:_whichUser,
        read : _isRead
    }
    return dispatch => {
        dispatch({type:Actions.SET_CONVERSATION_READ, payload: _payload})
    }
}

export function SET_CONFIG(_config){
    return dispatch => {
        dispatch({type:Actions.SET_CONFIG, payload: _config})
    }
}