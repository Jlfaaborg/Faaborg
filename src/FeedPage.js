import React from "react";
import PostFeed from "./partials/PostFeed";
import TopBar from "./partials/TopBar";
import "./css/feedPage.scss";

const axios = require("axios");

class FeedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPosts: [],
      user: {
        _id: props.id,
      },
      update: false,
    };
    this.parentCallback = this.parentCallback.bind(this);
  }

  parentCallback() {
    this.setState({ update: !this.state.update });
  }

  getposts() {
    var posts = this.state.user.posts;
    var friends = this.state.friends;
    if (friends !== undefined) {
      friends.forEach((friend) => {
        var concat = friend.posts.concat(posts);
        posts = concat;
      });
      posts.sort((a, b) => {
        return b.created - a.created;
      });
      this.setState({ allPosts: posts });
    } else {
      this.setState({ allPosts: posts });
    }
  }

  getProfile() {
    var user;
    var allPosts;
    axios
      .get("/api/profile", {
        params: {
          id: this.state.user._id,
        },
      })
      .then((response) => {
        if (response.data) {
          user = response.data;
        }
      })
      .then(() => {
        var friends = user.friends;
        var posts = friends.map((friend) => {
          return friend.posts;
        });
        var merge = posts.flat(1);
        axios
          .get("/api/friendsPost", {
            params: {
              ids: merge,
            },
          })
          .then((response) => {
            if (response.data.status === 500) {
              this.getProfile();
            } else if (response.data[0]) {
              var posts = user.posts.concat(response.data);
              allPosts = posts;
              this.setState({
                user: user,
                allPosts: allPosts,
              });
            } else if (!response.data[0]) {
              return;
            }
          });
      })
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getProfile();
    this.getposts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.update !== this.state.update) {
      this.getProfile();
      this.getposts();
    }
  }

  render() {
    return (
      <div className="FeedPage">
        <TopBar />
        <PostFeed
          id={this.state.user._id}
          displayName={this.state.user.displayName}
          posts={this.state.allPosts}
          isFeed={true}
          parentCallback={this.parentCallback}
        />
      </div>
    );
  }
}

export default FeedPage;
