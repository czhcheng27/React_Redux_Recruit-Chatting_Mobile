import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, List, InputItem, Grid, Icon } from 'antd-mobile'

import { sendMsg, readMsg } from '../../redux/actions'

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

    componentDidMount(){
        //initial display list
        window.scrollTo(0, document.body.scrollHeight)
    }

    componentDidUpdate(){
        //update display list
        window.scrollTo(0, document.body.scrollHeight)
    }

    goBack = () => {
        this.props.history.goBack()
        const targetId = this.props.match.params.targetid
        const myId = this.props.user._id
        this.props.readMsg(targetId, myId)
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

        const targetHeader = users[targetId].headUrl
        const targetIcon = targetHeader ? users[targetId].headUrl : null

        const myHeader = user.header
        const myIcon = myHeader ? <img src={user.headUrl} alt='header' /> : null

        return (
            <div>
                <NavBar
                className='navBar'
                icon={<Icon type='left' onClick={this.goBack}/>}
                >{users[targetId].username}</NavBar>

                <List style={{marginBottom: 44, marginTop: 44}}>
                {
                    msgs.map(msg => {
                        if (msg.to === targetId) {//their msg
                            return <Item
                                key={msg._id}
                                thumb={<img src={targetIcon} alt='header'/>}
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
                </List>

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
    { sendMsg, readMsg }
)(Chat)