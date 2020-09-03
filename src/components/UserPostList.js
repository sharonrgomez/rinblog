import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import { startSetPosts } from '../actions/posts'

const UserPostList = ({ startSetPosts, posts, user }) => {
    useEffect(() => {
        startSetPosts()
    }, [])

    return (
        <>
            <div>
                <div className='content-container'>
                    <span className='ui large header'>Your Posts</span>
                </div>
            </div>
            <div className='content-container'>
                <div>
                    {posts.length === 0
                        ? (
                            <span>You have no posts.</span>
                        )
                        : (
                            posts
                                .sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)
                                .map((post) => <Post ownsPost={post.author === user} key={post.id} {...post} />)
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
    startSetPosts: () => dispatch(startSetPosts())
})


export default connect(mapStateToProps, mapDispatchToProps)(UserPostList)