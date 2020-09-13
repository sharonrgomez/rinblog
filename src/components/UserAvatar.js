import React from 'react'

const UserAvatar = ({ src, username, isCurrentUser }) => {
	const userProfileName = isCurrentUser ? 'Your' : `${username}'s`
	const avatar = !src ? 'https://i.imgur.com/tqsfDKG.png' : src

	return (
		<div className='display-pic__container'>
			<img className='display-pic' src={avatar} alt={`${userProfileName} avatar`} />
		</div>
	)
}

export default UserAvatar