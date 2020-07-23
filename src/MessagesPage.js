import React from "react";
import TopBar from "./partials/TopBar";
import Message from "./partials/Message";
import "./css/messagesPage.scss";

const axios = require("axios");

class MessagesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      friendId: "",
      friends: [],
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.getFriends();
  }

  handleSelect(event) {
    this.setState({ friendId: event.target.id });
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

  selectFriend() {
    var friends = this.state.friends;
    if (friends === undefined) return;
    friends.sort((a, b) => {
      return a.displayName.localeCompare(b.displayName);
    });

    return (
      <div className="Friends">
        <h1>Message Friends</h1>
        <ul>
          {friends.map((friend) => (
            <li key={friend._id}>
              <h1>{friend.displayName}</h1>
              <button id={friend._id} onClick={this.handleSelect}>
                Select
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div className="MessagesPage">
        <TopBar />
        {this.state.friendId === "" ? (
          this.selectFriend()
        ) : (
          <Message userId={this.state.id} friendId={this.state.friendId}>
            {" "}
          </Message>
        )}
      </div>
    );
  }
}

export default MessagesPage;
