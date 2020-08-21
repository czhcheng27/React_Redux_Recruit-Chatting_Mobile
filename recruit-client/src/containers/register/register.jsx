import React, { Component } from 'react'
import {Modal, NavBar, InputItem, Button, WhiteSpace, WingBlank, List, Radio, Icon} from 'antd-mobile'

import Logo from '../../components/logo/logo'

const Item = List.Item
const alert = Modal.alert

export default class Register extends Component {

    state = {
        username:'',
        password:'',
        password2:'',
        type:'employee'
    }

    valueChange = (name, val) => {
        this.setState({
            [name]:val
        })
    }

    popUsername = () => {
        alert('Please Notice', 'Username can\'t be longer than 15 digits', [
            { text: 'Ok'}
        ])
    }

    popPassword = () => {
        alert('Please Notice', 'Password can\'t be longer than 15 digits', [
            { text: 'Ok'}
        ])
    }

    save = () => {
        console.log(this.state);
    }

    toLogin = () => {
        this.props.history.replace('/login')
    }

    render() {

        const {type} = this.state
        return (
            <div>
                <NavBar>Recruit App</NavBar>

                <Logo />

                <WingBlank>
                    <List>
                        <Item>
                            <span>Username:&nbsp;
                                <Icon
                                onClick={this.popUsername}
                                type="question-circle" 
                                size='xs'
                                color='grey'/>
                            </span>
                            <InputItem 
                            maxLength={15}
                            placeholder="Please type your username here..."
                            onChange={(val)=>this.valueChange('username', val)}
                            ></InputItem>

                            <WhiteSpace />

                            <span>Password:&nbsp;
                                <Icon
                                onClick={this.popPassword}
                                type="question-circle" 
                                size='xs'
                                color='grey'/>
                            </span>
                            <InputItem 
                            type='password'
                            maxLength={15}
                            placeholder="Please type your password here..."
                            onChange={(val)=>this.valueChange('password', val)}
                            ></InputItem>

                            <WhiteSpace />

                            <span>Confirm Password:</span>
                            <InputItem 
                            type='password'
                            maxLength={15}
                            placeholder="Please confirm your username here..."
                            onChange={(val)=>this.valueChange('password2', val)}
                            ></InputItem>

                            <WhiteSpace />

                            <span>Type:&nbsp;&nbsp;&nbsp;</span>
                            <Radio checked={type==='employee'} onChange={() => this.valueChange('type','employee')}>Employee</Radio>&nbsp;&nbsp;&nbsp;
                            <Radio checked={type==='employer'} onChange={() => this.valueChange('type','employer')}>Employer</Radio>
                        </Item>
                    </List>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.save}>Register</Button>
                    <WhiteSpace />
                    <Button onClick={this.toLogin}>Already has an account</Button>
                </WingBlank>


            </div>
        )
    }
}