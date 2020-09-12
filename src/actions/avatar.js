export const setImageURL = (uid, url) => ({
	type: 'SET_AVATAR',
	uid,
	url
})

export const startSetImageURL = (uid, url) => {
	return (dispatch) => {
		return dispatch(setImageURL(uid, url))
	}
}