import React from "react";
import { connect } from "react-redux";
import PostListItem from "./PostListItem";

export const PostList = (props) => (
    <>
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Your Posts</h1>
            </div>
        </div>
        <div className="content-container">

            <div className="list-body">
                {
                    props.posts.length === 0 ? (
                        <span className="list-item list-item__message">You have no posts.</span>
                    ) : (
                            props.posts.map((post) => {
                                return <PostListItem key={post.id} {...post} />
                            })
                        )
                }
            </div>
        </div>
    </>
);

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    };
};

export default connect(mapStateToProps)(PostList);