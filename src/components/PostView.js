import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { firebase } from '../firebase/firebase'
import Post from './Post'

const PostView = ({ post, user, getUserPosts }) => {
	const [displayName, setDisplayName] = useState('')

	// get username to be displayed under post
	useEffect(() => {
		let mounted = true
		if (mounted) {
			firebase
				.database()
				.ref(`users/${user}`)
				.on('value', (snapshot) => {
					setDisplayName(snapshot.val().user_info.display_name)
				})
		}
		return () => mounted = false
	}, [])


	return (
		<>
			<div className='content-container'>
				<Post
					ownsPost={post.author === user}
					key={post.id}
					user={post.author}
					isViewingProfile={getUserPosts}
					onViewPage={true}
					{...post}
				/>
			</div>
		</>
	)
}


const mapStateToProps = (state, props) => ({
	post: state.posts.find((post) => post.id === props.match.params.id),
	user: state.auth.uid
})

export default connect(mapStateToProps)(PostView)