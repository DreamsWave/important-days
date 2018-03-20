// import { signIn as fbSignIn, signOut as fbSignOut, createUser as fbCreateUser, resetPassword as fbResetPassword } from '../firebase/auth'
import { firebaseAuth } from '../firebase'


export const SIGNED_IN = 'SIGNED_IN'
export const SIGNING_IN = 'SIGNING_IN'
export const SIGN_OUT = 'SIGN_OUT'
export const ERROR = 'ERROR'

export const setSignedIn = (user) => {
  return {
    type: SIGNED_IN,
    user
  }
}

export const setSigningIn = () => {
  return {
    type: SIGNING_IN
  }
}

export const setError = (error) => {
  return {
    type: ERROR,
    error
  }
}

export const setSignOut = () => {
  return {
    type: SIGN_OUT
  }
}

export const signOut = () => dispatch => {
  firebaseAuth.signOut().then(() => dispatch(setSignOut()))
}

export const signIn = (email, password) => (dispatch) => {
  dispatch(setSigningIn())
  return new Promise((resolve, reject) => {
    firebaseAuth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch(setSignedIn(user))
        resolve()
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          dispatch(setError('Wrong password.'))
        } else {
          dispatch(setError(errorMessage))
        }
        dispatch(setError(error))
        reject(error)
      })
  })
}

export const createUser = (email, password) => (dispatch) => {
  dispatch(setSigningIn())
  return new Promise((resolve, reject) => {
    firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch(setSignedIn(user))
        resolve()
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/weak-password') {
          dispatch(setError('The password is too weak.'))
        } else {
          dispatch(setError(errorMessage))
        }
        dispatch(setError(error))
        reject(error)
      });
  })
}
