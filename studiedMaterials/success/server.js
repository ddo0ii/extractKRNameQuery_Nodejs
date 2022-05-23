//https://hwan2.tistory.com/entry/nodejs-%EC%97%90%EC%84%9C-html%EC%97%90%EC%84%9C-get-post-%EB%B0%A9%EC%8B%9D%EC%9D%98-%EB%8D%B0%EC%9D%B4%ED%84%B0%EC%9D%98-%EB%B0%9B%EA%B8%B0
//https://yahohococo.tistory.com/42
//https://riucc.tistory.com/495
//http://localhost:8080/
/*
const express = require("express");
const app = express();
var http = require("http");
var path = require("path");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.get("#", function (req, res) {
  console.log("num passed!");
  var natureFP = req.param("NHFP");
  var natureLP = req.param("NHLP");
  res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
  res.write("첫번째 페이지 : " + natureFP + " 두번째 페이지 : " + natureLP);
  res.end();
});

http.createServer(app).listen(3000, function () {
  console.log("server start get!!!");
});
*/