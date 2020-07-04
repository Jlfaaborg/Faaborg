import React from "react";

class MessagesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.user,
      messages: [
        {
          otherId: 2221,
          otherDisplayName: "John Doe",
          feed: [
            {
              id: 1112,
              text: "hi",
            },
            {
              id: 2221,
              text: "hiback",
            },
            {
              id: 1112,
              text: "hi back again",
            },
          ],
        },
        {
          otherId: 2221,
          otherDisplayName: "John Doe2",
          feed: [
            {
              id: 1112,
              text: "hi2",
            },
            {
              id: 2221,
              text: "hiback2",
            },
            {
              id: 1112,
              text: "hi back again2",
            },
          ],
        },
      ],
    };
  }
}

export default MessagesPage;
