import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signIn } from '../actions/auth'

import LoginForm from '../components/LoginForm'

class LoginFormContainer extends React.Component {

  render() {
    if(this.props.auth.signed) {
      return <Redirect to="/" />
    } else {
      return <LoginForm signIn={this.props.signIn} auth={this.props.auth} />
    }
  }
}

function mapStateToProps({ auth }) {
  return {
    auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signIn: (email, password) => dispatch(signIn(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormContainer)