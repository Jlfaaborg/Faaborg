import React from "react";
import { Link } from "react-router-dom";
import "../css/topBar.scss";

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: 1234,
        displayName: "John Doe",
      },
    };
  }
  render() {
    return (
      <div className="TopBar">
        <nav>
          <button>
            <Link to="/feed">Feed</Link>
          </button>
          <button>
            <Link to="/messages">Messages</Link>
          </button>
          <button>
            <Link to="/">Profile</Link>
          </button>
          <button>
            <Link to="/friends">Friends</Link>
          </button>
        </nav>
      </div>
    );
  }
}

export default TopBar;
