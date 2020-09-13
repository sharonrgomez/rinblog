import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import database, { storage } from '../utilities/firebase'
import { startEditProfile } from '../actions/auth'
import ImageCropper from './ImageCropper'


const EditProfilePage = ({ user, startEditProfile, history }) => {
	const [error, setError] = useState('')
	const [username, setUsername] = useState('')
	const [inputImg, setInputImg] = useState('')
	const [isMounted, setIsMounted] = useState(true)
	const [blob, setBlob] = useState(null)
	const buttonColor = inputImg ? 'teal' : 'disabled'

	useEffect(() => {
		setIsMounted(true)
		if (isMounted && user) {
			database
				.ref('users/' + user + '/user_info')
				.once('value', (snapshot) => {
					if (snapshot.val()) {
						setUsername(snapshot.val().display_name)
					}
				})
		}
		return () => setIsMounted(false)
	}, [user])

	const getBlob = (blob) => {
		setBlob(blob)
	}

	const onUsernameChange = (e) => {
		setUsername(e.target.value)
	}

	const onAviChange = (e) => {
		// convert image file to base64 string
		const file = e.target.files[0]
		const reader = new FileReader()

		reader.addEventListener('load', function () {
			setInputImg(reader.result)
		}, false)

		if (file) {
			reader.readAsDataURL(file)
		}
	}

	const handleSubmitAvatar = (e) => {
		e.preventDefault()
		storage
			.ref(user)
			.child('display_pic')
			.put(blob, { contentType: blob.type })
			.then(() => {
				window.location.href = '/me'
			})

	}

	const handleSubmitUsername = (e) => {
		e.preventDefault()

		// check if username already exists
		if (username) {
			database
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
						startEditProfile({
							display_name: username
						})
						history.push('/')
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
					<form className='form' onSubmit={handleSubmitUsername}>
						<div className='field'>
							<label>Username</label>
							<input
								type='text'
								value={username}
								onChange={onUsernameChange}
								autoFocus
							/>
						</div>
						<button className='ui teal right floated small submit button' type='submit'>
							Update
						</button>
					</form>
					<form className='form' onSubmit={handleSubmitAvatar}>
						<div className='field'>
							<label>Avatar</label>
							<input
								type='file'
								accept='image/*'
								onChange={onAviChange}
							/>
						</div>
						{
							inputImg && (
								<ImageCropper
									getBlob={getBlob}
									inputImg={inputImg}
								/>
							)
						}
						<button className={`ui right floated small submit button ${buttonColor}`} type='submit'>
							Update
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