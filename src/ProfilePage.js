import React from "react";
import TopBar from "./partials/TopBar";
import ProfileInfo from "./partials/ProfileInfo";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: 1234,
        displayName: "John Doe",
        img:
          "https://cdn.onebauer.media/one/empire-images/reviews_films/5898af57ccd4a51d075e10e6/john-wick-2.jpg?quality=50&width=1800&ratio=16-9&resizeStyle=aspectfill&format=jpg",
        posts: [
          {
            id: "1234",
            text: "hi",
            likes: "0",
            comments: ["hi"],
            created: new Date("December 31, 2019 03:20:00"),
          },
        ],
      },
    };
  }
  render() {
    return (
      <div className="Profile">
        <TopBar />
        <ProfileInfo />
      </div>
    );
  }
}

export default ProfilePage;
