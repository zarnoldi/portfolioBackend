const express = require("express");

// create instance of express
const app = express();

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

// Get James
app.get("/user/james", (request, response) => {
  console.log("Someone is trying to access James");

  let james = [...data.users];
  james = james.filter((user) => {
    return user.firstName === "James";
  });
  response.send(james);
});

// start server
app.listen(6001, () => {
  console.log("the server is alive");
});
