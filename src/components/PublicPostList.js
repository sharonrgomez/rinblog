import React, { useEffect } from "react";
import { connect } from "react-redux";
import Post from "./Post";
import { startSetAllPosts } from '../actions/posts'

const PublicPostList = (props) => {
    useEffect(() => {
        props.startSetAllPosts()
    }, []);

    return (
        <>
            <div>
                <div className="content-container">
                    <span className="ui large header">Dashboard</span>
                </div>
            </div>
            <div className="content-container">
                <div>
                    {
                        props.posts.length === 0 ? (
                            <span>There are no posts.</span>
                        ) : (
                                props.posts
                                    .sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)
                                    .map((post) => <Post ownsPost={post.author === props.user} key={post.id} {...post} />)
                            )
                    }
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        user: state.auth.uid
    };
};

const mapDispatchToProps = (dispatch) => ({
    startSetAllPosts: () => dispatch(startSetAllPosts())
});


export default connect(mapStateToProps, mapDispatchToProps)(PublicPostList);