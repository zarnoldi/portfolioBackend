const express = require("express");
const app = express.Router();
const data = require("../users.json");

// POST route adds user
app.post("/add", (request, response) => {
  response.send("thanks for adding a user");
  data.users.push(request.body);
  console.log(data);
});

// GET gets all users
app.get("/all", (request, response) => {
  console.log("Someone is trying to access /users");
  response.send(data);
  console.log(request);
});

// GET gets number of users specificed in URL
app.get("/:quantity", (request, response) => {
  console.log(`Someone is trying to access ${request.params.quantity} users`);
  const cutData = [...data.users];
  cutData.length = request.params.quantity;
  console.log(request.params);
  response.send(cutData);
});

// GET gets User by username
app.get("/search/:username", (request, response) => {
  console.log(`Someone is trying to access ${request.params.username}`);

  let searchedUser = [...data.users];
  searchedUser = searchedUser.filter((user) => {
    return user.username === request.params.username;
  });
  response.send(searchedUser);
});

module.exports = app;
