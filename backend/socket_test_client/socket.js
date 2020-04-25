var socket = require("socket.io-client")("http://127.0.0.1:3333");

var matchId = "123456";
var userId = 123;

socket.on("connect", function () {
  console.log("connect");

  socket.emit("join-match", {
    match_id: matchId,
    user_id: userId,
  });
});

socket.on("match-start", function (data) {
  console.log("match-start");
});

socket.on("match-start-round", function (data) {
  console.log(data);
});

socket.on("match-start-question", function (data) {
  console.log(data);
});

socket.on("match-question-countdown", function (data) {
  console.log(data);
});

socket.on("match-end-round", function (data) {
  console.log(data);
});
