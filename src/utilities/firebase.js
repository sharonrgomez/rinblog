import * as firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/auth'
import config from './config'

firebase.initializeApp(config)

const database = firebase.database()
const storage = firebase.storage()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { firebase, storage, googleAuthProvider, database as default }