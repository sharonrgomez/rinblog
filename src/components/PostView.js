import React from 'react'
import { connect } from 'react-redux'
import Post from './Post'

const PostView = ({ post, user, getUserPosts }) => (
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
)

const mapStateToProps = (state, props) => ({
	post: state.posts.find((post) => post.id === props.match.params.id),
	user: state.auth.uid
})

export default connect(mapStateToProps)(PostView)