import React from 'react'
import { connect } from 'react-redux'
import PostForm from './PostForm'
import { startAddPost } from '../actions/posts'

const AddPostPage = ({ startAddPost, history }) => {
    const onSubmit = (post) => {
        startAddPost(post)
        history.push('/')
    }

    return (
        <div className='ui main text container clearing raised segment'>
            <div className='ui large header'>Add New Post</div>
            <div className='ui form container'>
                <PostForm onSubmit={onSubmit} showRemoveButton={false} />
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    startAddPost: (post) => dispatch(startAddPost(post))
})

export default connect(undefined, mapDispatchToProps)(AddPostPage)