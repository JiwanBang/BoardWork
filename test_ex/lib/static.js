const fs = require("fs");
const path = require("path");

const staticObj = {};

// PATH: /mnt/c/Users ...... /index.html
// URL : /index.html

// URL로 보내면 PATH로 찾을 수 있게

const rootPath = path.join(__dirname, "../", "views");
// join => 객체 안에 있는 함수(method)
// path => 객체(변수)

const find = (currPath) => {
  const directory = fs.readdirSync(currPath);
  console.log(directory);

  directory.forEach((currPathName) => {
    const findPath = path.join(currPath, currPathName);
    const isFile = fs.statSync(findPath).isFile();

    if (isFile) {
      staticObj[findPath.replace(rootPath, "")] = findPath;
      staticObj[findPath.slice(rootPath.length).replace("index.html", "")] =
        findPath;
    } else {
      find(findPath);
    }
  });
};

find(rootPath);

console.log(staticObj);

module.exports = staticObj;

// 경로(PATH)를 바꿔서(path.join) 파일목록을 배열로 불러옴(fs.readdirSync)

const rootPath1 = path.join(__dirname, "../", "views", "write1");
const isFile = fs.statSync(rootPath1).isFile(); // .isFile => file인가(true or false)
console.log(isFile);

staticObj["/index.html"] =
  "/mnt/c/Users/web/Desktop/GIT-개인작업물/새 폴더/3.25/views/index.html";
