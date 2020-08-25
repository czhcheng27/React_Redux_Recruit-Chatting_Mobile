import React, {Component} from 'react' 
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import EmployeeInfo from '../employee-info/employee-info'
import EmployerInfo from '../employer-info/employer-info'

class Main extends Component { 
    render () { 

        const {_id} = this.props.user
        if(!_id){
            return <Redirect to='/login' />
        }
        
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
    {}
)(Main)