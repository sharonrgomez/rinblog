export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
        case 'SIGN_UP':
            return {
                uid: action.uid
            }
        case 'LOGOUT':
            return {}
        default:
            return state
    }
}