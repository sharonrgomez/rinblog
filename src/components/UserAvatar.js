import React from 'react'

const UserAvatar = ({ src, username, isCurrentUser }) => {
	const userProfileName = isCurrentUser ? 'Your' : `${username}'s`
	
	return (
		<div className='display-pic__container'>
			<img className='display-pic' src={src} alt={`${userProfileName} avatar`} />
		</div>
	)
}

export default UserAvatar