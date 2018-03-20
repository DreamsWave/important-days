import * as firebase from 'firebase'
import config from './config'

const firebaseApp = firebase.initializeApp(config)
const firebaseDB = firebaseApp.database()
const firebaseMessaging = firebaseApp.messaging()
const firebaseAuth = firebaseApp.auth()

export {
  firebaseApp,
  firebaseDB,
  firebaseMessaging,
  firebaseAuth,
}