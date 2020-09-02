import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { startLogout, startLogin } from "../actions/auth";

const MobileMenu = ({ startLogout, startLogin, isAuthenticated }) => (
    <>
        <div className="mobile-menu">
            {
                isAuthenticated ? (
                    <>
                        <Link className="item" to="/create">Create Post</Link>
                        <a className="item" onClick={startLogout}>Logout</a>
                    </>
                ) : (
                        <a className='item' onClick={startLogin}>Login</a>
                    )
            }
            <a href="https://github.com/shaerins" className='item' target="_blank"><i className="code icon" /></a>
        </div>
    </>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),
    startLogin: () => dispatch(startLogin())
});

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu);