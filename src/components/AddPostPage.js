import { connect } from "react-redux";
import { startAddPost } from "../actions/posts";
import React from "react";
import PostForm from "./PostForm";

export class AddPostPage extends React.Component {
    onSubmit = (post) => {
        this.props.startAddPost(post);
        this.props.history.push("/dashboard");
    };
    render() {
        return (
            <>
                <div className="ui main text container clearing raised segment">
                    <div className="ui large header">Add New Post</div>
                    <div className="ui form container">
                        <PostForm onSubmit={this.onSubmit} showRemoveButton={false} />
                    </div>
                </div>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startAddPost: (post) => dispatch(startAddPost(post))
});

export default connect(undefined, mapDispatchToProps)(AddPostPage);