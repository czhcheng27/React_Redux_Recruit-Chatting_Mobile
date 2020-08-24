import React, {Component} from 'react' 
import {connect} from 'react-redux'
import {NavBar, Button, InputItem, TextareaItem, WhiteSpace} from 'antd-mobile'

import HeaderSelector from '../../components/header-selector/header-selector'

class EmployerInfo extends Component { 
    render () { 
        return ( 
            <div>
                <NavBar>Complete Employer Infomation</NavBar>

                <HeaderSelector />

                <InputItem>&nbsp;Position&nbsp;:</InputItem>
                <InputItem>Company:</InputItem>
                <InputItem type='money'>&nbsp;&nbsp;&nbsp;Salary&nbsp;&nbsp;:</InputItem>
                <TextareaItem title='Job Duty:&nbsp;'  autoHeight />

                <WhiteSpace size='xl' />

                <Button type ='primary'>Save</Button>
            </div>
        )
    }
}

export default connect(

)(EmployerInfo)