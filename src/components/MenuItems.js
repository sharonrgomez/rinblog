import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firebase } from '../firebase/firebase'
import { startLogout } from '../actions/auth'

const MenuItems = ({ isAuthenticated, startLogout, showOnDesktop, user }) => {
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


    return (
        <>
            {isAuthenticated
                ? (
                    <>
                        <Link className={itemClass} to='/'>Home</Link>
                        <Link className={itemClass} to='/create'>Create Post</Link>
                        <a className={itemClass} onClick={startLogout}>Logout</a>
                        <Link className={itemClass} to='/me'>@{displayName}</Link>
                    </>
                )
                : (
                    <>
                        <Link className={itemClass} to='/signup'>Sign Up</Link>
                        <Link className={itemClass} to='/login'>Login</Link>
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