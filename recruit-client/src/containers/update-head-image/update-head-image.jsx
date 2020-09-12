import React, { Component } from 'react'
import { NavBar, Icon, WhiteSpace, Button, Toast} from 'antd-mobile'
import { connect } from 'react-redux'

import HeadSelector from '../../components/header-selector/header-selector'
import {update} from '../../redux/actions'

class UpdateHeadImage extends Component {

    constructor(props) {
        super(props);
        const { header, company, salary, info, post, headUrl } = this.props.user
        this.state = {
            header: header,
            post: post,
            company: company,
            salary: salary,
            info: info,
            isInfoChanged: '',
            headUrl: headUrl
        };
    }

    setHeader = (text, headUrl) => {
        this.setState({
            header: text,
            headUrl,
            isInfoChanged:'headChanged'
        })
    }

    handSave = () => {
        this.props.update(this.state)
        Toast.loading('Saving...', 1, ()=>this.props.history.goBack())
    }
    render() {

        const {isInfoChanged, headUrl} = this.state

        return (
            <div>

                <NavBar
                icon={<Icon type='left' />}
                onClick={() => this.props.history.goBack()}
                style={{ height: 50 }}>Update Your Head Image</NavBar>

                <HeadSelector setHeader={this.setHeader} />

                <Button type='primary' disabled={!headUrl||!isInfoChanged} onClick={this.handSave}>Save</Button>

                <WhiteSpace size='xl' />

                <Button type='ghost' onClick={()=>this.props.history.goBack()}>Go Back</Button>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    {update}
)(UpdateHeadImage)