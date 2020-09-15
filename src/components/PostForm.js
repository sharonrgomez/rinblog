import React, { useState } from 'react'
import { connect } from 'react-redux'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import MyUploadAdapter from './UploadAdapter'
import { config } from '../utilities/editorConfig'

const PostForm = ({ onSubmit, onRemove, post, showRemoveButton, header, user }) => {
    ClassicEditor.defaultConfig = config
    ClassicEditor.extraPlugins = 'codesnippet'

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
                            onInit={(editor) => {
                                editor.plugins.get("FileRepository")
                                    .createUploadAdapter = (loader) => {
                                        return new MyUploadAdapter(loader, user)
                                    }
                            }}
                            editor={ClassicEditor}
                            onChange={(_, editor) => {
                                const data = editor.getData()
                                setBody(data)
                            }}
                        />

                        <div id='button'>
                            <button className='ui right floated small submit button button__main' type='submit'>
                                {showRemoveButton ? 'Update' : 'Add Post'}
                            </button>
                            {showRemoveButton
                                &&
                                <button
                                    className='ui right floated small button button__remove'
                                    onClick={onRemove}
                                    type='button'
                                >
                                    Delete Post
                                </button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.uid
})

export default connect(mapStateToProps)(PostForm)