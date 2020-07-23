import React from "react";
import "../css/friends.scss";

const axios = require("axios");

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: props.friends,
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.friends !== nextProps.friends) {
      return {
        friends: nextProps.friends,
      };
    }
    return null;
  }

  handleDelete(event) {
    var id = event.target.id;
    axios
      .delete("/api/friends", {
        data: {
          userId: this.props.id,
          friendId: id,
        },
      })
      .then((response) => {
        if (response.data === "ok") {
          this.props.parentCallback();
        }
      });
  }

  prepareFriends(friends) {
    if (friends === undefined) return;
    friends.sort((a, b) => {
      return a.displayName.localeCompare(b.displayName);
    });

    return (
      <div className="Friends">
        <h1>Friends:</h1>
        <ul>
          {friends.map((friend) => (
            <li key={friend._id}>
              <h1>{friend.displayName}</h1>
              <button id={friend._id} onClick={this.handleDelete}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div className="Feed">{this.prepareFriends(this.state.friends)}</div>
    );
  }
}

export default Friends;
