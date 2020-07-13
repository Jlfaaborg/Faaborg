import React from "react";
import PostFeed from "./PostFeed";

const axios = require("axios");

class ProfileInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: props.id,
        displayName: "",
        img: "",
        posts: [],
      },
    };
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
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div className="ProfileInfo">
        <h1>Hello {this.state.user.displayName}</h1>
        <img src={this.state.user.img} alt="img" width="300" height="300" />
        <PostFeed posts={this.state.user.posts} />
      </div>
    );
  }
}

export default ProfileInfo;
