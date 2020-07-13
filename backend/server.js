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
  if (ids === undefined) return [];
  var _id = ids.map((id) => {
    return mongo.ObjectID(id);
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
            friends: [],
            messages: [],
            posts: [],
          };

          posts = makeObjectID(results.posts);
          friends = makeObjectID(results.friends);
          messages = makeObjectID(results.messages);
        })
        .then(() => {
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
          db.collection("post").insertOne({
            _id: _id,
            text: req.body.value,
            likes: { users: [], count: 0 },
            comments: [],
            creationDate: Date.now(),
          });
        })
        .catch((err) => {
          console.error(err);
          res.send(err);
        });
      res.send("ok");
    });

    app.post("/replymessages", (req, res) => {
      var id = req.body.id;
      var text = req.body.text;
      var name = req.body.displayName;
      var fromId = req.body.fromId;
      console.log(id);
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
        })
        .catch((err) => {
          console.error(err);
          res.send(err);
        });
      res.send("ok");
    });

    app.get("/friendsPost", (req, res) => {
      var ids = makeObjectID(req.query.ids);
      db.collection("post")
        .find({
          _id: { $in: ids },
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
