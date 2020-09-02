import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const Post = ({ title, body, createdAt, id }) => (
    <>
        <div className='ui main container clearing raised segment'>
            <div className="ui large header">
                {title}
            </div>
            <p className="list-item__subtitle">
                {body}
            </p>
            <span className="list-item__subtitle">
                {moment(createdAt).format("MMMM Do, YYYY")}
            </span>
            <Link className="list-item" to={`/edit/${id}`}>Edit</Link>
        </div>
    </>
);

export default Post;