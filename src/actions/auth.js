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
                if(res.additionalUserInfo.isNewUser){
                    const email = res.user.email
                    firebase.database().ref('users/' + res.user.uid + '/user_info').set({
                        display_name: email.substring(0, email.lastIndexOf('@'))
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