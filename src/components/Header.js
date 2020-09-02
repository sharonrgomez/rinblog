import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startLogout, startLogin } from "../actions/auth";
import MobileMenu from './MobileMenu';

export const Header = ({ startLogout, startLogin, isAuthenticated }) => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const toggleMobileMenu = () => {
        if (showMobileMenu) {
            setShowMobileMenu(false)
        } else {
            setShowMobileMenu(true)
        }
    }

    return (
        <div className='Header'>
            <div className="ui fixed inverted menu">
                <div className="ui container">
                    <Link className="header item" to="/"><h3><i className="leaf icon"></i>.rinblog</h3></Link>
                    {
                        isAuthenticated ? (
                            <>
                                <Link className="item desktop" to="/">Home</Link>
                                <Link className="item desktop" to="/me">Username</Link>
                                <Link className="item desktop" to="/create">Create Post</Link>
                                <a className="item desktop" onClick={startLogout}>Logout</a>
                            </>
                        ) : (
                                <a className='item desktop' onClick={startLogin}>Login</a>
                            )
                    }
                    <a href="https://github.com/shaerins" className='item desktop' target="_blank"><i className="code icon" /></a>
                    <a className='right menu item mobile' onClick={toggleMobileMenu}><i className='bars icon'></i></a>
                </div>
                {
                    showMobileMenu && <MobileMenu />
                }
            </div>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),
    startLogin: () => dispatch(startLogin())
});

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);