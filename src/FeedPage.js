import React from "react";
import PostFeed from "./partials/PostFeed";
import TopBar from "./partials/TopBar";
class FeedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPosts: [],
      user: {
        id: 1234,
        displayName: "John Doe",
        img:
          "https://cdn.onebauer.media/one/empire-images/reviews_films/5898af57ccd4a51d075e10e6/john-wick-2.jpg?quality=50&width=1800&ratio=16-9&resizeStyle=aspectfill&format=jpg",
        posts: [
          {
            id: 12345,
            text: "hi",
            likes: "0",
            comments: [
              {
                user: {
                  id: 2222,
                  displayName: "John Doe Comment",
                  img:
                    "https://cdn.onebauer.media/one/empire-images/reviews_films/5898af57ccd4a51d075e10e6/john-wick-2.jpg?quality=50&width=1800&ratio=16-9&resizeStyle=aspectfill&format=jpg",
                },
                text: "hi",
              },
            ],
            created: new Date("December 17, 2019 03:20:00"),
          },
        ],
      },
      friends: [
        {
          id: 5555,
          displayName: "John Doe2",
          img:
            "https://cdn.onebauer.media/one/empire-images/reviews_films/5898af57ccd4a51d075e10e6/john-wick-2.jpg?quality=50&width=1800&ratio=16-9&resizeStyle=aspectfill&format=jpg",
          posts: [
            {
              id: 1234,
              text: "bye",
              likes: "0",
              comments: [
                {
                  user: {
                    id: 2222,
                    displayName: "John Doe2 Comment",
                    img:
                      "https://cdn.onebauer.media/one/empire-images/reviews_films/5898af57ccd4a51d075e10e6/john-wick-2.jpg?quality=50&width=1800&ratio=16-9&resizeStyle=aspectfill&format=jpg",
                  },
                  text: "hi",
                },
              ],
              created: new Date("December 20, 2019 03:20:00"),
            },
          ],
        },
        {
          id: 4651,
          displayName: "John Doe3",
          img:
            "https://cdn.onebauer.media/one/empire-images/reviews_films/5898af57ccd4a51d075e10e6/john-wick-2.jpg?quality=50&width=1800&ratio=16-9&resizeStyle=aspectfill&format=jpg",
          posts: [
            {
              id: 4561,
              text: "bye",
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
              ],
              created: new Date("December 30, 2019 03:20:00"),
            },
          ],
        },
      ],
    };
  }

  getposts() {
    var posts = this.state.user.posts;
    var friends = this.state.friends;
    friends.forEach((friend) => {
      var concat = friend.posts.concat(posts);
      posts = concat;
    });
    posts.sort((a, b) => {
      return b.created - a.created;
    });
    this.setState({ allPosts: posts });
  }

  componentWillMount() {
    this.getposts();
  }

  render() {
    return (
      <div className="FeedPage">
        <TopBar />
        <PostFeed posts={this.state.allPosts} />
      </div>
    );
  }
}

export default FeedPage;
