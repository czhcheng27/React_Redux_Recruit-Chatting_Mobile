import React, {Component} from 'react' 
import {List, Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class HeaderSelector extends Component { 

    static propTypes = {
        setHeader: PropTypes.func.isRequired
    }

    state = {
        icon:null
    }

    constructor(props){
        super(props);
        this.headerList = []
        for(let i=1; i<=20; i++){
            this.headerList.push({
                text: 'image' + i,
                icon: require(`../../assets/images/image${i}.png`)
            })
        }
    }

    handClick = ({text, icon}) => {
        this.setState({icon})
        this.props.setHeader(text)
    }

    render () { 

        const {icon} = this.state
        const listHeader = !icon ? 'Please select your head image' : (
            <div>You select: <img src={icon} alt='header'/></div>
        )
        
        return ( 
            <List renderHeader={() => listHeader}>
                <Grid 
                data={this.headerList} 
                columnNum = {5}
                onClick={this.handClick}
                />
            </List>
        )
    }
}