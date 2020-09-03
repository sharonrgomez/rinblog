import React from 'react'
import { connect } from 'react-redux'
import PostForm from './PostForm'
import { startEditPost, startRemovePost } from '../actions/posts'

const EditPostPage = ({ startEditPost, startRemovePost, history, post }) => {
    const onSubmit = (updates) => {
        startEditPost(post.id, updates)
        history.push('/')
    }

    const onRemove = () => {
        startRemovePost({ id: post.id })
        history.push('/')
    }

    return (
        <PostForm
            post={post}
            onSubmit={onSubmit}
            onRemove={onRemove}
            header='Edit Post'
            showRemoveButton
        />
    )
}

const mapStateToProps = (state, props) => ({
    post: state.posts.find((post) => post.id === props.match.params.id)
})

const mapDispatchToProps = (dispatch) => ({
    startEditPost: (id, post) => dispatch(startEditPost(id, post)),
    startRemovePost: (data) => dispatch(startRemovePost(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditPostPage)