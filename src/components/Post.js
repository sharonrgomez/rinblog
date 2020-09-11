import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { firebase } from '../firebase/firebase'
import { formatDistanceStrict } from 'date-fns'
import UserAvatar from './UserAvatar'

const Post = ({ title, body, createdAt, id, ownsPost, isViewingProfile, user, onViewPage }) => {
    const [displayName, setDisplayName] = useState('')
    const [avi, setAvi] = useState('')
    const [isMounted, setIsMounted] = useState(true)

    useEffect(() => {
        setIsMounted(true)
        if (isMounted) {
            firebase
                .database()
                .ref(`users/${user}`)
                .once('value', (snapshot) => {
                    setDisplayName(snapshot.val().user_info.display_name)
                    setAvi(snapshot.val().user_info.display_pic)
                })
        }
        return () => setIsMounted(false)
    }, [user])

    return (
        <article id='post-list__post' className='ui container clearing raised segment'>
            <div className='ui large header'>
                {title}
            </div>
            <p className='post-body'>
                {!onViewPage &&
                    body.length > 500
                    ? (
                        <>
                            {body.slice(0, 500)}
                            <Link to={`/post/${id}`} className='links'>...Read More</Link>
                        </>
                    )
                    : body
                }
            </p>
            <div className='ui divider'></div>
            <div className='details'>
                <div className='date'>{formatDistanceStrict(createdAt, Date.now())} ago</div>
                {/* if post belongs to current user, show edit link.
                    if not, show username. 
                    on profile pages, do not show either. */}
                {
                    ownsPost
                        ? <Link to={`/edit/${id}`} className='links'>Edit</Link>
                        : !isViewingProfile &&
                        <Link to={`/user/${user}`} className='links'>
                            <span>@{displayName}</span><UserAvatar src={avi} username={displayName} isCurrentUser={false} />
                        </Link>
                }
            </div>
        </article >
    )
}

export default Post