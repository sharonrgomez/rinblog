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
            .then((res) => {
                if (res.additionalUserInfo.isNewUser) {
                    firebase.database().ref('users/' + res.user.uid + '/user_info').set({
                        display_name: res.user.email
                    })
                }
            })
    }
}

export const logout = () => ({
    type: 'LOGOUT'
})

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut()
    }
}