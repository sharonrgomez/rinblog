import React from "react";
import Header from './Header';
import PublicPostList from './PublicPostList';

const LoginPage = () => (
    <>
        <Header />
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Unleash your mind.</h1>
            </div>
        </div>
        <PublicPostList />
    </>
);


export default LoginPage;