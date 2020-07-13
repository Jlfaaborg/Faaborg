import React from "react";
import ProfilePage from "./ProfilePage";
import FeedPage from "./FeedPage";
import MessagePage from "./MessagesPage";
import NewUserPage from "./partials/NewPost";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const axios = require("axios");

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", isLoggedIn: false, id: 0 };

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
    console.log(username);
    axios
      .post("http://localhost:5000/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response);
        if (response.data === "ok") {
        }
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    var username = this.state.username;
    var password = this.state.password;
    axios
      .get("http://localhost:5000/login", {
        params: {
          username: username,
          password: password,
        },
      })
      .then((response) => {
        if (response.data) {
          this.setState({ id: response.data.id, isLoggedIn: true });
        }
      })
      .catch((err) => console.error(err));
  }

  login() {
    return (
      <div className="LoginPage">
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
      <div>
        {this.state.isLoggedIn ? (
          <Router>
            <Switch>
              <Route exact path="/">
                <ProfilePage id={this.state.id} />
              </Route>
              <Route path="/feed">
                <FeedPage id={this.state.id} />
              </Route>
              <Route path="/messages">
                <MessagePage id={this.state.id} />
              </Route>
              <Route path="/newUser">
                <NewUserPage />
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
