import React, {Component} from 'react' 
import {Switch, Route} from 'react-router-dom'

import EmployeeInfo from '../employee-info/employee-info'
import EmployerInfo from '../employer-info/employer-info'

export default class Main extends Component { 
    render () { 
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