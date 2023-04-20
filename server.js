const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(express.static("public"));

// cors Middleware
app.use(cors());

// Get API Keys
const apiKeys = require("./apiKeys.json");
// Get data
const data = require("./data.json");

// Authorisation Middle ware - Check the usernames whether request has API key in header which matches one stored in database
app.use((request, response, next) => {
  let apiKey = [...apiKeys.apiKeys];

  // Filters out API Key for Username sent via header
  apiKey = apiKey.filter((key) => {
    return key.username === request.headers.username;
  });

  // check if API key associated with username is the same as the one sent in the header
  if (request.headers.apiKey === apiKey.key) {
    // if Yes then run Next
    console.log(`API key is valid ${apiKey.username} is accessing the api`);
    next();
    // if No send 404 response
  } else {
    response.status(404).send("Your API key is not valid");
  }
});

// body parser middleware - takes the request body and turns it into a JSON which can be output
app.use(bodyParser.json());

// POST route
app.post("/user", (request, response) => {
  response.send("thanks for adding a user");
  data.users.push(request.body);
  console.log(data);
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
