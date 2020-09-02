import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, List, InputItem } from 'antd-mobile'

import { sendMsg } from '../../redux/actions'

const Item = List.Item

class Chat extends Component {

    state = {
        content: ''
    }

    handSend = () => {
        //collect data
        const myId = this.props.user._id
        const targetId = this.props.match.params.targetid
        const content = this.state.content
        //send request, send message
        if (content) {
            this.props.sendMsg({ myId, targetId, content })
        }
        //clear content in state
        this.setState({ content: '' })
    }
    render() {

        const { user } = this.props
        const { users, chatMsgs } = this.props.chat

        const myId = user._id
        if(!users[myId]){
            return null
        }
        const targetId = this.props.match.params.targetid
        const chatId = [targetId, myId].sort().join('_')
        console.log('chatId', chatId);

        const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)

        // console.log('users', users);
        // console.log('targetId', targetId);

        const targetHeader = users[targetId].header
        const targetIcon = targetHeader ? require(`../../assets/images/${targetHeader}.png`) : null

        const myHeader = user.header
        const myIcon = myHeader ? <img src={require(`../../assets/images/${myHeader}.png`)} alt='header' /> : null

        return (
            <div>
                <NavBar>{users[targetId].username}</NavBar>

                {
                    msgs.map(msg => {
                        if (msg.to === targetId) {//their msg
                            return <Item
                                key={msg._id}
                                thumb={targetIcon}
                            >{msg.content}</Item>
                        } else {//my message
                            return <Item
                            key={msg._id}
                                className='chat-me'
                                extra={myIcon}
                            >{msg.content}</Item>
                        }
                    })
                }
{/* 
                <Item
                    thumb={require(`../../assets/images/image1.png`)}
                >Hello, how are you</Item>

                <Item
                    className='chat-me'
                    extra={<img src={require(`../../assets/images/image2.png`)} alt='header' />}
                >I'm fine, thank you</Item> */}

                <InputItem
                    className='am-tab-bar'
                    placeholder='Type message here'
                    value={this.state.content}
                    onChange={(val) => this.setState({ content: val })}
                    extra={
                        <span onClick={this.handSend}>Send</span>
                    }
                ></InputItem>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user, chat: state.chat }),
    { sendMsg }
)(Chat)