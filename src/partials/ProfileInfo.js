import React from "react";
import PostFeed from "./PostFeed";

class ProfileInfo extends React.Component {
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
            id: 1234,
            text: "hi",
            likes: "0",
            comments: [
              {
                user: {
                  id: 2222,
                  displayName: "John Doe",
                  img:
                    "https://cdn.onebauer.media/one/empire-images/reviews_films/5898af57ccd4a51d075e10e6/john-wick-2.jpg?quality=50&width=1800&ratio=16-9&resizeStyle=aspectfill&format=jpg",
                },
                text: "hi",
              },
              {
                user: {
                  id: 5646,
                  displayName: "John Does",
                  img:
                    "https://cdn.onebauer.media/one/empire-images/reviews_films/5898af57ccd4a51d075e10e6/john-wick-2.jpg?quality=50&width=1800&ratio=16-9&resizeStyle=aspectfill&format=jpg",
                },
                text: "hi2",
              },
            ],
            created: new Date("December 1, 2019 03:20:00"),
          },
          {
            id: 1357,
            text: "hello",
            likes: "1",
            comments: [
              {
                user: {
                  id: 2222,
                  displayName: "John Doe",
                  img:
                    "https://cdn.onebauer.media/one/empire-images/reviews_films/5898af57ccd4a51d075e10e6/john-wick-2.jpg?quality=50&width=1800&ratio=16-9&resizeStyle=aspectfill&format=jpg",
                },
                text: "hello",
              },
            ],
            created: new Date("December 10, 2019 03:20:00"),
          },
        ],
      },
    };
  }

  render() {
    return (
      <div className="ProfileInfo">
        <h1>Hello {this.state.user.displayName}</h1>
        <img src={this.state.user.img} alt="img" width="300" height="300" />
        <PostFeed posts={this.state.user.posts} />
      </div>
    );
  }
}

export default ProfileInfo;
