import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const PostListItem = ({ title, body, createdAt, id }) => (
    <>
        <div className='ui main container clearing raised segment'>
            <h3 className="title">
                {title}
            </h3>
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

export default PostListItem;