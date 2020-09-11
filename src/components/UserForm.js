import React, { useState } from 'react'
import { connect } from 'react-redux'
import database, { firebase } from '../firebase/firebase'
import { startLogin } from '../actions/auth'
import { history } from '../routers/AppRouter'

const UserForm = ({ title, startLogin }) => {
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const createUserWithEmail = (email, password) => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((res) => {
				database
					.ref('users/' + res.user.uid + '/user_info')
					.set({
						display_name: username
					})
			})
			.then(() => {
				history.push('/')
			})
			.catch((e) => {
				setError(e.message)
			})
	}

	const handleSignUp = (e) => {
		e.preventDefault()
		if (username.length > 2 || username.length < 16) {
			// first get users from db
			database
				.ref('users/')
				.once('value', (snapshot) => {
					// if there's users in db, loop through them
					if (snapshot.val()) {
						let hasMatch = false
						// loop through each user id
						for (const [key, value] of Object.entries(snapshot.val())) {
							let existingName = value.user_info.display_name
							if (existingName === username) {
								hasMatch = true
								break
							}
						}
						if (!hasMatch) {
							createUserWithEmail(email, password)
						} else {
							setError('That username already exists.')
						}
					} else {
						createUserWithEmail(email, password)
					}
				})
		} else {
			setError('Username length must be between 3 and 15 characters.')
		}
	}

	const handleLogin = (e) => {
		e.preventDefault()
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				history.push('/')
			})
			.catch((e) => {
				setError(e.message)
			})
	}

	return (
		<div className='user-form'>
			<div className='ui container clearing raised segment'>
				<div className='ui large header'>{title}</div>
				{error && <p className='ui error message'>{error}</p>}
				<div className='ui form container'>
					<form
						autoComplete='off'
						className='form'
						onSubmit={title === 'Sign Up' ? handleSignUp : handleLogin}
					>
						{title === 'Sign Up' &&
							<div className='field'>
								<label>Username</label>
								<input
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									name='username'
									type='text'
								/>
							</div>
						}

						<div className='field'>
							<label>E-mail</label>
							<input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								name='email'
								type='email'
							/>
						</div>

						<div className='field'>
							<label>Password</label>
							<input
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								name='password'
								type='password'
							/>
						</div>

						<button
							className='fluid ui teal small submit button'
							type='submit'
						>
							{title}
						</button>

						<div className='ui divider'></div>

						<button
							className='fluid ui small google plus button'
							type='button'
							onClick={startLogin}
						>
							<i className='google icon'></i>
								Login with Google
							</button>
					</form>
				</div>
			</div>
		</div>
	)
}

const mapDispatchToProps = (dispatch) => ({
	startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(UserForm)