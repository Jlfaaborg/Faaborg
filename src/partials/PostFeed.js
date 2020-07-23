import React from "react";
import "../css/postFeed.scss";

const axios = require("axios");

class PostFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: props.posts,
      id: props.id,
      isFeed: props.isFeed,
      value: "",
      displayName: props.displayName,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleComment = this.handleComment.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.posts !== nextProps.posts) {
      return {
        posts: nextProps.posts,
        displayName: nextProps.displayName,
      };
    }
    return null;
  }

  handleDelete(event) {
    var id = event.target.id;
    axios
      .delete("/api/profile", {
        data: {
          userId: this.state.id,
          postId: id,
        },
      })
      .then((response) => {
        if (response.data === "ok") {
          this.props.parentCallback();
        }
      });
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ value: event.target.value });
  }

  handleLike(event) {
    var id = event.target.id;
    axios
      .post("/api/likes", {
        userId: this.state.id,
        postId: id,
      })
      .then((response) => {
        if (response.data === "ok") {
          this.props.parentCallback();
        }
      });
  }

  handleComment(event) {
    var id = event.target.id;
    console.log(this.state.displayName);
    axios
      .post("/api/comment", {
        userId: this.state.id,
        postId: id,
        displayName: this.state.displayName,
        text: this.state.value,
      })
      .then((response) => {
        if (response.data === "ok") {
          this.props.parentCallback();
        }
      });
  }

  preparePosts(posts) {
    if (
      posts !== undefined &&
      posts.length > 0 &&
      posts[0].likes !== undefined
    ) {
      return (
        <ul>
          {posts.map((post) => (
            <li className="Posts" key={post._id}>
              <h1>{post.displayName}:</h1>
              <h1>{post.text}</h1>
              <h3>Likes : {post.likes.count}</h3>
              <h3>
                Comments &#8659;
                {post.comments.map((comment) => (
                  <div className="Comment" key={comment.creationDate}>
                    <h4>{comment.displayName} Commented </h4>
                    <h5>{comment.text}</h5>
                  </div>
                ))}
              </h3>
              {!this.state.isFeed && (
                <button onClick={this.handleDelete} id={post._id}>
                  Delete
                </button>
              )}
              {this.state.isFeed && (
                <div className="LikeComment">
                  <button onClick={this.handleLike} id={post._id}>
                    Like
                  </button>
                  <textarea onChange={this.handleChange} />
                  <button onClick={this.handleComment} id={post._id}>
                    Post Comment
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      );
    }
  }

  render() {
    return <div className="Feed">{this.preparePosts(this.state.posts)}</div>;
  }
}

export default PostFeed;
