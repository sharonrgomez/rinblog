import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import database, { storage } from '../firebase/firebase'
import { compareDesc } from 'date-fns'
import Post from './Post'
import UserAvatar from './UserAvatar'
import PlaceholderPost from './PlaceholderPost'
import { startSetAllPosts, startSetPosts } from '../actions/posts'

const PostList = ({ startSetAllPosts, startSetPosts, getAllPosts, getUserPosts, posts, user, match }) => {
	const [displayName, setDisplayName] = useState('')
	const [avi, setAvi] = useState('')
	const [isMounted, setIsMounted] = useState(true)
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		setIsMounted(true)
		if (isMounted) {
			// display all posts on home pg, display only user's posts on profile pg
			if (getAllPosts) {
				startSetAllPosts()
					.then(() => {
						setIsLoaded(true)
					})
			} else if (getUserPosts) {
				const userId = match.params.id
				getUserInfo(userId)
			} else {
				getUserInfo(user)
			}
		}
		return () => setIsMounted(false)
	}, [match, user, getAllPosts, getUserPosts])

	const getUserInfo = (user) => {
		startSetPosts(user)
			.then(() => {
				const getUsernamePromise = (
					database
						.ref('users/' + user + '/user_info')
						.once('value', (snapshot) => {
							setDisplayName(snapshot.val().display_name)
						})
				)

				const getAvatarPromise = (
					storage
						.ref(user)
						.listAll()
						.then((res) => {
							if (res.items.length > 0) {
								storage
									.ref(user)
									.child('display_pic')
									.getDownloadURL()
									.then((url) => {
										setAvi(url)
									})
									.catch((error) => {
										setAvi('https://i.imgur.com/DLiQvK4.jpg')
									})
							} else {
								setAvi('https://i.imgur.com/DLiQvK4.jpg')
							}
						})
				)

				Promise.all([getUsernamePromise, getAvatarPromise])
					.then(() => {
						setIsLoaded(true)
					})
			})
	}

	return (
		<>
			<div id='page-header'>
				<div className='content-container'>
					{!isLoaded && !getAllPosts
						? (
							<div id='placeholder__page-header' className='placeholder__container'>
								<div className='placeholder__line'>
									<div className='ui placeholder'>
										<div className='long line'></div>
										<div className='medium line'></div>
									</div>
								</div>
								<div className='placeholder__square'>
									<div className='ui placeholder'>
										<div className='square image'></div>
									</div>
								</div>

							</div>
						)
						: (
							<span className='ui large header page-header__content'>
								{
									// make this a component
									getAllPosts
										? 'Home'
										: getUserPosts
											? (
												<>
													{displayName}
													<UserAvatar src={avi} username={displayName} isCurrentUser={false} />
												</>
											)
											: (
												<>
													<div className='post-list__header'>
														{displayName}
														<Link to='/edit/profile' className='links'>Edit Profile</Link>
													</div>
													<UserAvatar src={avi} username={displayName} isCurrentUser={true} />
												</>
											)
								}
							</span>
						)
					}
				</div>
			</div>

			<div className='content-container'>
				{!isLoaded
					? (
						[...Array(3)].map((v, i) => (
							<PlaceholderPost key={i} />
						))
					)
					: (
						<>
							{
								isLoaded && posts.length === 0
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
						</>
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