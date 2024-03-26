const net = require("net");
const fs = require("fs");

const { makeReq } = require("./lib/req");
const { makeResponse, redirect, sendFile } = require("./lib/res");
const static = require("./lib/static");

const users = [
  // (page - 1)* 4 <= index < page * 4 (page == 1)
  { id: "", title: "", posting: "", writer: "" }, //0
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
          users.map((item, idx) => ({
            writer: item.writer,
            title: item.title,
            idx,
          }))
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

console.log(redirect);
