// chatroom route
const express = require("express");
const app = express.Router();
const data = require("../data/chatrooms.json");

app.post("/add", (request, response) => {
  response.send(`chatroom ${request.body.name}`);
  data.chatrooms.push(request.body);
  console.log(data);
});

app.get("/search/:chatroomName", (request, response) => {
  let searchedChatroom = [...data.chatrooms];
  searchedChatroom = searchedChatroom.filter((chatroom) => {
    return chatroom.name === request.params.chatroomName;
  });
  console.log(searchedChatroom);
  response.send(searchedChatroom);
});

module.exports = app;
