import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { firebase } from '../firebase/firebase'
import UserAvatar from './UserAvatar'
import { startLogout } from '../actions/auth'

const MenuItems = ({ isAuthenticated, startLogout, showOnDesktop, user, redirect }) => {
    const itemClass = showOnDesktop ? 'item desktop' : 'item'
    const [avi, setAvi] = useState('')
    const [isMounted, setIsMounted] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        let getAvatar;
        if (isMounted) {
            if (user) {
                getAvatar = (
                    firebase
                        .database()
                        .ref('users/' + user + '/user_info')
                        .on('value', (snapshot) => {
                            if (snapshot.val()) {
                                setAvi(snapshot.val().display_pic)
                            }
                        })
                )
            }
            setIsLoaded(true)
        }
        return () => {
            setIsMounted(false)
            if (!user && getAvatar) {
                getAvatar.off()
            }
        }
    }, [user])

    const logoutAndRedirect = () => {
        startLogout().then(redirect('/'))
    }

    return (
        <>
            {isAuthenticated
                ? (
                    <>
                        <button className={itemClass} onClick={redirect('/')}>Home</button>
                        <button className={itemClass} onClick={redirect('/create')}>Create Post</button>
                        <button className={itemClass} onClick={logoutAndRedirect}>Logout</button>
                        <button className={itemClass} onClick={redirect('/me')}>
                            <UserAvatar src={avi} isCurrentUser={true} />
                        </button>
                    </>
                )
                : (
                    <>
                        <button className={itemClass} onClick={redirect('/signup')}>Sign Up</button>
                        <button className={itemClass} onClick={redirect('/login')}>Login</button>
                    </>
                )
            }
            <a href='https://github.com/shaerins' className={itemClass} target='_blank'>
                <i className='code icon' />
            </a>
        </>
    )
}

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
    user: state.auth.uid
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuItems)