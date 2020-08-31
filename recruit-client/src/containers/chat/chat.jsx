import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, List, InputItem } from 'antd-mobile'

const Item = List.Item

class Chat extends Component {
    render() {
        return (
            <div>
                <NavBar>Test</NavBar>

                <Item
                    thumb={require(`../../assets/images/image1.png`)}
                >Hello, how are you</Item>

                <Item
                className='chat-me'
                extra={<img src={require(`../../assets/images/image2.png`)} alt='header'/>}
                >I'm fine, thank you</Item>

                <InputItem
                className='am-tab-bar'
                placeholder='Type message here'
                extra={
                    <span>Send</span>
                }
                ></InputItem>
            </div>
        )
    }
}

export default connect(
    state => ({}),
    {}
)(Chat)