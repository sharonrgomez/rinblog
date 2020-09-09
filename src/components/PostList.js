import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { firebase } from '../firebase/firebase'
import { compareDesc } from 'date-fns'
import Post from './Post'
import { startSetAllPosts, startSetPosts } from '../actions/posts'

const PostList = ({ startSetAllPosts, startSetPosts, getAllPosts, getUserPosts, posts, user, match }) => {
	const [displayName, setDisplayName] = useState('')
	const [avi, setAvi] = useState('')
	const [isMounted, setIsMounted] = useState(true)

	useEffect(() => {
		setIsMounted(true)
		if (isMounted) {
			// display all posts on home pg, display only user's posts on profile pg
			if (getAllPosts) {
				startSetAllPosts()
			} else if (getUserPosts) {
				const userId = match.params.id
				startSetPosts(userId).then(() => {
					firebase
						.database()
						.ref('users/' + userId + '/user_info')
						.once('value', (snapshot) => {
							setDisplayName(snapshot.val().display_name)
							setAvi(snapshot.val().display_pic)
						})
				})
			} else {
				startSetPosts(user).then(() => {
					firebase
						.database()
						.ref('users/' + user + '/user_info')
						.once('value', (snapshot) => {
							setDisplayName(snapshot.val().display_name)
							setAvi(snapshot.val().display_pic)
						})
				})
			}
		}
		return () => setIsMounted(false)
	}, [match, user, getAllPosts, getUserPosts])

	return (
		<>
			<div>
				<div className='content-container'>
					<span className='ui large header page-header'>
						{
							getAllPosts
								? 'Home'
								: getUserPosts
									? (
										<>
											{displayName}'s Blog
											<img className='display-pic' src={avi} alt={`${displayName}'s avatar`} />
										</>
									)
									: (
										<>
											<div className='links__profile'>
												{displayName}'s Blog
												<Link to='/edit/profile' className='links'>Edit Profile</Link>
											</div>
											<img className='display-pic' src={avi} alt={'Your avatar'} />
										</>
									)
						}
					</span>
				</div>
			</div>
			<div className='content-container'>
				{posts.length === 0
					? (
						<span className='ui small header no-posts'>
							{getAllPosts || getUserPosts ? 'There are no posts.' : 'You have no posts.'}
						</span>
					)
					: (
						posts
							.sort((a, b) => compareDesc(a.createdAt, b.createdAt))
							.map((post) =>
								<Post
									ownsPost={post.author === user}
									key={post.id}
									user={post.author}
									isViewingProfile={getUserPosts}
									onViewPage={false}
									{...post}
								/>)
					)
				}
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
	startSetPosts: (user) => dispatch(startSetPosts(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostList)