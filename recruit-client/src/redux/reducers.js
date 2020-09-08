import {combineReducers} from 'redux'
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST, RECEIVE_MSG_LIST, RECEIVE_MSG} from './action-types'

import {getRedirectTo} from '../utils/index'

const initUser = {
    username:'',
    type:'',
    msg:'',
    redirectTo:''
}
function user(state=initUser, action){
    switch (action.type) {
        case AUTH_SUCCESS://data:user
        const {type, header} = action.data
            return {...action.data, redirectTo:getRedirectTo(type, header)}
        case ERROR_MSG://data:msg
            return {...state, msg:action.data}
        case RECEIVE_USER:
            return action.data
        case RESET_USER:
            return {...initUser, msg: action.data}

        default:
            return state
    }
}

const initUserList = []
function userList(state=initUserList, action){
    switch (action.type){
        case RECEIVE_USER_LIST: //data is userList
            return action.data
        default:
            return state
    }
}

const initChat = {
    users:{},
    chatMsgs:[],
    unReadCount:0
}
function chat(state=initChat, action){
    switch(action.type){
        case RECEIVE_MSG_LIST: //data: {users, chatMsgs}
        const {users, chatMsgs, userid} = action.data
            return {
                users,
                chatMsgs,
                unReadCount: chatMsgs.reduce((preTotal, msg) => (preTotal + (!msg.read&&msg.to!==userid?1:0)),0)
            }
        case RECEIVE_MSG:
            const {chatMsg} = action.data
            return {
                users: state.users,
                chatMsgs:[...state.chatMsgs, chatMsg],
                unReadCount: state.unReadCount + (!chatMsg.read&&chatMsg.to!==action.data.userid?1:0)
            }
        default:
            return state
    }
}

export default combineReducers({
    user,
    userList,
    chat
})