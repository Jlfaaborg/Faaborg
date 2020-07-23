import React from "react";
import "../css/newPost.scss";

const axios = require("axios");

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      value: "",
      displayName: props.displayName,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    axios
      .post("/api/profile", {
        id: this.state.id,
        value: this.state.value,
        displayName: this.state.displayName,
      })
      .then((results) => {
        if (results.data === "ok") {
          this.props.rerenderParentCallback();
        }
      });
    event.preventDefault();
  }

  render() {
    return (
      <div className="NewPost">
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter New Post:
            <textarea value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Post" />
        </form>
      </div>
    );
  }
}

export default NewPost;
