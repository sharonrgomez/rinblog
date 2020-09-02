import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const Post = ({ title, body, createdAt, id, ownsPost }) => {
    return (
        <>
            <div className='ui container clearing raised segment'>
                <div className="ui large header">
                    {title}
                </div>
                <p>
                    {body}
                </p>
                <div className='details'>
                    {moment(createdAt).format("MMMM Do, YYYY")}
                    {ownsPost &&
                        <Link className='ui teal right floated mini submit button' to={`/edit/${id}`}>Edit</Link>
                    }
                </div>
            </div>
        </>
    )
};

export default Post;