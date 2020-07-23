import React from "react";
import TopBar from "./partials/TopBar";
import Friends from "./partials/Friends";
import AddFriends from "./partials/AddFriends";
import "./css/friendsPage.scss";

const axios = require("axios");

class FriendsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      friendsInfo: [],
      id: props.id,
      update: false,
    };
    this.parentCallback = this.parentCallback.bind(this);
  }

  parentCallback() {
    this.setState({ update: !this.state.update });
  }

  componentDidMount() {
    this.getFriends();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.update !== this.state.update) {
      this.getFriends();
    }
  }

  getFriends() {
    axios
      .get("/api/friends", {
        params: {
          id: this.state.id,
        },
      })
      .then((response) => {
        this.setState({ friends: response.data });
      });
  }

  render() {
    return (
      <div className="FriendsPage">
        <TopBar />
        <Friends
          friends={this.state.friends}
          parentCallback={this.parentCallback}
          id={this.state.id}
        />
        <AddFriends parentCallback={this.parentCallback} id={this.state.id} />
      </div>
    );
  }
}

export default FriendsPage;
