import express = require("express");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  return res.send("Hello world.");
});

app.get("/api", (req, res) => {
  const name = req.query.name;
  const title = req.query.title;
  const obj = { name, title };
  console.log("api: " + JSON.stringify(obj));
  io.emit("api", obj);
  res.send(obj);
  res.end();
});

app.get("/comment/:comment", (req, res) => {
  const msg = req;
  console.log("comment: " + JSON.stringify(msg));
  io.emit("comment", msg);
  res.end();
});

app.get("/comment", (req, res) => {
  const msg = req.query;
  console.log("comment: " + JSON.stringify(msg));
  io.emit("comment", msg);
  res.end();
});

app.get("/like", (req, res) => {
  const msg = req.query;
  console.log("like: " + JSON.stringify(msg));
  io.emit("like", msg);
  res.end();
});

app.use(express.static(path.join(__dirname, "dist")));

io.on("connection", function(socket: any) {
  console.log("connected: " + socket.request.connection.remoteAddress);

  socket.on("disconnect", function() {
    console.log("disconnected: " + socket.request.connection.remoteAddress);
  });
});

http.listen(PORT);
