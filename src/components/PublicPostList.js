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
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">Unleash your mind.</h1>
                </div>
            </div>
            <div className="content-container">
                <div className="list-body">
                    {
                        props.posts.length === 0 ? (
                            <span className="list-item list-item__message">There are no posts.</span>
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
    startSetAllPosts: () => dispatch(startSetAllPosts())
});


export default connect(mapStateToProps, mapDispatchToProps)(PublicPostList);