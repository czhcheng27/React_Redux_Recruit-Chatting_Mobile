import React, {Component} from 'react' 
import {connect} from 'react-redux'
import {NavBar, Button, InputItem, TextareaItem, WhiteSpace} from 'antd-mobile'

import HeaderSelector from '../../components/header-selector/header-selector'

class EmployeeInfo extends Component { 
    render () { 
        return ( 
            <div>
                <NavBar>Complete Employee Infomation</NavBar>

                <HeaderSelector />

                <InputItem labelNumber={7} >Position Applied:</InputItem>
                <InputItem labelNumber={7} type='money'>&nbsp;&nbsp;Expect&nbsp;Salary&nbsp;&nbsp;:</InputItem>
                <TextareaItem labelNumber={7} title='Self-description&nbsp;:'  autoHeight />

                <WhiteSpace size='xl' />

                <Button type ='primary'>Save</Button>
            </div>
        )
    }
}

export default connect(

)(EmployeeInfo)