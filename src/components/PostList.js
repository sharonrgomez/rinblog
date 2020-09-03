import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compareDesc } from 'date-fns'
import Post from './Post'
import { startSetAllPosts, startSetPosts } from '../actions/posts'

const PostList = ({ startSetAllPosts, startSetPosts, getAllPosts, posts, user }) => {
	useEffect(() => {
		if (getAllPosts) {
			startSetAllPosts()
		} else {
			startSetPosts()
		}
	}, [])

	return (
		<>
			<div>
				<div className='content-container'>
					<span className='ui large header'>{getAllPosts ? 'Home' : 'Your Posts'}</span>
				</div>
			</div>
			<div className='content-container'>
				<div>
					{posts.length === 0
						? (
							<span>
								{getAllPosts ? 'There are no posts.' : 'You have no posts.'}
							</span>
						)
						: (
							posts
								.sort((a, b) => compareDesc(a.createdAt, b.createdAt))
								.map((post) =>
									<Post
										ownsPost={post.author === user}
										key={post.id}
										{...post}
									/>)
						)
					}
				</div>
			</div>
		</>
	)
}

const mapStateToProps = (state) => ({
	posts: state.posts,
	user: state.auth.uid
})

const mapDispatchToProps = (dispatch) => ({
	startSetAllPosts: () => dispatch(startSetAllPosts()),
	startSetPosts: () => dispatch(startSetPosts())
})

export default connect(mapStateToProps, mapDispatchToProps)(PostList)