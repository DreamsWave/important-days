import React, { Component } from 'react'
import { firebaseAuth } from './firebase'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { signOut, setSignedIn, setSignOut, setSigningIn } from './actions/auth'
import { fetchEvents } from './actions/events'

import Layout from './Layout'

class App extends Component {
  componentWillMount() {
    this.props.setSigningIn()
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        this.props.setSignedIn(user)

        this.props.fetchEvents(this.props.auth.user.uid)
          .then((events) => {
            console.log('events fetched')
          })
          .catch(err => console.log(err))
      } else {
        this.props.setSignOut()
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Layout auth={this.props.auth} signOut={this.props.signOut} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signOut: () => dispatch(signOut()),
    setSignedIn: (user) => dispatch(setSignedIn(user)),
    setSignOut: () => dispatch(setSignOut()),
    setSigningIn: () => dispatch(setSigningIn()),
    fetchEvents: (userId) => dispatch(fetchEvents(userId)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
