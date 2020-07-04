import React from "react";
import ProfilePage from "./ProfilePage";
import FeedPage from "./FeedPage";
import MessagePage from "./MessagesPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", isLoggedIn: true };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  login() {
    return (
      <div className="LoginPage">
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
        <input type="submit" value="Submit" />
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
                <ProfilePage />
              </Route>
              <Route path="/feed">
                <FeedPage />
              </Route>
              <Route path="/messages">
                <MessagePage />
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
