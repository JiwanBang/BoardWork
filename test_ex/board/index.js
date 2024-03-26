let posting = "";

const getPost = async () => {
  try {
    const usersRes = await fetch("http://localhost:3000", {
      method: "post",
      mode: "no-cors",
      body: `posting=${posting}`,
    });
    console.log(usersRes);
    const usersData = await usersRes.text();
    console.log(usersData);
    const userArr = JSON.parse(usersData);
    console.log(userArr);

    const usersElem = document.getElementById("postingArea");
    usersElem.innerHTML = "";
    userArr.forEach((item) => {
      usersElem.innerHTML += `<div>${item.posting}</div>`;
    });
    //   const userArr = await (
    //     await fetch("http://localhost:3000/list")
    //   ).text();
  } catch (err) {
    console.error(err);
  }
};

getPost();
