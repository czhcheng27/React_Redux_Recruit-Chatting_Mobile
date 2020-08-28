/* a UI component that used to show userList  */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'

const Header = Card.Header
const Body = Card.Body

export default class UserList extends Component {

    static propTypes = {
        userList: PropTypes.array.isRequired
    }
    render() {

        const { userList } = this.props
        return (
            <WingBlank>
                {
                    userList.map(user => (
                        <div key={user._id}>
                            <WhiteSpace />
                            <Card>
                                <Header
                                    thumb={user.header? require(`../../assets/images/${user.header}.png`):null}
                                    extra={user.username}
                                />
                                <Body>
                                    {/* <div>Position: {user.post} </div> */}
                                    {user.company ? <div>Company: {user.company} </div> : null}
                                    {user.salary ? <div>Salary: {user.salary} </div> : null}
                                    {/* <div>Description: {user.info} </div> */}
                                </Body>
                            </Card>
                        </div>
                    ))
                }
            </WingBlank>
        )
    }
}