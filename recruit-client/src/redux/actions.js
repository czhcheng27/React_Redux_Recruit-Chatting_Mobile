/* has multiple action creator */

import { reqRegister, reqLogin, reqUpdate, reqUser, reqUserList, reqMsgList, reqReadMsg } from "../api"
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST, RECEIVE_MSG, RECEIVE_MSG_LIST, MSG_READ} from "./action-types"
import io from 'socket.io-client'

function initIO(dispatch, userid){
    if(!io.socket){
        io.socket = io('ws://localhost:5000')
        io.socket.on('ServerToClient', function (chatMsg){
            console.log('Client: receive msg back from server', chatMsg);
            if(userid === chatMsg.from || userid === chatMsg.to){
                dispatch(receiveMsg(chatMsg, userid))
            }
        })
    }
    
}

async function getMsgList(dispatch, userid){
    initIO(dispatch, userid)
    const response = await reqMsgList()
    const result = response.data
    if(result.code===0){
        const {users, chatMsgs} = result.data
        dispatch(receiveMsgList({users, chatMsgs, userid}))
    }
}

//send msg
export const sendMsg = ({targetId, myId, content}) => {
    return dispatch => {
        console.log('Client: send msg to Server', {targetId, myId, content});
        io.socket.emit('sendMsg', {targetId, myId, content})
    }
}

const authSuccess = (user) => ({type:AUTH_SUCCESS, data: user})
const errorMsg = (msg) => ({type:ERROR_MSG, data:msg})
const receiveUser = (user) => ({type:RECEIVE_USER, data:user})
export const resetUser = (msg) => ({type:RESET_USER, data:msg})
const receiveUserList = (userList) => ({type:RECEIVE_USER_LIST, data:userList})
const receiveMsgList = ({users, chatMsgs, userid}) => ({type: RECEIVE_MSG_LIST, data:{users, chatMsgs, userid}})
const receiveMsg = (chatMsg, userid) => ({type: RECEIVE_MSG, data: {chatMsg, userid}})
const msgRead = ({count, targetId, myId}) => ({type: MSG_READ, data:{count, targetId, myId}})

//register
export const register = (user) => {
    const {username, password, password2, type} = user
    if(!username){
        return errorMsg('Username can\'t be empty')
    }else if(!password){
        return errorMsg('Password can\'t be empty')
    }else if(password!==password2){
        return errorMsg('Password not same')
    }
    return async dispatch => {
        const response = await reqRegister({username, password, type})
        const result = response.data//{code:0/1, data:{}/msg:''}
        if(result.code===0){//success
            getMsgList(dispatch, result.data._id)
            dispatch(authSuccess(result.data))
        }else{//fail
            dispatch(errorMsg(result.msg))
        }
    }
}

//login
export const login = (user) => {
    const {username, password} = user
    if(!username){
        return errorMsg('Username can\'t be empty')
    }else if(!password){
        return errorMsg('Password can\'t be empty')
    }
    return async dispatch => {
        const response = await reqLogin(user)
        const result = response.data//{code:0/1, data:{}/msg:''}
        if(result.code===0){//success
            getMsgList(dispatch, result.data._id)
            dispatch(authSuccess(result.data))
        }else{//fail
            dispatch(errorMsg(result.msg))
        }
    }
}

//update
export const update = (user) => {
    return async dispatch => {
        const response = await reqUpdate(user)
        const result = response.data
        if(result.code===0){
            dispatch(receiveUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}

//get user state
export const getUserState = () => {
    return async dispatch => {
        const response = await reqUser()
        const result = response.data
        if(result.code===0){//data:user
            getMsgList(dispatch, result.data._id)
            dispatch(receiveUser(result.data))
        }else{
            dispatch(errorMsg(result.msg))
        }
    }
}

//get userList
export const getUserList = (type) => {
    return async dispatch => {
        const response = await reqUserList(type)
        const result = response.data
        if(result.code===0){//data:userList
            dispatch(receiveUserList(result.data))
        }
    }
}

//read msg
export const readMsg = (targetId, myId) => {
    return async dispatch => {
        const response = await reqReadMsg(targetId)
        const result = response.data
        if(result.code===0){
            const count = result.data
            // console.log('count', count);
            dispatch(msgRead({count, targetId, myId}))
        }
    }
}