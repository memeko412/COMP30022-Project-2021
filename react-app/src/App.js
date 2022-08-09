import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Login from './pages/login/Login'
import Register from './pages/register/Register'
import ForgetPwd from './pages/forget-pwd/Forget-pwd'
import PageNotFound from './pages/PageNotFound'
import Home from './pages/home/Home'
import Contact from './pages/contact/Contact'
import calender from './pages/calender/Calender'
import notification from './pages/notification/Notification'
import EditUserInfo from './pages/EditUserInfo/EditUserInfo'


import ProtectedRoute from './components/ProtectedRoute/ProtectedRouter'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path={'/register'} render={props => <Register {...props} />} />
          <Route exact path={'/forgetPwd'} component={ForgetPwd} />
          <ProtectedRoute exact path='/home' component={Home}/>
          <ProtectedRoute exact path='/contact' component={Contact}/>
          <ProtectedRoute exact path='/calender' component={calender}/>
          <ProtectedRoute exact path='/notification' component={notification}/>
          
          {/* <Route exact path='/home' component={Home}></Route>
          <Route exact path='/contact' component={Contact}></Route>
          <Route exact path='/calender' component={calender}></Route>
          <Route exact path='/notification' component={notification}></Route> */}
          <Route exact path='/editUserInfo' component={EditUserInfo}></Route>
          {/*默认重定向登录/login */}
          <Redirect from='/' to='/login' />
          {/* 404页面 */}
          <Route path='/*' exact component={PageNotFound} />
        </Switch>
      </Router>
    )
  }
}

export default App
