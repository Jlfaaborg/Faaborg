import React from "react";
import TopBar from "./partials/TopBar";

const axios = require("axios");

class MessagesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      message: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    var fromId;
    var displayName;
    var id = event.target.id;
    axios
      .get("http://localhost:5000/profile", {
        params: {
          id: this.state.id,
        },
      })
      .then((response) => {
        if (response.data) {
          fromId = response.data._id;
          displayName = response.data.displayName;
        }
      })
      .then(() => {
        axios
          .post("http://localhost:5000/replymessages", {
            id: id,
            fromId: fromId,
            displayName: displayName,
            text: this.state.value,
          })
          .then((response) => {
            console.log(response);
          });
      })
      .catch((err) => console.error(err));
  }

  prepareMessages(messages) {
    if (messages === undefined) return;
    var i = 0;
    return (
      <div>
        {messages.map((message) => (
          <div className="Message" key={message._id}>
            <ul>
              {message.thread.map((item) => (
                <li key={i++}>
                  {item.from}: {item.text}
                </li>
              ))}
            </ul>
            <form onSubmit={this.handleSubmit} id={message._id}>
              <label>
                New Message:
                <textarea
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </label>
              <input type="submit" value="Post" />
            </form>
          </div>
        ))}
      </div>
    );
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/profile", {
        params: {
          id: this.state.id,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          this.setState({
            messages: response.data.messages,
          });
        }
      })

      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div className="MessagesPage">
        <TopBar />
        {this.prepareMessages(this.state.messages)}
      </div>
    );
  }
}

export default MessagesPage;
