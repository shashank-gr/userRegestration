const form = document.querySelector("#new-form");
const getAllUserBtn = document.querySelector(".btn.get-users");

const deleteUser = async (e) => {
  e.preventDefault();
  if ((e.target.className = "del")) {
    const userId = e.target.parentElement.childNodes[1].value;
    try {
      const respone = await axios.delete(
        `http://localhost:3500/user/delete-user/${userId}`
      );
      e.target.parentElement.remove();
      console.log(respone.data.msg);
    } catch (err) {
      if (err.respone) {
        console.log(error.response.status);
        console.log(err.respone.data);
      }
    }
  }
};

const displayOnPage = ({ id, name, email, phone }) => {
  // {user:{name:,email:,id:,phone:}}
  // console.log(id, name, email, phone);
  const ul = document.querySelector(".unordered-list");
  const li = document.createElement("li");
  const btnDel = document.createElement("button");
  const input = document.createElement("input");
  input.type = "hidden";
  input.value = id;
  btnDel.className = "del";
  btnDel.innerText = "Delete";
  li.className = "list";
  li.appendChild(document.createTextNode(`${name} : ${email} : ${phone}`));
  li.appendChild(input);
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
  try {
    const response = await axios.post(
      "http://localhost:3500/user/add-user",
      user
    );
    // console.log(response.data);
    displayOnPage(response.data.user);
    name.value = "";
    email.value = "";
    phone.value = "";
    console.log(response.data.msg);
  } catch (err) {
    if (err.respone) {
      console.log(error.response.status);
      console.log(err.respone.data);
    }
  }
};

const displayUsers = async (e) => {
  try {
    const response = await axios.get("http://localhost:3500/user");
    document.querySelector(".unordered-list").innerHTML = "";
    const users = response.data.allUsers;
    users.forEach((user) => {
      displayOnPage(user);
    });
    console.log(response.data.msg);
  } catch (err) {
    if (err.respone) {
      console.log(error.response.status);
      console.log(err.respone.data);
    }
  }
};
form.addEventListener("submit", adduser);
document.addEventListener("DOMContentLoaded", displayUsers);
