import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { firebase } from '../firebase/firebase'
import { formatDistanceStrict } from 'date-fns'

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
                .on('value', (snapshot) => {
                    setDisplayName(snapshot.val().user_info.display_name)
                    setAvi(snapshot.val().user_info.display_pic)
                })
        }
        return () => setIsMounted(false)
    }, [user])

    return (
        <article className='ui container clearing raised segment post-list__post'>
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
                {ownsPost
                    ? <Link to={`/edit/${id}`} className='links'>Edit</Link>
                    : !isViewingProfile &&
                    <Link to={`/user/${user}`} className='links'>
                        <img className='display-pic' src={avi} alt={`${displayName}'s avatar`} height='30px' /><span> {displayName}</span>
                    </Link>
                }
            </div>
        </article >
    )
}

export default Post