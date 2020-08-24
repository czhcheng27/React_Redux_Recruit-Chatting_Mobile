import React, {Component} from 'react' 
import {connect} from 'react-redux'
import {NavBar, Button, InputItem, TextareaItem, WhiteSpace} from 'antd-mobile'

import HeaderSelector from '../../components/header-selector/header-selector'

class EmployerInfo extends Component { 

    state = {
        header: '',
        post: '',
        info: '',
        company:'',
        salary: '',
    }

    setHeader = (text) => {
        this.setState({
            header: text
        })
    }

    handle = (name, val) => {
        this.setState({
            [name]: val
        })
    }

    clickSave = () => {
        console.log(this.state);
    }

    render () { 
        return ( 
            <div>
                <NavBar>Complete Employer Infomation</NavBar>

                <HeaderSelector setHeader = {this.setHeader} />

                <InputItem onChange={(val) => this.handle('post', val)}>&nbsp;Position&nbsp;:</InputItem>
                <InputItem onChange={(val) => this.handle('company', val)}>Company:</InputItem>
                <InputItem 
                labelNumber={7} 
                onChange={(val) => this.handle('salary', val)} 
                moneyKeyboardAlign="left" 
                autoAdjustHeight 
                clear
                extra="$"
                type='money'
                >&nbsp;&nbsp;&nbsp;Salary&nbsp;&nbsp;:</InputItem>
                <TextareaItem title='Job Duty:&nbsp;' onChange={(val) => this.handle('info', val)} autoHeight />

                <WhiteSpace size='xl' />

                <Button type ='primary' onClick={this.clickSave}>Save</Button>
            </div>
        )
    }
}

export default connect(

)(EmployerInfo)