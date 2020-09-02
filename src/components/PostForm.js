import React from "react";

export default class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: props.post ? props.post.body : "",
            title: props.post ? props.post.title : "",
            createdAt: props.post ? props.post.createdAt : Date.now(),
            error: ''
        };
    }

    onBodyChange = (e) => {
        const body = e.target.value;
        this.setState(() => ({ body }));
    };

    onTitleChange = (e) => {
        const title = e.target.value;
        this.setState(() => ({ title }));
    };

    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.body || !this.state.title) {
            this.setState(() => ({ error: "Please provide a title and a body" }));
        } else {
            this.setState(() => ({ error: "" }));
            this.props.onSubmit({
                body: this.state.body,
                createdAt: this.state.createdAt,
                title: this.state.title
            });
        }
    };

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p>{this.state.error}</p>}
                <div className="field">
                    <input
                        type="text"
                        placeholder="title"
                        value={this.state.title}
                        onChange={this.onTitleChange}
                        autoFocus />
                </div>
                <div className="field">
                    <textarea
                        placeholder="body"
                        cols="30"
                        rows="15"
                        value={this.state.body}
                        onChange={this.onBodyChange}>
                    </textarea>
                </div>
                <div>
                    {
                        this.props.showRemoveButton ? (
                            <>
                                <button className="ui teal right floated small submit button">Update</button>
                                <button className="ui right floated small button" onClick={this.props.onRemove}>Remove Post</button>
                            </>
                        ) : (
                                <button className="ui teal right floated small submit button">Add Post</button>
                            )
                    }
                </div>
            </form>
        );
    }
}