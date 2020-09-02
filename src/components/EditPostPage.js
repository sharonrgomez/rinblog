import React from "react";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import { startEditPost, startRemovePost } from "../actions/posts";

export class EditPostPage extends React.Component {
    onSubmit = (post) => {
        this.props.startEditPost(this.props.post.id, post);
        this.props.history.push("/");
    };

    onRemove = () => {
        this.props.startRemovePost({ id: this.props.post.id });
        this.props.history.push("/");
    };

    render() {
        return (
            <>
                <div className="ui main text container clearing raised segment">
                    <div className="ui large header">Edit Post</div>
                    <div className="ui form container">
                        <PostForm
                            post={this.props.post}
                            onSubmit={this.onSubmit}
                            showRemoveButton={true}
                            onRemove={this.onRemove}
                        />
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = (state, props) => ({
    post: state.posts.find((post) => post.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
    startEditPost: (id, post) => dispatch(startEditPost(id, post)),
    startRemovePost: (data) => dispatch(startRemovePost(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditPostPage);