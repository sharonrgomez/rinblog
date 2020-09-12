export default (state = {}, action) => {
	switch (action.type) {
		case 'SET_AVATAR':
			return {
				...state,
				[action.uid]: action.url
			}
		default:
			return state
	}
}