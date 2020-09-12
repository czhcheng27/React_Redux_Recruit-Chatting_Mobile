import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, Button, InputItem, TextareaItem, WhiteSpace } from 'antd-mobile'

import HeaderSelector from '../../components/header-selector/header-selector'
import {update} from '../../redux/actions'
import { Redirect } from 'react-router-dom'

class EmployeeInfo extends Component {

    state = {
        header: '',
        post: '',
        info: '',
        salary: '',
        headUrl: ''
    }

    setHeader = (text, headUrl) => {
        this.setState({
            header: text,
            headUrl
        })
    }

    handle = (name, val) => {
        this.setState({
            [name]: val
        })
    }

    clickSave = () => {
        // console.log(this.state);
        this.props.update(this.state)
    }
    
    render() {

        const {header, type} = this.props.user
        if(header){
            const path = type==='employee' ? '/employee' : '/employer'
            return <Redirect to={path} />
        }
        
        return (
            <div>
                <NavBar className='navBar'>Complete Employee Infomation</NavBar>

                <WhiteSpace style={{height:50}} />

                <HeaderSelector setHeader = {this.setHeader} />

                <InputItem labelNumber={7} onChange={(val) => this.handle('post', val)}>Position Applied:</InputItem>

                <InputItem 
                labelNumber={7} 
                onChange={(val) => this.handle('salary', val)} 
                moneyKeyboardAlign="left" 
                autoAdjustHeight 
                clear
                extra="$"
                type='money'>&nbsp;&nbsp;Expect&nbsp;Salary&nbsp;&nbsp;: $ </InputItem>

                <TextareaItem labelNumber={7} title='Self-description&nbsp;:' onChange={(val) => this.handle('info', val)} autoHeight />

                <WhiteSpace size='xl' />

                <Button type='primary' onClick={this.clickSave}>Save</Button>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {update}
)(EmployeeInfo)