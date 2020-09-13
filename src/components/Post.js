import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import database, { storage } from '../utilities/firebase'
import { formatDistanceStrict } from 'date-fns'
import UserAvatar from './UserAvatar'
import { startSetImageURL } from '../actions/avatar'

const Post = ({ startSetImageURL, title, body, createdAt, id, ownsPost, isViewingProfile, user, avatar, onViewPage }) => {
    const [displayName, setDisplayName] = useState('')
    const [isMounted, setIsMounted] = useState(true)

    useEffect(() => {
        setIsMounted(true)
        if (isMounted) {
            database
                .ref(`users/${user}`)
                .once('value', (snapshot) => {
                    setDisplayName(snapshot.val().user_info.display_name)
                })
            !avatar && (
                storage
                    .ref(user)
                    .child('display_pic')
                    .getDownloadURL()
                    .then((url) => {
                        startSetImageURL(user, url)
                    })
                    .catch((error) => {
                        // console.log(error)
                    })
            )
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
                {/* if post belongs to current user, show edit link.
                    if not, show username. 
                on profile pages, do not show either. */}
                {
                    ownsPost
                        ? <Link to={`/edit/${id}`} className='links'>Edit</Link>
                        : !isViewingProfile &&
                        <Link to={`/user/${user}`} className='links'>
                            <UserAvatar src={avatar} username={displayName} isCurrentUser={false} /><span>@{displayName}</span>
                        </Link>
                }
                <div className='date'>{formatDistanceStrict(createdAt, Date.now())} ago</div>
            </div>
        </article >
    )
}

const mapStateToProps = (state, ownProps) => ({
    avatar: state.avatar[ownProps.user]
})

const mapDispatchToProps = (dispatch) => ({
    startSetImageURL: (user, url) => dispatch(startSetImageURL(user, url))
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)