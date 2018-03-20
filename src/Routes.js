import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import FullscreenCalendar from './pages/FullscreenCalendar'

const Routes = (props) => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Dashboard} signed={props.signed} />
      <PrivateRoute exact path="/about" component={About} signed={props.signed} />
      <PrivateRoute exact path="/calendar" component={FullscreenCalendar} signed={props.signed} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Switch>
  )
}

export default Routes

const PrivateRoute = ({ component: Component, ...rest }) => {

  return <Route {...rest} render={(props) => (
      rest.signed === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
}