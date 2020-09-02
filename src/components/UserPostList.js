import React, { useEffect } from "react";
import { connect } from "react-redux";
import Post from "./Post";
import { startSetPosts } from '../actions/posts';

export const UserPostList = (props) => {
    useEffect(() => {
        props.startSetPosts()
    }, []);

    return (
        <>
            <div>
                <div className="content-container">
                    <span className="ui large header">Your Posts</span>
                </div>
            </div>
            <div className="content-container">
                <div>
                    {
                        props.posts.length === 0 ? (
                            <span>You have no posts.</span>
                        ) : (
                                props.posts
                                    .sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)
                                    .map((post, ind) => <Post key={ind} {...post} />)
                            )
                    }
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    };
};


const mapDispatchToProps = (dispatch) => ({
    startSetPosts: () => dispatch(startSetPosts())
});


export default connect(mapStateToProps, mapDispatchToProps)(UserPostList);