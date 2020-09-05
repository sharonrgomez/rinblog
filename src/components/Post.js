import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { firebase } from '../firebase/firebase'
import { formatDistanceStrict } from 'date-fns'

const Post = ({ title, body, createdAt, id, ownsPost, isViewingProfile, user }) => {
    const [displayName, setDisplayName] = useState('')

    // get username to be displayed under post
    useEffect(() => {
        let mounted = true
        if (mounted) {
            firebase
                .database()
                .ref(`users/${user}`)
                .on('value', (snapshot) => {
                    setDisplayName(snapshot.val().user_info.display_name)
                })
        }
        return () => mounted = false
    }, [])

    return (
        <article className='ui container clearing raised segment post-list__post'>
            <div className='ui large header'>
                {title}
            </div>
            <p className='post-body'>
                {body}
            </p>
            <div className='ui divider'></div>
            <div className='details'>
                <div className='date'>{formatDistanceStrict(createdAt, Date.now())} ago</div>
                {/* if post belongs to current user, show edit link.
                if not, show username. 
                on profile pages, do not show either. */}
                {ownsPost
                    ? <Link to={`/edit/${id}`} className='links'>Edit</Link>
                    : !isViewingProfile && <Link to={`/user/${user}`} className='links'>{displayName}</Link>
                }
            </div>
        </article>
    )
}

export default Post