import React, {Component} from 'react' 
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'//can operate cookie Cookies.set()/remove()/get()
import { NavBar } from 'antd-mobile'

import EmployeeInfo from '../employee-info/employee-info'
import EmployerInfo from '../employer-info/employer-info'
import { getRedirectTo } from '../../utils'
import {getUserState} from '../../redux/actions'
import Employee from '../employee/employee'
import Employer from '../employer/employer'
import Message from '../message/message'
import Personal from '../personal/personal'
import Chat from '../chat/chat'
import Edit from '../edit/edit'
import UpdateHeadImage from '../update-head-image/update-head-image'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'

class Main extends Component { 

    componentDidMount(){
        const {_id} = this.props.user
        const userid = Cookies.get('userid')
        if(userid && !_id){
            this.props.getUserState()
        }
    }

    navList = [
        {
            path: '/employee',
            component: Employee,
            title: 'Employer',
            icon:'employer',
            text:'Employer'
        },
        {
            path: '/employer',
            component: Employer,
            title: 'Applicants',
            icon:'applicants',
            text:'Applicants'
        },
        {
            path: '/message',
            component: Message,
            title: 'Message',
            icon:'message',
            text:'Message'
        },
        {
            path: '/personal',
            component: Personal,
            title: 'Personal',
            icon:'personal',
            text:'Personal'
        }
    ]
    render () { 

        //get userid from cookie
        const userid = Cookies.get('userid')
        //if there's no userid, redirect to login page
        if(!userid){
            return <Redirect to='/login' />
        }
        //if has userid, read the state from redux
        const {_id, type, header} = this.props.user

        const {unReadCount} = this.props

        //if there's no _id in state, return null
        if(!_id){
            return null
        }else{
            //if has _id, show the relative page
            //if require the root url '/', calculate a new url based on type and header
            let path = this.props.location.pathname
            if(path==='/'){
                path = getRedirectTo(type, header)
                return <Redirect to={path} />
            }
        }

        const {navList} = this

        const path = this.props.location.pathname

        const currentNav = navList.find(nav => nav.path===path)

        if(currentNav){
            if(type==='employee'){
                navList[1].hide = true
            }else{
                navList[0].hide = true
            }
        }
        
        return ( 
            <div>

                {currentNav?<NavBar>{currentNav.title}</NavBar>:null}
                <Switch>
                    {
                        navList.map((nav, index) => (
                            <Route key={index} path={nav.path} component={nav.component}></Route>
                        ))
                    }
                    <Route path='/employeeinfo' component={EmployeeInfo}></Route>
                    <Route path='/employerinfo' component={EmployerInfo}></Route>
                    <Route path='/edit' component={Edit}></Route>
                    <Route path='/update-head-image' component={UpdateHeadImage}></Route>
                    <Route path='/chat/:targetid' component={Chat}></Route>
                    <Route component={NotFound}></Route>
                </Switch>
                {currentNav?<NavFooter navList={navList} unReadCount={unReadCount} />:null}
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user, unReadCount:state.chat.unReadCount}),
    {getUserState}
)(Main)