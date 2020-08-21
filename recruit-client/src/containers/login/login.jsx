import React, { Component } from 'react'
import {Modal, NavBar, InputItem, Button, WhiteSpace, WingBlank, List, Radio, Icon} from 'antd-mobile'

import Logo from '../../components/logo/logo'

const Item = List.Item
const alert = Modal.alert

export default class Register extends Component {

    state = {
        username:'',
        password:''
    }

    valueChange = (name, val) => {
        this.setState({
            [name]:val
        })
    }

    login = () => {
        console.log(this.state);
    }

    toRegister = () => {
        this.props.history.replace('/register')
    }

    render() {

        return (
            <div>
                <NavBar>Recruit App</NavBar>

                <Logo />

                <WhiteSpace size='lg'/>

                <WingBlank>
                    <List>
                        <Item>
                            <span>Username:</span>
                            <InputItem 
                            maxLength={15}
                            placeholder="Please type your username here..."
                            onChange={(val)=>this.valueChange('username', val)}
                            ></InputItem>

                            <WhiteSpace />

                            <span>Password:</span>
                            <InputItem 
                            type='password'
                            maxLength={15}
                            placeholder="Please type your password here..."
                            onChange={(val)=>this.valueChange('password', val)}
                            ></InputItem>

                            <WhiteSpace />

                        </Item>
                    </List>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.login}>Sign In</Button>
                    <WhiteSpace />
                    <Button onClick={this.toRegister}>Sign Up</Button>
                </WingBlank>


            </div>
        )
    }
}