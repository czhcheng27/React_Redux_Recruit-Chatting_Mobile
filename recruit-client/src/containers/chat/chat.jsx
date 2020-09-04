import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, List, InputItem, Grid } from 'antd-mobile'

import { sendMsg } from '../../redux/actions'

const Item = List.Item

let emojis = [
    '😀', '😃', '😄', '😄', '😆', '😅', '🤣', '😂', '🙂', '🙃',
    '😀', '😃', '😄', '😄', '😆', '😅', '🤣', '😂', '🙂', '🙃',
    '😀', '😃', '😄', '😄', '😆', '😅', '🤣', '😂', '🙂', '🙃',
    '😀', '😃', '😄', '😄', '😆', '😅', '🤣', '😂', '🙂', '🙃',
]

emojis = emojis.map(emoji => ({text: emoji}))

class Chat extends Component {

    state = {
        content: '',
        isShow: false
    }

    handSend = () => {
        //collect data
        const myId = this.props.user._id
        const targetId = this.props.match.params.targetid
        const content = this.state.content
        //send request, send message
        if (content) {
            this.props.sendMsg({ targetId, myId, content })
        }
        //clear content in state
        this.setState({ 
            content: '',
            isShow: false
        })
    }

    toggleShow = () => {
        const isShow = !this.state.isShow
        this.setState({isShow})
        if (isShow) {
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
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

                <div className='am-tab-bar'>
                <InputItem
                    placeholder='Type message here'
                    value={this.state.content}
                    onChange={(val) => this.setState({ content: val })}
                    onFocus={()=>this.setState({isShow:false})}
                    extra={
                        <span>
                            <span className='emoji' onClick={this.toggleShow}>😀</span>
                        <span style={{fontSize:18}} onClick={this.handSend}>Send</span>
                        </span>
                    }
                ></InputItem>

                {
                    this.state.isShow ? (
                        <Grid
                        data={emojis}
                        columnNum={8}
                        hasLine={false}
                        isCarousel={true}
                        carouselMaxRow={4}
                        onClick={(item)=>this.setState({content:this.state.content+item.text})}
                        />
                    ) : null
                }
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user, chat: state.chat }),
    { sendMsg }
)(Chat)