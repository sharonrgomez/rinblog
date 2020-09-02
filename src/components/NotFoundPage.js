import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
    <>
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">404 - Page Not Found</h1>
            </div>
        </div>
        <div className="content-container">
            <div className="list-body">
                <Link to="/dashboard" replace={false} className='list-item__message'>Back to Dashboard</Link>
            </div>
        </div>
    </>
);

export default NotFoundPage;
