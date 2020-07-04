import React from "react";

class PostFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: props.posts,
    };
    console.log(props.posts);
  }

  preparePosts(posts) {
    if (posts && posts.length > 0) {
      return (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h1>{post.text}</h1>
              <h3>Likes : {post.likes}</h3>
              <h3>
                Comments :{" "}
                {post.comments.map((comment) => (
                  <div className="Comment">
                    <h4>{comment.user.displayName} Commented:</h4>
                    <h5>{comment.text}</h5>
                  </div>
                ))}
              </h3>
            </li>
          ))}
        </ul>
      );
    }
  }

  render() {
    return <div>{this.preparePosts(this.state.posts)}</div>;
  }
}

export default PostFeed;
