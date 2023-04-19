const express = require("express");
const app = express();
// const cors = require("cors");
app.use(express.static("public"));

// cors Middleware
// app.use(cors());

// Get API Keys
const apiKeys = require("./apiKeys.json");
// Get data
const data = require("./data.json");

// Authorisation Middle ware - Check whether request has API key in header which matches one stored in database
app.use((request, response, next) => {
  let apiKey = [...apiKeys.apiKeys];

  apiKey = apiKey.filter((key) => {
    return key.username === request.headers.username;
  });

  console.log(apiKey);

  if (request.headers.apiKey === apiKey.key) {
    console.log(`API key is valid ${apiKey.username} is accessing the api`);
    console.log("this runs");
    next();
  } else {
    response.status(404).send("Your API key is not valid");
  }
});

app.use((request, response, next) => {
  console.log("Onion layer 1 activated");
  next();
});

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

app.listen(process.env.PORT || port);
