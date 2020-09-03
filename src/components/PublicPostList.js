import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import { startSetAllPosts } from '../actions/posts'

const PublicPostList = ({ startSetAllPosts, posts, user }) => {
    useEffect(() => {
        startSetAllPosts()
    }, [])

    return (
        <>
            <div>
                <div className='content-container'>
                    <span className='ui large header'>Home</span>
                </div>
            </div>
            <div className='content-container'>
                <div>
                    {posts.length === 0
                        ? (
                            <span>There are no posts.</span>
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
    startSetAllPosts: () => dispatch(startSetAllPosts())
})

export default connect(mapStateToProps, mapDispatchToProps)(PublicPostList)