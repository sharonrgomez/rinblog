import React, { useState } from 'react'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { config } from '../utilities/editorConfig'

const PostForm = ({ onSubmit, onRemove, post, showRemoveButton, header }) => {
    ClassicEditor.defaultConfig = config
    const [error, setError] = useState('')
    const [title, setTitle] = useState(post ? post.title : '')
    const [body, setBody] = useState(post ? post.body : '')
    const createdAt = post ? post.createdAt : Date.now()

    const onTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!body || !title) {
            setError('Please provide a title and a body.')
        } else {
            setError('')
            onSubmit({ body, createdAt, title })
        }
    }

    return (
        <div className='content-container post-form'>
            <div className='ui container clearing raised segment'>
                <div className='ui large header'>{header}</div>
                {error && <p className='ui error message'>{error}</p>}
                <div className='ui form container'>
                    <form className='form' onSubmit={handleSubmit}>
                        <div className='field'>
                            <label>Title</label>
                            <input
                                type='text'
                                placeholder='title'
                                value={title}
                                onChange={onTitleChange}
                                autoFocus
                            />
                        </div>

                        <CKEditor
                            id='editor'
                            data={body}
                            editor={ClassicEditor}
                            onChange={(_, editor) => {
                                const data = editor.getData()
                                setBody(data)
                            }}
                        />

                        <div>
                            <button className='ui right floated small submit button button__main' type='submit'>
                                {showRemoveButton ? 'Update' : 'Add Post'}
                            </button>
                            {showRemoveButton
                                &&
                                <button
                                    className='ui right floated small button'
                                    onClick={onRemove}
                                    type='button'
                                >
                                    Remove Post
                                </button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostForm