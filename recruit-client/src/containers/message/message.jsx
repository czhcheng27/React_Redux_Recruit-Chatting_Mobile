import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Badge, WhiteSpace } from "antd-mobile";

const Item = List.Item;
const Brief = Item.Brief;

/* 
use chat_id to group chatMsgs, get an arry that consist of every group'd lastMsg
1. find out each chat's lastMsg, save in {chat_id, lastMsg}
2. get array for all lastMsg
3. Sort in descending order (based on creat_time)
*/
const getLastMsgs = (chatMsgs, user) => {
  //1. find out each chat's lastMsg, save in obj container {chat_id: lastMsg}
  const lastMsgObjs = {};
  //iterate over the chatMsgs
  chatMsgs.forEach((msg) => {
    //individual statistics for msg
    if (msg.to !== user._id && !msg.read) {
      msg.unReadCount = 1;
    } else {
      msg.unReadCount = 0;
    }

    //get chatId
    const chatId = msg.chat_id;
    //get the lastMsg for the current chat group
    let lastMsg = lastMsgObjs[chatId];
    if (!lastMsg) {
      //no, then this msg is the last msg for this current chat group
      lastMsgObjs[chatId] = msg;
    } else {
      //yes
      const unReadCount = lastMsg.unReadCount + msg.unReadCount;
      //if msg is later than lastMsg, then save msg as lastMsg
      if (msg.create_time > lastMsg.create_time) {
        lastMsgObjs[chatId] = msg;
      }
      lastMsgObjs[chatId].unReadCount = unReadCount;
    }
  });

  //2. get array for all lastMsg
  const lastMsgs = Object.values(lastMsgObjs);

  //3. Sort in descending order (based on creat_time)
  lastMsgs.sort(function (m1, m2) {
    //if <0, put m1 front; =0, no change; >0, put m2 front
    return m2.create_time - m1.create_time;
  });

  return lastMsgs;
};

class Message extends Component {
  render() {
    const { user } = this.props;
    const { users, chatMsgs } = this.props.chat;

    //use chat_id to group chatMsgs
    const lastMsgs = getLastMsgs(chatMsgs, user);
    console.log("lastMsgs", lastMsgs);

    return (
      <div>
        <WhiteSpace style={{ height: 45 }} />

        <List style={{ marginBottom: 50 }}>
          {lastMsgs.map((msg) => {
            const targetUserId = msg.from === user._id ? msg.to : msg.from;
            const targetUser = users[targetUserId];
            return (
              <Item
                key={msg._id}
                extra={<Badge text={msg.unReadCount} />}
                thumb={
                  targetUser.headUrl ? (
                    <img
                      src={targetUser?.headUrl}
                      alt="header"
                      style={{ height: 33, width: 33 }}
                    />
                  ) : null
                }
                arrow="horizontal"
                onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
              >
                {targetUser.username}
                <Brief>{msg.content}</Brief>
              </Item>
            );
          })}
        </List>
      </div>
    );
  }
}

export default connect(
  (state) => ({ user: state.user, chat: state.chat }),
  {}
)(Message);
