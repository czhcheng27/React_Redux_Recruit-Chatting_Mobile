import React, {Component} from 'react' 
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import Cookies from 'js-cookie'

import {resetUser} from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief
const alert = Modal.alert

class Personal extends Component { 

    logout = () =>{
        alert('Log Out', 'Are you sure want to logout?',[
            {text:'Cancel'},
            {
                text: 'Yes',
                onPress: () => {
                    Cookies.remove('userid');
                    this.props.resetUser()
                }
            }
        ])
    }
    render () { 

        const {header, company, username, type, salary, info, post} = this.props.user
        return ( 
            <div>
                <Result
                img={<img src={header?require(`../../assets/images/${header}.png`):null} style={{height:66, width:66}} alt='header'/>}
                title={username}
                message={company?company:null}
                />

                <List renderHeader='Relative Info'>
                    <Item multipleLine>
                        {type==='employee'? <Brief>Position Applied: &nbsp; {post} </Brief> :<Brief>&nbsp;Position: {post} </Brief> }
                        {type==='employee'? <Brief>&nbsp;&nbsp;Expect&nbsp;Salary&nbsp;&nbsp;: &nbsp; {salary} </Brief> :<Brief>&nbsp;&nbsp;Salary&nbsp;&nbsp;: {salary} </Brief> }
                        {/* {salary ? <Brief>&nbsp;Salary&nbsp;: {salary} </Brief> : null} */}
                        {type==='employee'? <Brief>Self-description&nbsp;: &nbsp; {info} </Brief> :<Brief>Job Duty: {info} </Brief> }
                    </Item>
                </List>

                <WhiteSpace size='xl'/>

                <Button type='warning' onClick = {this.logout}>Log Out</Button>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {resetUser}
)(Personal)