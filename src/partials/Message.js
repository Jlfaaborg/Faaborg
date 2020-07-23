import React from "react";
import "../css/message.scss";
const axios = require("axios");

class MessagesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.userId,
      friendId: props.friendId,
      message: [],
      update: false,
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
      .get("/api/profile", {
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
          .post("/api/replymessages", {
            id: id,
            fromId: fromId,
            displayName: displayName,
            text: this.state.value,
          })
          .then((response) => {
            if (response.data === "ok") {
              this.setState({ update: !this.state.update });
            }
          });
      })
      .catch((err) => console.error(err));
  }

  prepareMessages(messages) {
    var message = messages.find((el) => el.toId === this.state.friendId);

    if (message === undefined) {
      this.newThread();
    } else {
      axios
        .get("/api/messageThread", {
          params: {
            messageId: message._id,
          },
        })
        .then((response) => {
          this.setState({ response: response });
        });
    }
  }

  newThread() {
    axios
      .post("/api/newMessage", {
        userId: this.state.id,
        friendId: this.state.friendId,
      })
      .then((response) => {
        console.log(response);
      });
  }

  componentDidMount() {
    this.getmessageId();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.message !== this.state.message ||
      prevState.update !== this.state.update
    ) {
      this.prepareMessages(this.state.message);
    }
  }

  getmessageId() {
    axios
      .get("/api/messages", {
        params: {
          id: this.state.id,
          friendId: this.state.friendId,
        },
      })
      .then((response) => {
        if (response.data) {
          this.setState({
            message: response.data.messages,
          });
        }
      })
      .catch((err) => console.error(err));
  }

  render() {
    var i = 0;

    if (this.state.response === undefined) {
      return <div></div>;
    }
    return (
      <div className="MessagesPage">
        <div className="Messages">
          <div className="Message" key={this.state.response.data._id}>
            <ul>
              {this.state.response.data.thread.map((item) => (
                <li key={i++}>
                  {item.from}: {item.text}
                </li>
              ))}
            </ul>
            <form
              onSubmit={this.handleSubmit}
              id={this.state.response.data._id}
            >
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
        </div>
      </div>
    );
  }
}

export default MessagesPage;
