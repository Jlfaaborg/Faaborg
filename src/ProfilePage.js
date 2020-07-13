import React from "react";
import TopBar from "./partials/TopBar";
import ProfileInfo from "./partials/ProfileInfo";
import NewPost from "./partials/NewPost";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: this.props.id };
    this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
  }

  rerenderParentCallback() {
    this.forceUpdate();
  }

  render() {
    return (
      <div className="Profile">
        <TopBar />
        <ProfileInfo id={this.state.id} />
        <NewPost
          id={this.state.id}
          rerenderParentCallback={this.rerenderParentCallback}
        />
      </div>
    );
  }
}

export default ProfilePage;
