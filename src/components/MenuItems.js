import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { firebase } from '../firebase/firebase'
import { startLogout } from '../actions/auth'

const MenuItems = ({ isAuthenticated, startLogout, showOnDesktop, user, redirect }) => {
    const itemClass = showOnDesktop ? 'item desktop' : 'item'
    const [displayName, setDisplayName] = useState('')

    // get username
    useEffect(() => {
        if (user) {
            firebase
                .database()
                .ref('users/' + user + '/user_info')
                .on('value', (snapshot) => {
                    setDisplayName(snapshot.val().display_name)
                })
        }
    }, [user])

    const logoutAndRedirect = () => {
        startLogout()
        redirect('/')()
    }

    return (
        <>
            {isAuthenticated
                ? (
                    <>
                        <button className={itemClass} onClick={redirect('/')}>Home</button>
                        <button className={itemClass} onClick={redirect('/create')}>Create Post</button>
                        <button className={itemClass} onClick={logoutAndRedirect}>Logout</button>
                        <button className={itemClass} onClick={redirect('/me')}>{displayName}</button>
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