import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Post = ({ title, body, createdAt, id, ownsPost }) => {
    return (
        <div className='ui container clearing raised segment'>
            <div className='ui large header'>
                {title}
            </div>
            <p>
                {body}
            </p>
            <div className='ui divider'></div>
            <div className='details'>
                <div className='date'>{moment(createdAt).format('MMMM Do, YYYY')}</div>
                {ownsPost && <Link to={`/edit/${id}`} className='links'>Edit</Link>}
            </div>
        </div>
    )
}

export default Post