import React, { Component } from 'react'
import {NavBar, InputItem, Button, WhiteSpace, WingBlank, List} from 'antd-mobile'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

import Logo from '../../components/logo/logo'
import { login } from '../../redux/actions'

const Item = List.Item

class Login extends Component {

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
        // console.log(this.state);
        this.props.login(this.state)
    }

    toRegister = () => {
        this.props.history.replace('/register')
    }

    render() {

        const {msg, redirectTo} = this.props.user

        if(redirectTo){
            return <Redirect to={redirectTo} />
        }

        return (
            <div>
                <NavBar className='navBar'>Recruit App</NavBar>

                <WhiteSpace style={{height:50}} />

                <Logo />

                {msg?<p className='error-msg'>{msg}</p>:null}

                <WhiteSpace size='md'/>

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

export default connect(
    state=>({user:state.user}),
    {login}
)(Login)