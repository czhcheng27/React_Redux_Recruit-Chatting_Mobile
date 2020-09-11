import React, {Component} from 'react' 
import {InputItem, Button, NavBar, Icon, WhiteSpace, Result, TextareaItem, Toast} from 'antd-mobile'
import {connect} from 'react-redux'

import {update} from '../../redux/actions'

class Edit extends Component { 

    constructor(props) {
        super(props);
        const {header, company, salary, info, post} = this.props.user
        this.state = {
            header:header,
            post:post,
            company:company,
            salary:salary,
            info:info,
            isInfoChanged:''
        };
      }

    handChange = (name, val) => {
        this.setState({
            [name]:val,
            isInfoChanged: 'changed'
        })
    }

    save = () => {
        this.props.update(this.state)
        Toast.loading('Saving...', 1, ()=>this.props.history.goBack())
    }

    render () { 

        const {username, header, type, company, salary, info, post} = this.props.user
        const {isInfoChanged} = this.state
        return ( 
            <div>
                <NavBar className='navBar' icon={<Icon type='left' onClick={()=>this.props.history.goBack()}/>}>Edit Personal Information</NavBar>

                <WhiteSpace style={{height:50}} />

                <Result img={<img src={header?require(`../../assets/images/${header}.png`):null} style={{height:66, width:66}} alt='header'/>} title={username}/>

                <WhiteSpace size='lg'/>

                {
                    !post ? null :
                    <InputItem
                    defaultValue={post}
                    labelNumber = '7'
                    onChange = {(val)=>this.handChange('post', val)}
                    >{type==='employee' ? 'Position Applied:' : `\xa0\xa0Position\xa0:`}</InputItem> 
                }

                {
                    !company ? null :
                    <InputItem
                    defaultValue={company}
                    labelNumber = '7'
                    onChange = {(val)=>this.handChange('company', val)}
                    >Company:</InputItem>
                }

                {
                    !salary ? null :
                    <InputItem
                    defaultValue={salary}
                    labelNumber = '7'
                    onChange = {(val)=>this.handChange('salary', val)}
                    >{type==='employee' ? '\xa0\xa0Expect\xa0Salary\xa0\xa0:' : `\xa0\xa0\xa0Salary\xa0\xa0:`}</InputItem>
                }

                {
                    !info ? null :
                    <TextareaItem
                    title={type==='employee' ? 'Self-description\xa0:' : 'Job Duty\xa0:'}
                    labelNumber = '7'
                    defaultValue={info}
                    onChange = {(val)=>this.handChange('info', val)}
                    rows={7}
                    />
                }

                <Button type='primary' disabled={!isInfoChanged} onClick={this.save}>Save</Button>

                <WhiteSpace style={{height:20}}/>

                <Button type='ghost' onClick={()=>this.props.history.goBack()}>Go Back</Button>

            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {update}
)(Edit)