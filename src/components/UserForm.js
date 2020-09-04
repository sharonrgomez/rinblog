import React, { useState } from 'react'
import { connect } from 'react-redux'
import { firebase } from '../firebase/firebase'
import { startLogin } from '../actions/auth'


const UserForm = ({ title, startLogin }) => {
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const handleSignUp = (e) => {
		e.preventDefault()
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((res) => {
				firebase.database().ref('users/' + res.user.uid + '/user_info').set({
					display_name: username
				});
			})
			.catch((e) => {
				setError(e.message)
			})
	}

	const handleLogin = (e) => {
		e.preventDefault()
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.catch((e) => {
				setError(e.message)
			})
	}

	const onEmailChange = (e) => {
		setEmail(e.target.value)
	}

	const onUsernameChange = (e) => {
		setUsername(e.target.value)
	}

	const onPasswordChange = (e) => {
		setPassword(e.target.value)
	}

	return (
		<>
			<div className='user-form'>
				<div className='ui container clearing raised segment'>
					<div className='ui large header'>{title}</div>
					<p className='error-message'>{error}</p>
					<div className='ui form container'>
						<form className='form' onSubmit={title === 'Sign Up' ? handleSignUp : handleLogin}>

							<div className='field'>
								<input
									value={email}
									onChange={onEmailChange}
									name='email'
									type='email'
									placeholder='email'
									autoComplete="off"
								/>
							</div>

							<div className='field'>
								<input
									value={username}
									onChange={onUsernameChange}
									name='username'
									type='text'
									placeholder='username'
									autoComplete="off"
								/>
							</div>

							<div className='field'>
								<input
									value={password}
									onChange={onPasswordChange}
									name='password'
									type='password'
									placeholder='password'
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
								<i className="google icon"></i>
								Login With Google
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

const mapDispatchToProps = (dispatch) => ({
	startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(UserForm)