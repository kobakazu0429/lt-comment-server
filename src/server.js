"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var PORT = process.env.PORT || 5001;
app.get("/", function (req, res) {
    return res.send("Hello world.");
});
app.get("/api", function (req, res) {
    var name = req.query.name;
    var title = req.query.title;
    var obj = { name: name, title: title };
    console.log("api: " + JSON.stringify(obj));
    io.emit("api", obj);
    res.send(obj);
    res.end();
});
app.get("/comment/:comment", function (req, res) {
    var msg = req;
    console.log("comment: " + JSON.stringify(msg));
    io.emit("comment", msg);
    res.end();
});
app.get("/comment", function (req, res) {
    var msg = req.query;
    console.log("comment: " + JSON.stringify(msg));
    io.emit("comment", msg);
    res.end();
});
app.get("/like", function (req, res) {
    var msg = req.query;
    console.log("like: " + JSON.stringify(msg));
    io.emit("like", msg);
    res.end();
});
app.use(express.static(path.join(__dirname, "dist")));
io.on("connection", function (socket) {
    console.log("connected: " + socket.request.connection.remoteAddress);
    socket.on("disconnect", function () {
        console.log("disconnected: " + socket.request.connection.remoteAddress);
    });
});
http.listen(PORT);
