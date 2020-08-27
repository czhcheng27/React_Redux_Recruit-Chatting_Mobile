import React, {Component} from 'react' 
import {connect} from 'react-redux'

class Employer extends Component { 
    render () { 
        return ( 
            <div>Employer</div>
        )
    }
}

export default connect(
    state => ({}),
    {}
)(Employer)