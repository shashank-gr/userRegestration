const form = document.querySelector("#new-form");
const getAllUserBtn = document.querySelector(".btn.get-users");

const deleteUser = async (e) => {
  e.preventDefault();
  if ((e.target.className = "del")) {
    const userDetail = e.target.parentElement.childNodes[0].textContent;
    const email = userDetail.split(":")[1].trim();
    // console.log(email);
    await axios.delete(`http://localhost:3500/user/delete-user/${email}`);
    console.log("deleted from DB");
  }
};

const displayOnPage = (obj) => {
  const ul = document.querySelector(".unordered-list");
  const li = document.createElement("li");
  const btnDel = document.createElement("button");
  btnDel.className = "del";
  btnDel.innerText = "Delete";
  li.className = "list";
  li.appendChild(
    document.createTextNode(`${obj.name} : ${obj.email} : ${obj.phone}`)
  );
  li.appendChild(btnDel);
  li.addEventListener("click", deleteUser);
  ul.insertAdjacentElement("beforeend", li);
};

const adduser = async (e) => {
  e.preventDefault();
  const name = document.querySelector("#userName");
  const email = document.querySelector("#email");
  const phone = document.querySelector("#phone");
  const user = { name: name.value, email: email.value, phone: phone.value };
  await axios.post("http://localhost:3500/user/add-user", user);
  name.value = "";
  email.value = "";
  phone.value = "";
  console.log("Added to DB");
};

const displayUsers = async (e) => {
  const users = await axios.get("http://localhost:3500/user");
  document.querySelector(".unordered-list").innerHTML = "";
  console.log(users.data);
  users.data.forEach((user) => {
    displayOnPage(user);
  });
};
form.addEventListener("submit", adduser);
getAllUserBtn.addEventListener("click", displayUsers);
