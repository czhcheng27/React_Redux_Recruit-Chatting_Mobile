/* a UI component that used to show userList  */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'
import employer from '../../containers/employer/employer'

const Header = Card.Header
const Body = Card.Body

class UserList extends Component {

    static propTypes = {
        userList: PropTypes.array.isRequired
    }
    render() {

        const { userList } = this.props
        console.log('userList', userList);
        return (
            <WingBlank>

                <QueueAnim type='scale'>
                    

                    {
                        userList.map(user => {
                            const { type } = user
                            if (type === 'employee') {
                                return (
                                    <div key={user._id}>
                                        <WhiteSpace />
                                        <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                                            <Header
                                                thumb={<img src={user.header ? user.headUrl : null} style={{ height: 48, width: 48 }} />}
                                                extra={user.username}
                                            />
                                            <Body>
                                                {user.post ? <div>Position Applied:&nbsp; {user.post} </div> : null}
                                                {user.salary ? <div>&nbsp;&nbsp;Expect&nbsp;Salary&nbsp;&nbsp;:&nbsp; {user.salary} </div> : null}
                                            </Body>
                                        </Card>
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={user._id}>
                                        <WhiteSpace />
                                        <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                                            <Header
                                                thumb={<img src={user.header ? user.headUrl : null} style={{ height: 48, width: 48 }} />}
                                                extra={user.username}
                                            />
                                            <Body>
                                                {user.company ? <div>Company:&nbsp;{user.company} </div> : null}
                                                {user.post ? <div>&nbsp;Position&nbsp;:&nbsp;{user.post} </div> : null}
                                                {user.salary ? <div>&nbsp;&nbsp;&nbsp;Salary&nbsp;&nbsp;:&nbsp;{user.salary} </div> : null}
                                            </Body>
                                        </Card>
                                    </div>
                            )
                            }
                        })
                    }
                </QueueAnim>

            </WingBlank>
        )
    }
}

export default withRouter(UserList)