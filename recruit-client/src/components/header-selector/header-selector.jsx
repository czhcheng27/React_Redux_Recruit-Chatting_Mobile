import React, {Component} from 'react' 
import {List, Grid, ImagePicker} from 'antd-mobile'
import PropTypes from 'prop-types'

let data = []

export default class HeaderSelector extends Component { 

    static propTypes = {
        setHeader: PropTypes.func.isRequired
    }

    state = {
        headName:null,
        files: data,
        headUrl: null
    }

    constructor(props){
        super(props);
        this.headerList = []
        for(let i=1; i<=20; i++){
            this.headerList.push({
                headName: 'image' + i,
                icon: <img src={require(`../../assets/images/image${i}.png`)} style={{width:55, height:55}}/>
            })
        }
    }

    handClick = (Object) => {
        console.log('Object', Object.icon.props.src);
        this.setState({
            headName: Object.headName,
            headUrl: Object.icon.props.src
        })
        this.props.setHeader(Object.headName, Object.icon.props.src)
    }

    onChange = (files, type, index) => {
        console.log(files, type, index);
        // console.log(files[0].url);
        const headUrl = index===0 ? null : files[0].url
        this.setState({
          files,
          headUrl
        });
        this.props.setHeader('customize', headUrl)
      }

    render () { 

        const {headUrl} = this.state
        const listHeader = !headUrl ? 'Please select your head image' : (
            <div>You select: <img src={headUrl} style={{width:55, height:55}} alt='header'/></div>
        )

        const {files} = this.state
        
        return ( 
            <List renderHeader={() => listHeader}>
                <Grid 
                data={this.headerList} 
                columnNum = {5}
                onClick={this.handClick}
                />

                <ImagePicker
                files={files}
                onChange={this.onChange}
                length={5}
                selectable={ files.length < 1}
                accept="image/gif,image/jpeg,image/jpg,image/png"
                />
            </List>
        )
    }
}