const net = require("net");
const fs = require("fs");

const { makeReq } = require("./lib/req");
const { makeResponse, redirect, sendFile } = require("./lib/res");
const static = require("./lib/static");

const users = [
  // (page - 1)* 4 <= index < page * 4 (page == 1)
  { id: "test1", pw: "test1", name: "test1" }, //0
  { id: "test2", pw: "test2", name: "test2" }, //1
  { id: "test3", pw: "test3", name: "test3" }, //2
  { id: "test4", pw: "test4", name: "test4" }, //3
  // (page - 1)* 4 <= index < page * 4 (page == 2)
  { id: "test5", pw: "test5", name: "test5" }, //4
  { id: "test6", pw: "test6", name: "test6" }, //5
  { id: "test7", pw: "test7", name: "test7" }, //6
  { id: "test8", pw: "test8", name: "test8" }, //7

  { id: "test9", pw: "test9", name: "test9" }, //8
  { id: "test10", pw: "test10", name: "test10" }, //9
];

const getMessage = ({ header: { method, path }, body }) => {
  let message = "";

  if (method == "GET") {
    if (static[path] != undefined) {
      const body = fs.readFileSync(static[path]);
      if (static[path].indexOf(".js") > 0) {
        message = makeResponse("text/javascript", body.toString());
      } else if (static[path].indexOf(".css") > 0) {
        message = makeResponse("text/css", body.toString());
      } else if (static[path].indexOf(".png") > 0) {
        message = sendFile("image/png", body);
      } else {
        message = makeResponse("text/html", body.toString());
      }
    }
  } else if (method == "POST") {
    if (path == "/") {
      // / => root으로 왔다면 유저 정보 보냄
      // http:localhost:3000/POST
      // POST / HTTP/1.1
      console.log(body.page);
      message = makeResponse(
        "application/json",
        JSON.stringify(
          users
            .slice((body.page - 1) * body.count, body.page * body.count)
            .map((item, idx) => ({ id: item.id, idx }))
        )
        // => 뒤에 ({}) 넣는 이유: 함수 스코프가 아닌 객체로 보내주기 위해
      );
    } else if (path == "/write") {
      // user에 대해서 적는 내용
      users.push(body);
      message = redirect();
    }
  }

  return message;
};

const server = net.createServer((client) => {
  client.on("data", (data) => {
    const req = makeReq(data);

    client.write(getMessage(req));
    client.end();
  });
});

server.listen(3000, "127.0.0.1", () => {
  console.log("server open of 3000 port");
});
