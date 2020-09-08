import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { firebase } from '../firebase/firebase'
import { startLogout } from '../actions/auth'

const MenuItems = ({ isAuthenticated, startLogout, showOnDesktop, user, redirect }) => {
    const itemClass = showOnDesktop ? 'item desktop' : 'item'
    const [avi, setAvi] = useState('')

    // get username
    useEffect(() => {
        if (user) {
            firebase
                .database()
                .ref('users/' + user + '/user_info')
                .once('value', (snapshot) => {
                    if (snapshot.val()) {
                        setAvi(snapshot.val().display_pic)
                    }
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
                        <button className={itemClass} onClick={redirect('/me')}>
                            <img height='auto' src={avi} alt='Your avatar' />
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