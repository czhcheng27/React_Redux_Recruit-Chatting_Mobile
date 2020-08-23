/* has multiple action creator */

import { reqRegister, reqLogin } from "../api"
import { AUTH_SUCCESS, ERROR_MSG } from "./action-types"

const authSuccess = (user) => ({type:AUTH_SUCCESS, data: user})
const errorMsg = (msg) => ({type:ERROR_MSG, data:msg})

//register
export const register = (user) => {
    return async dispatch => {
        const response = await reqRegister(user)
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