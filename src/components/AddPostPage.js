import React from 'react'
import { connect } from 'react-redux'
import PostForm from './PostForm'
import { startAddPost } from '../actions/posts'

const AddPostPage = ({ startAddPost, history }) => {
    const onSubmit = (post) => {
        startAddPost(post).then(() => {
            console.log('worked')
            history.push('/')
        })
    }

    return (
        <PostForm
            onSubmit={onSubmit}
            header='Add New Post'
        />
    )
}

const mapDispatchToProps = (dispatch) => ({
    startAddPost: (post) => dispatch(startAddPost(post))
})

export default connect(undefined, mapDispatchToProps)(AddPostPage)