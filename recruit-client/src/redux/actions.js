/* has multiple action creator */

import { reqRegister, reqLogin, reqUpdate, reqUser } from "../api"
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER } from "./action-types"

const authSuccess = (user) => ({type:AUTH_SUCCESS, data: user})
const errorMsg = (msg) => ({type:ERROR_MSG, data:msg})
const receiveUser = (user) => ({type:RECEIVE_USER, data:user})
const resetUser = (msg) => ({type:RESET_USER, data:msg})

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
            dispatch(receiveUser(result.data))
        }else{
            dispatch(errorMsg(result.msg))
        }
    }
}