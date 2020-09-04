import { firebase, googleAuthProvider } from '../firebase/firebase'

export const login = (uid) => ({
    type: 'LOGIN',
    uid
})

export const startLogin = () => {
    return () => {
        return firebase
            .auth()
            .signInWithPopup(googleAuthProvider)
    }
}

// export const signUp = (uid, pw) => ({
//     type: 'SIGN_UP',
//     uid,
//     pw
// })

// export const startSignUp = () => {
//     return () => {
//         return firebase
//             .auth()
//             .createUserWithEmailAndPassword(email, password)
//     }
// }


export const logout = () => ({
    type: 'LOGOUT'
})

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut()
    }
}