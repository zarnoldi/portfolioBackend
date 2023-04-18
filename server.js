const express = require("express");

// create instance of express
const app = express();

app.use(express.static("public"));

// get data
const data = require("./data.json");

// route
app.get("/users", (request, response) => {
  console.log("Someone is trying to access /users");
  response.send(data);
  console.log(request);
});

// user email
app.get("/users/:quantity", (request, response) => {
  console.log(`Someone is trying to access ${request.params.quantity} users`);
  const cutData = [...data.users];
  cutData.length = request.params.quantity;
  console.log(request.params);
  response.send(cutData);
});

// Get User by username
app.get("/user/search/:username", (request, response) => {
  console.log(`Someone is trying to access ${request.params.username}`);

  let searchedUser = [...data.users];
  searchedUser = searchedUser.filter((user) => {
    return user.username === request.params.username;
  });
  response.send(searchedUser);
});

// start server
const port = 6001;

app.listen(process.env.PORT || port, () => {
  console.log("the server is alive");
  console.log(process);
  console.log(process.env);
});
