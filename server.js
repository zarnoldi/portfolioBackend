const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(express.static("public"));

// cors Middleware
app.use(cors());

// Get API Keys
const apiKeys = require("./data/apiKeys.json");

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
    console.log(`API key is valid ${apiKey[0].username} is accessing the api`);
    next();
    // if No send 404 response
  } else {
    response.status(404).send("Your API key is not valid");
  }
});

// body parser middleware - takes the request body and turns it into a JSON which can be output
app.use(bodyParser.json());

// Redirects user requests to users route
app.use("/users", require("./routes/users"));

// Redirects user requests to chatroom route
app.use("/chatrooms", require("./routes/chatrooms"));

// start server
const port = 6001;

app.listen(process.env.PORT || port);
