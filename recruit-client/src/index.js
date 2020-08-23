import React from 'react'
import ReactDom from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import Main from './containers/main/main'
import Login from './containers/login/login'
import Register from './containers/register/register'
import store from './redux/store'
import './assets/css/index.less'

ReactDom.render((
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path='/register' component={Register}></Route>
                <Route path='/login' component={Login}></Route>
                <Route component={Main}></Route>
            </Switch>
        </HashRouter>
    </Provider>
), document.getElementById('root'))