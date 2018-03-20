import { SIGNED_IN, SIGNING_IN, SIGN_OUT, ERROR } from '../actions/auth'

let defaultState = {
  signed: false,
  user: {},
  signingIn: false,
  error: null
}

const auth = (state = defaultState, action) => {
  switch(action.type) {
    case SIGNED_IN:
      return {
        ...state,
        signed: true,
        user: action.user,
        signingIn: false
      }
    case SIGNING_IN:
      return {
        ...state,
        signed: false,
        signingIn: true
      }
    case ERROR:
      return {
        ...state,
        signed: false,
        signingIn: false,
        error: action.error
      }
    case SIGN_OUT:
      return {
        ...state,
        signed: false,
        signingIn: false,
        user: {},
        error: null
      }
    default:
      return state
  }
}

export default auth