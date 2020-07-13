import React from "react";

const axios = require("axios");

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      value: "",
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
      .post("http://localhost:5000/profile", {
        id: this.state.id,
        value: this.state.value,
      })
      .then((results) => {
        if (results.data === "ok") {
          this.props.rerenderParentCallback();
        }
      });
  }

  render() {
    return (
      <div className="NewPost">
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter New Posts:
            <textarea value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Post" />
        </form>
      </div>
    );
  }
}

export default NewPost;
