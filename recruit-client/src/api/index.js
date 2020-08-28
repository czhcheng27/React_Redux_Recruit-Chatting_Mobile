/* the module that include multiple ajax request */
import ajax from './ajax'
//register
export const reqRegister = (user) => ajax('/register', user, 'POST')
//login
export const reqLogin = ({username, password}) => ajax('/login', {username, password}, 'POST')
//update
export const reqUpdate = (user) => ajax('/update', user, 'POST')
//get user state
export const reqUser = () => ajax('/user')
//get userlist
export const reqUserList = (type) => ajax('/userlist', {type})
