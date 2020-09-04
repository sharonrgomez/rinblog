import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLogout } from '../actions/auth'

const MenuItems = ({ isAuthenticated, startLogout, showOnDesktop }) => {
    const itemClass = showOnDesktop ? 'item desktop' : 'item'

    return (
        <>
            {isAuthenticated
                ? (
                    <>
                        <Link className={itemClass} to='/'>Home</Link>
                        <Link className={itemClass} to='/me'>Your Posts</Link>
                        <Link className={itemClass} to='/create'>Create Post</Link>
                        <a className={itemClass} onClick={startLogout}>Logout</a>
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
    isAuthenticated: !!state.auth.uid
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuItems)