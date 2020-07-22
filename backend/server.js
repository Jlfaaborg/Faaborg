const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { mongo } = require("mongoose");

const app = express();

const MongoClient = require("mongodb").MongoClient;

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "../build")));

const makeObjectID = (ids) => {
  if (ids === undefined || ids[0] === undefined) return [];
  var _id = ids.map((id) => {
    if (ids !== undefined) return mongo.ObjectID(id);
    else return [];
  });
  return _id;
};

MongoClient.connect(
  "mongodb+srv://jlfaaborg:baIQeTUEIzsO0GyF@faaborg.2ggzw.mongodb.net/faaborgDB?retryWrites=true&w=majority",
  {
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) return console.error(err);
    console.log("Connected to Database");
    const db = client.db("faaborgDB");
    app.get("/login", (req, res) => {
      db.collection("login")
        .findOne({
          username: req.query.username,
          password: req.query.password,
        })
        .then((results, err) => {
          if (err) throw err;
          if (results === null) {
            res.status(404).json({ message: "not found" });
            return;
          } else res.json(results);
        })
        .catch((err) => console.error(err));
    });

    app.post("/login", (req, res) => {
      db.collection("login")
        .findOne({
          username: req.body.username,
        })
        .then((results, err) => {
          if (err) throw err;
          if (results === null) {
            var id = new mongo.ObjectId();
            db.collection("login")
              .insertOne({
                username: req.body.username,
                password: req.body.password,
                displayName: req.body.displayName,
                id: id,
              })
              .then((results, err) => {
                if (err) throw err;
                db.collection("user")
                  .insertOne({
                    _id: id,
                    displayName: "New User",
                    img: new mongo.ObjectID(),
                    friend: [],
                    messages: [],
                    posts: [],
                  })
                  .then((results, err) => {
                    if (err) throw err;
                    res.send("ok");
                  });
              });
          }
        })
        .catch((err) => {
          console.error(err);
          res.send(err);
        });
    });

    app.get("/profile", (req, res) => {
      var id = mongo.ObjectID(req.query.id);
      var posts;
      var friends;
      var messages;
      var user;

      db.collection("user")
        .findOne({
          _id: id,
        })
        .then((results, err) => {
          user = {
            _id: results._id,
            displayName: results.displayName,
            img: results.img,
            friends: results.friends,
            messages: results.messages,
            posts: results.posts,
          };
        })
        .then(() => {
          posts = makeObjectID(user.posts);
          db.collection("post")
            .find({
              _id: { $in: posts },
            })
            .toArray((err, results) => {
              if (err) throw err;

              user.posts = results;
            });
        })
        .then(() => {
          friends = makeObjectID(user.friends);

          db.collection("user")
            .find({
              _id: { $in: friends },
            })
            .toArray((err, results) => {
              if (err) throw err;
              user.friends = results;
            });
        })
        .then(() => {
          if (user.messages === null) throw err;

          messages = makeObjectID(
            user.messages.map((message) => {
              return message._id;
            })
          );

          db.collection("messages")
            .find({
              _id: { $in: messages },
            })
            .toArray((err, results) => {
              if (err) throw err;
              user.messages = results;
              res.json(user);
            });
        })
        .catch((err) => console.error(err));
    });

    app.post("/profile", (req, res) => {
      var _id = new mongo.ObjectID();
      db.collection("user")
        .updateOne(
          {
            _id: mongo.ObjectID(req.body.id),
          },
          {
            $push: {
              posts: _id,
            },
          }
        )
        .then((results, err) => {
          if (err) throw err;
        })
        .then(() => {
          db.collection("post")
            .insertOne({
              _id: _id,
              text: req.body.value,
              displayName: req.body.displayName,
              likes: { users: [], count: 0 },
              comments: [],
              creationDate: Date.now(),
            })
            .then((results, err) => {
              if (err) throw err;
              res.send("ok");
            });
        })
        .catch((err) => {
          console.error(err);
          res.send(err);
        });
    });

    app.delete("/profile", (req, res) => {
      var postId = mongo.ObjectID(req.body.postId);
      var userId = mongo.ObjectID(req.body.userId);
      db.collection("user")
        .updateOne(
          { _id: userId },
          {
            $pull: { posts: postId },
          }
        )
        .then((results, err) => {
          if (err) throw err;
          db.collection("post")
            .deleteOne({
              _id: postId,
            })
            .then((results, err) => {
              if (err) throw err;
              res.send("ok");
            });
        })
        .catch((err) => {
          console.error(err);
          res.send(err);
        });
    });

    app.get("/messages", (req, res) => {
      var userId = mongo.ObjectID(req.query.id);

      db.collection("user")
        .findOne({
          _id: userId,
        })
        .then((results) => {
          res.json(results);
        });
    });

    app.get("/messageThread", (req, res) => {
      var messageId = mongo.ObjectID(req.query.messageId);
      db.collection("messages")
        .findOne({
          _id: messageId,
        })
        .then((response) => {
          res.json(response);
        });
    });

    app.post("/newMessage", (req, res) => {
      var userId = mongo.ObjectID(req.body.userId);
      var friendId = mongo.ObjectID(req.body.friendId);
      var _id = mongo.ObjectID();
      db.collection("messages").insertOne({
        _id: _id,
        thread: [],
      });
      db.collection("user")
        .updateOne(
          {
            _id: userId,
          },
          {
            $push: {
              messages: {
                _id: _id,
                toId: friendId,
              },
            },
          }
        )
        .then((results) => {});
      db.collection("user")
        .updateOne(
          {
            _id: friendId,
          },
          {
            $push: {
              messages: {
                _id: _id,
                toId: userId,
              },
            },
          }
        )
        .then((results) => {});
    });

    app.post("/replymessages", (req, res) => {
      var id = req.body.id;
      var text = req.body.text;
      var name = req.body.displayName;
      var fromId = req.body.fromId;
      db.collection("messages")
        .updateOne(
          {
            _id: mongo.ObjectID(id),
          },
          {
            $push: {
              thread: {
                fromId: mongo.ObjectID(fromId),
                text: text,
                from: name,
              },
            },
          }
        )
        .then((results, err) => {
          if (err) throw err;
          res.send("ok");
        })
        .catch((err) => {
          console.error(err);
          res.send(err);
        });
    });

    app.post("/likes", (req, res) => {
      var postId = req.body.postId;
      var userId = req.body.userId;
      db.collection("post")
        .updateOne(
          {
            _id: mongo.ObjectID(postId),
          },
          {
            $inc: {
              "likes.count": 1,
            },
            $push: {
              "likes.users": mongo.ObjectID(userId),
            },
          }
        )
        .then((results, err) => {
          if (err) throw err;
          res.send("ok");
        })
        .catch((err) => {
          console.error(err);
          res.send(err);
        });
    });

    app.post("/comment", (req, res) => {
      var postId = req.body.postId;
      var userId = req.body.userId;
      var displayName = req.body.displayName;
      var text = req.body.text;

      db.collection("post")
        .updateOne(
          {
            _id: mongo.ObjectID(postId),
          },
          {
            $push: {
              comments: {
                user: mongo.ObjectID(userId),
                text: text,
                creationDate: Date.now(),
                displayName: displayName,
              },
            },
          }
        )
        .then((results, err) => {
          if (err) throw err;
          res.send("ok");
        })
        .catch((err) => {
          console.error(err);
          res.send(err);
        });
    });

    app.get("/friendsPost", (req, res) => {
      if (req.query.ids === undefined) {
        res.json({});
      }
      if (req.query.ids[0] !== "undefined") {
        var ids = makeObjectID(req.query.ids);
        db.collection("post")
          .find({
            _id: { $in: ids },
          })
          .toArray((err, results) => {
            if (err) throw err;
            res.json(results);
          });
      } else {
        res.json({ status: 500 });
      }
    });

    app.get("/friends", (req, res) => {
      var id = mongo.ObjectID(req.query.id);
      var friends = [];
      db.collection("user")
        .findOne({
          _id: id,
        })
        .then((results, err) => {
          if (err) throw err;

          friends = results.friends;
        })
        .then(() => {
          db.collection("user")
            .find({
              _id: { $in: friends },
            })
            .toArray((err, results) => {
              if (err) throw err;
              res.json(results);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    });

    app.post("/friends", (req, res) => {
      var userId = mongo.ObjectID(req.body.userId);
      var friendId = mongo.ObjectID(req.body.friendId);

      db.collection("user")
        .updateOne(
          {
            _id: userId,
          },
          {
            $push: {
              friends: friendId,
            },
          }
        )
        .then((results, err) => {
          if (err) throw err;
          res.send("ok");
        })
        .catch((err) => {
          console.error(err);
          res.send(err);
        });
    });

    app.delete("/friends", (req, res) => {
      var userId = mongo.ObjectID(req.body.userId);
      var friendId = mongo.ObjectID(req.body.friendId);
      db.collection("user")
        .updateOne(
          { _id: userId },
          {
            $pull: { friends: friendId },
          }
        )
        .then((results, err) => {
          if (err) throw err;
          res.send("ok");
        });
    });

    app.get("/friendResults", (req, res) => {
      var displayName = req.query.displayName;
      var regex = new RegExp(["^", displayName, "$"].join(""), "i");
      db.collection("user")
        .find({
          displayName: regex,
        })
        .toArray((err, results) => {
          if (err) throw err;
          res.json(results);
        });
    });
  }
);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
