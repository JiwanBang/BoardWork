let page = 1;
let count = 4;

const getUsers = async () => {
  try {
    const usersRes = await fetch("http://localhost:3000", {
      method: "post",
      mode: "no-cors",
      body: `page=${page}&count=${count}`,
    });
    console.log(usersRes);
    const usersData = await usersRes.text();
    console.log(usersData);
    const userArr = JSON.parse(usersData);
    console.log(userArr);

    const usersElem = document.getElementById("users");
    usersElem.innerHTML = "";
    userArr.forEach((item) => {
      usersElem.innerHTML += `<li>${item.id}</li>`;
    });
    //   const userArr = await (
    //     await fetch("http://localhost:3000/list")
    //   ).text();
  } catch (err) {
    console.error(err);
  }
};

getUsers();
const getPage = async () => {
  try {
    const pageCount = 3;

    const pagingElem = document.getElementById("paging");
    for (let i = 0; i < pageCount; ++i) {
      const tempLi = document.createElement("li");
      tempLi.innerHTML = i + 1;
      tempLi.onclick = () => {
        page = i + 1;
        getUsers();
      };
      pagingElem.append(tempLi);
    }
  } catch (err) {
    console.error(err);
  }
};

getPage();
