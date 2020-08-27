import React, {Component} from 'react' 
import { Button } from 'antd-mobile'

export default class NotFound extends Component { 
    render () { 
        return ( 
            <div>
                <p>Sorry, this page is not available</p>
                <Button type='primary' onClick={()=>this.props.history.replace('/')}>Go Back to Home Page</Button>
            </div>
        )
    }
}

