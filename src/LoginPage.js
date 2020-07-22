import React from "react";
import ProfilePage from "./ProfilePage";
import FeedPage from "./FeedPage";
import MessagePage from "./MessagesPage";
import FriendsPage from "./FriendsPage";
import Header from "./partials/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/loginPage.scss";

const axios = require("axios");

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLoggedIn: false,
      id: "",
      displayName: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNewUser = this.handleNewUser.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  handleNewUser(event) {
    event.preventDefault();
    var username = this.state.username;
    var password = this.state.password;
    axios
      .post("/login", {
        username: username,
        password: password,
        displayName: "New User",
      })
      .then((response) => {
        if (response.data === "ok") {
          return <div>New User</div>;
        }
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    var username = this.state.username;
    var password = this.state.password;
    axios
      .get("/login", {
        params: {
          username: username,
          password: password,
        },
      })
      .then((response) => {
        if (response.data) {
          this.setState({
            id: response.data.id,
            displayName: response.data.displayName,
            isLoggedIn: true,
          });
        }
      })
      .catch((err) => console.error(err));
  }

  login() {
    return (
      <div className="Form">
        <form>
          <label>
            Username:
            <input
              name="username"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              name="password"
              type="password"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <input type="submit" value="Login" onClick={this.handleSubmit} />
        </form>
        <div className="CreateUser">
          <button onClick={this.handleNewUser}>Create</button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="LoginPage">
        <Header />
        {this.state.isLoggedIn ? (
          <Router>
            <Switch>
              <Route exact path="/">
                <ProfilePage
                  id={this.state.id}
                  displayName={this.state.displayName}
                />
              </Route>
              <Route path="/feed">
                <FeedPage
                  displayName={this.state.displayName}
                  id={this.state.id}
                />
              </Route>
              <Route path="/messages">
                <MessagePage
                  displayName={this.state.displayName}
                  id={this.state.id}
                />
              </Route>
              <Route path="/friends">
                <FriendsPage
                  displayName={this.state.displayName}
                  id={this.state.id}
                />
              </Route>
            </Switch>
          </Router>
        ) : (
          this.login()
        )}
      </div>
    );
  }
}

export default LoginPage;
