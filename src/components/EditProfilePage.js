import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { firebase } from '../firebase/firebase'
import { startEditProfile } from '../actions/auth'
import { history } from '../routers/AppRouter'


const EditProfilePage = ({ user, startEditProfile }) => {
	const [error, setError] = useState('')
	const [username, setUsername] = useState('')
	const [avi, setAvi] = useState('')
	const [isMounted, setIsMounted] = useState(true)

	useEffect(() => {
		setIsMounted(true)
		if (isMounted && user) {
			firebase
				.database()
				.ref('users/' + user + '/user_info')
				.once('value', (snapshot) => {
					if (snapshot.val()) {
						setAvi(snapshot.val().display_pic)
						setUsername(snapshot.val().display_name)
					}
				})


		}
		return () => setIsMounted(false)
	}, [user])

	const onUsernameChange = (e) => {
		setUsername(e.target.value)
	}

	const onAviChange = (e) => {
		const file = e.target.files[0]
		const reader = new FileReader()

		reader.addEventListener("load", function () {
			// convert image file to base64 string
			setAvi(reader.result)
		}, false);

		if (file) {
			reader.readAsDataURL(file);
		}
	}

	const onSubmit = (updates) => {
		startEditProfile(updates)
			.then(() => {
				history.push('/me')
			})
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		// check if username already exists
		if (username) {
			firebase
				.database()
				.ref('users/')
				.once('value', (snapshot) => {
					let hasMatch = false
					let currentUser = snapshot.val()[user].user_info.display_name
					for (const [key, value] of Object.entries(snapshot.val())) {
						let existingName = value.user_info.display_name
						if (existingName === username && existingName !== currentUser) {
							hasMatch = true
							break
						}
					}
					if (!hasMatch) {
						onSubmit({
							display_name: username,
							display_pic: avi
						})
					} else {
						setError('That username already exists.')
					}
				})
		} else {
			setError('Username must be greater than 3 characters.')
		}
	}

	return (
		<div className='content-container post-form'>
			<div className='ui container clearing raised segment'>
				<div className='ui large header'>Edit Profile</div>
				{error && <p className='ui error message'>{error}</p>}
				<div className='ui form container'>
					<form className='form' onSubmit={handleSubmit}>
						<div className="field">
							<label>Username</label>
							<input
								type="text"
								value={username}
								onChange={onUsernameChange}
								autoFocus
							/>
						</div>
						{/* <div className="field">
							<label>Password</label>
							<input type="password" />
						</div> */}
						<div className="field">
							<label>Avatar</label>
							<input
								type="file"
								onChange={onAviChange}
							/>
						</div>
						<button className='ui teal right floated small submit button' type='submit'>
							Update Profile
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => ({
	user: state.auth.uid
})

const mapDispatchToProps = (dispatch) => ({
	startEditProfile: (updates) => dispatch(startEditProfile(updates))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage)