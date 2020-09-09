export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                uid: action.uid
            }
        case 'LOGOUT':
            return {}
        case 'EDIT_PROFILE':
            return state
        default:
            return state
    }
}