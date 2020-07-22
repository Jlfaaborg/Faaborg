import React from "react";
import TopBar from "./partials/TopBar";
import ProfileInfo from "./partials/ProfileInfo";
import NewPost from "./partials/NewPost";
import "./css/profilePage.scss";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      update: true,
      displayName: props.displayName,
    };
    this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
  }

  rerenderParentCallback() {
    this.setState({
      update: !this.state.update,
    });
  }

  render() {
    return (
      <div className="Profile">
        <TopBar />
        <ProfileInfo update={this.state.update} id={this.state.id} />
        <NewPost
          displayName={this.state.displayName}
          id={this.state.id}
          rerenderParentCallback={this.rerenderParentCallback}
        />
      </div>
    );
  }
}

export default ProfilePage;
