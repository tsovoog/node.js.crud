const { log } = require("console");
const express = require("express");

const port = 8000;
const app = express();
app.use(express.json());
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

app.get("/users", async (req, res) => {
  const resultJson = await fs.readFileSync("./db.json", "utf-8");
  const result = JSON.parse(resultJson);
  res.send(result.users);
});

app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const resultUserJson = await fs.readFileSync("./db.json", "utf-8");
  const result = JSON.parse(resultUserJson);

  const user = result.users.find((el) => el.userId === id);

  if (!user) {
    res.status(404);
    res.send(`user not found following this id = ${id}`);
    return;
  }
  res.send(user);
});

app.get("/posts", async (req, res) => {
  const resultPostJson = await fs.readFileSync("./db.json", "utf-8");
  const result = JSON.parse(resultPostJson);

  res.send(result.posts);
});
app.get("/post/:id", async (request, response) => {
  const { id } = request.params;

  const resultJson = await fs.readFileSync("./db.json", "utf-8");
  const result = JSON.parse(resultJson);

  const post = result.posts.find((el) => el.postId === id);

  if (!post) {
    response.status(404);
    response.send(`Cannot find following post by this id = ${id}`);
    return;
  }
  const commentsOfThisPost = result.comments.filter((el) => el.postId == asd);

  response.send({
    post: post,
    comments: commentsOfThisPost,
  });
});

app.post("/post", async (req, res) => {
  const { desc, image, userId } = req.body;

  if (!desc || !image || !userId) {
    res.status(400).send({ msg: "Add user detail" });
    return;
  }

  const resultJson = await fs.readFileSync("./db.json", "utf-8");
  const result = JSON.parse(resultJson);
  const postId = uuidv4();
  const publishedAt = new Date().toISOString();

  result.posts.push({
    postId,
    userId,
    desc,
    image,
    publishedAt,
  });

  console.log(result.posts);

  await fs.writeFileSync("./db.json", JSON.stringify(result), "utf-8");
  res.send("succesfully created post");
});


app.put("/comment/:id", async (req, res) => {
  const { text } = req.body;
  const { id } = req.params;
  const resultJson = await fs.readFileSync("./db.json", "utf-8");
  const result = JSON.parse(resultJson);

  const updateHiihGjBuiComments = result.comments.map((el) => {
    if (el.commentId == id) {
      return { ...el, text: text };
    } else {
      return el;
    }
  });

  result.comments = updateHiihGjBuiComments;

  await fs.writeFileSync("./db.json", JSON.stringify(result), "utf-8");

  res.send("Succesfully updated comment");
});

app.listen(PORT, () => {
  console.log(`localhost:${PORT}`);
});


app.listen(port, () => {
  console.log(`running on ${port} `);
});
