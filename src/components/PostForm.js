import React, { useState } from 'react'

const PostForm = ({ onSubmit, onRemove, post, showRemoveButton, header }) => {
    const [body, setBody] = useState(post ? post.body : '')
    const [title, setTitle] = useState(post ? post.title : '')
    const [createdAt, setCreatedAt] = useState(post ? post.createdAt : Date.now())
    const [error, setError] = useState('')

    const onBodyChange = (e) => {
        setBody(e.target.value)
    }

    const onTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!body || !title) {
            setError('Please provide a title and a body')
        } else {
            setError('')
            onSubmit({ body, createdAt, title })
        }
    }

    return (
        <div className='content-container post-form'>
            <div className='ui container clearing raised segment'>
                <div className='ui large header'>{header}</div>
                <div className='ui form container'>
                    <form className='form' onSubmit={handleSubmit}>
                        {error && <p>{error}</p>}
                        <div className='field'>
                            <input
                                type='text'
                                placeholder='title'
                                value={title}
                                onChange={onTitleChange}
                                autoFocus
                            />
                        </div>
                        <div className='field'>
                            <textarea
                                placeholder='body'
                                cols='30'
                                rows='15'
                                value={body}
                                onChange={onBodyChange}>
                            </textarea>
                        </div>
                        <div>
                            {showRemoveButton
                                ? (
                                    <>
                                        <button className='ui teal right floated small submit button'>Update</button>
                                        <button className='ui right floated small button' onClick={onRemove} type='button'>Remove Post</button>
                                    </>
                                )
                                : (
                                    <button className='ui teal right floated small submit button'>Add Post</button>
                                )
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default PostForm
