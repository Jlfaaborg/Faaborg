import React from "react";
import PostFeed from "./partials/PostFeed";
import TopBar from "./partials/TopBar";

const axios = require("axios");

class FeedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPosts: [],
      user: {
        id: props.id,
      },
    };
  }

  getposts() {
    var posts = this.state.user.posts;
    var friends = this.state.friends;
    friends.forEach((friend) => {
      var concat = friend.posts.concat(posts);
      posts = concat;
    });
    posts.sort((a, b) => {
      return b.created - a.created;
    });
    this.setState({ allPosts: posts });
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/profile", {
        params: {
          id: this.state.user.id,
        },
      })
      .then((response) => {
        if (response.data) {
          this.setState({
            user: response.data,
          });
        }
      })
      .finally(() => {
        console.log(this.state.user);
        var friends = this.state.user.friends;
        var posts = friends.map((friend) => {
          return friend.posts;
        });
        var merge = posts.flat(1);
        axios
          .get("http://localhost:5000/friendsPost", {
            params: {
              ids: merge,
            },
          })
          .then((response) => {
            if (response.data) {
              var posts = this.state.user.posts.concat(response.data);
              this.setState({
                allPosts: posts,
              });
            }
          });
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div className="FeedPage">
        <TopBar />
        <PostFeed posts={this.state.allPosts} />
      </div>
    );
  }
}

export default FeedPage;
