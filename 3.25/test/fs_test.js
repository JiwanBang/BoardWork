const fs = require("fs");
const path = require("path"); //path => 경로를 만들고 관리해줌

const filename = path.join(__dirname, "../", "views", "index.html");
console.log(filename);

// fs.readFile(filename, "utf8", (err, data) => {
//   console.log(err);
//   console.log(data);
// }); // 비동기 방식 => Promise, async(await)
// console.log("readfile");

const data = fs.readFileSync(filename, { encoding: "utf8" });
//(filename, {옵션(이름은 있지만 순서는 없으므로 객체로 넣어줌)})
console.log(data.toString());
//Buffer이므로 toString으로 원하는 문자열로 뽑아주기

// => 파일을 읽을 때 buffer(16진수로 된 데이터 => 1 Byte씩)으로 가져옴
