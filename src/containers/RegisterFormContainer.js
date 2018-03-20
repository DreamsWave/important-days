import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { createUser } from '../actions/auth'

import RegisterForm from '../components/RegisterForm'

export class RegisterFormContainer extends Component {
  render() {
    if (this.props.auth.signed) {
      return <Redirect to="/" />
    } else {
      return ( 
        <RegisterForm createUser={this.props.createUser} auth={this.props.auth} />
      )
    }
  }
}

function mapStateToProps({auth}) {
  return {
    auth
  }
}
function mapDispatchToProps(dispatch) {
  return {
    createUser: (email, password) => dispatch(createUser(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterFormContainer)
