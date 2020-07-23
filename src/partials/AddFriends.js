import React from "react";
import "../css/addFriends.scss";

const axios = require("axios");

class AddFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      value: "",
      searchResults: [],
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .get("/api/friendResults", {
        params: { displayName: this.state.value },
      })
      .then((results) => {
        this.setState({ searchResults: results.data });
      });
  }

  handleAdd(event) {
    var friendId = event.target.id;
    var userId = this.state.id;
    axios
      .post("/api/friends", {
        userId: userId,
        friendId: friendId,
      })
      .then((results) => {
        if (results.data === "ok") {
          this.props.parentCallback();
        }
      });
  }

  handleResults() {
    if (this.state.searchResults.length === 0) {
      return;
    }
    return (
      <div className="Results">
        <h1>Results</h1>
        <ul>
          {this.state.searchResults.map((friend) => (
            <li key={friend._id}>
              <h1>{friend.displayName}</h1>
              <button id={friend._id} onClick={this.handleAdd}>
                Add
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <div className="AddFriends">
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter New Friend:
            <textarea value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Find" />
        </form>
        {this.handleResults()}
      </div>
    );
  }
}

export default AddFriends;
