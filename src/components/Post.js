import React from 'react'
import { Link } from 'react-router-dom'
import { formatDistanceStrict } from 'date-fns'

const Post = ({ title, body, createdAt, id, ownsPost }) => {
    return (
        <div className='ui container clearing raised segment post-list__post'>
            <div className='ui large header'>
                {title}
            </div>
            <p className='post-body'>
                {body}
            </p>
            <div className='ui divider'></div>
            <div className='details'>
                <div className='date'>{formatDistanceStrict(createdAt, Date.now())} ago</div>
                {ownsPost && <Link to={`/edit/${id}`} className='links'>Edit</Link>}
            </div>
        </div>
    )
}

export default Post