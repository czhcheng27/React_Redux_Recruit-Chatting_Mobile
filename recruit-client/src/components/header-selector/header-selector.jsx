import React, {Component} from 'react' 
import {List, Grid} from 'antd-mobile'

export default class HeaderSelector extends Component { 

    constructor(props){
        super(props);
        this.headerList = []
        for(let i=1; i<=20; i++){
            this.headerList.push({
                text: 'image' + i,
                icon: require(`./images/image${i}.png`)
            })
        }
    }
    render () { 
        const listHeader = 'Please select your head image'
        return ( 
            <List renderHeader={() => listHeader}>
                <Grid 
                data={this.headerList} 
                columnNum = {5}
                />
            </List>
        )
    }
}