import React, {Component} from 'react' 
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'//can operate cookie Cookies.set()/remove()/get()

import EmployeeInfo from '../employee-info/employee-info'
import EmployerInfo from '../employer-info/employer-info'
import { getRedirectTo } from '../../utils'
import {getUserState} from '../../redux/actions'

class Main extends Component { 

    componentDidMount(){
        const {_id} = this.props.user
        const userid = Cookies.get('userid')
        if(userid && !_id){
            this.props.getUserState()
        }
    }
    render () { 

        //get userid from cookie
        const userid = Cookies.get('userid')
        //if there's no userid, redirect to login page
        if(!userid){
            return <Redirect to='/login' />
        }
        //if has userid, read the state from redux
        const {_id, type, header} = this.props.user

        //if there's no _id in state, return null
        if(!_id){
            return null
        }else{
            //if has _id, show the relative page
            //if require the root url '/', calculate a new url based on type and header
            let path = this.props.location.pathname
            if(path==='/'){
                path = getRedirectTo(type, header)
                return <Redirect to={path} />
            }
        }

        

        /* const {_id} = this.props.user
        if(!_id){
            return <Redirect to='/login' />
        } */
        
        return ( 
            <div>
                <Switch>
                    <Route path='/employeeinfo' component={EmployeeInfo}></Route>
                    <Route path='/employerinfo' component={EmployerInfo}></Route>
                </Switch>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {getUserState}
)(Main)