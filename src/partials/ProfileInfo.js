import React from "react";
import PostFeed from "./PostFeed";

const axios = require("axios");

class ProfileInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        _id: props.id,
        displayName: "",
        img: "",
        posts: [],
      },
      update: false,
      response: 500,
    };
    this.parentCallback = this.parentCallback.bind(this);
  }

  parentCallback() {
    this.setState({ update: !this.state.update });
  }

  componentDidMount() {
    this.getProfile();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.update !== this.props.update ||
      prevState.update !== this.state.update
    ) {
      this.getProfile();
    }
  }

  getProfile() {
    axios
      .get("/api/profile", {
        params: {
          id: this.state.user._id,
        },
      })
      .then((response) => {
        if (response.status === 500) {
          this.getProfile();
        } else if (response.data) {
          this.setState({
            user: response.data,
          });
        }
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div className="ProfileInfo">
        <h1>Hello {this.state.user.displayName}</h1>
        <PostFeed
          displayName={this.state.user.displayName}
          posts={this.state.user.posts}
          id={this.state.user._id}
          isFeed={false}
          parentCallback={this.parentCallback}
        />
      </div>
    );
  }
}

export default ProfileInfo;
