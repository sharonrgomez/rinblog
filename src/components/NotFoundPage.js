import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
    <>
        <div>
            <div className="content-container">
                <h1>404 - Page Not Found</h1>
            </div>
        </div>
        <div className="content-container">
            <div>
                <Link to="/" replace={false}>Back to Dashboard</Link>
            </div>
        </div>
    </>
);

export default NotFoundPage;
