const form = document.querySelector("#new-form");
const displayOnPage = (obj) => {
  const ul = document.querySelector(".unordered-list");
  const li = document.createElement("li");
  const btnEdit = document.createElement("button");
  const btnDel = document.createElement("button");
  btnEdit.className = "edit";
  btnDel.className = "del";
  btnEdit.innerText = "Edit";
  btnDel.innerText = "Delete";
  li.addEventListener("click", (e) => {
    if (e.target.className == "del") {
      const userDetails = e.target.parentElement.childNodes[0].textContent; //get the string inside the li
      axios
        .get(
          `https://crudcrud.com/api/944aa208bf8b457781c1843894e0e284/userData`
        )
        .then((res) => {
          const userDataAll = res.data;
          userDataAll.forEach((user) => {
            if (userDetails.indexOf(user.email) != -1) {
              axios
                .delete(
                  `https://crudcrud.com/api/944aa208bf8b457781c1843894e0e284/userData/${user._id}`
                )
                .then((res) => {
                  e.target.parentElement.remove();
                  console.log("deleted user");
                })
                .catch((err) => {
                  console.error(err);
                });
            }
          });
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (e.target.className == "edit") {
      const name = document.querySelector("#userName");
      const email = document.querySelector("#email");
      const phone = document.querySelector("#phone");
      const userDetails = e.target.parentElement.childNodes[0].textContent;
      //axios call to edit-->getuser-->and then put the userdetail in input box and delete it
      axios
        .get(
          `https://crudcrud.com/api/944aa208bf8b457781c1843894e0e284/userData`
        )
        .then((res) => {
          const userDataAll = res.data; //all the user data
          userDataAll.forEach((user) => {
            if (userDetails.indexOf(user.email) != -1) {
              axios
                .delete(
                  `https://crudcrud.com/api/944aa208bf8b457781c1843894e0e284/userData/${user._id}`
                )
                .then((res) => {
                  name.value = user.name;
                  email.value = user.email;
                  phone.value = user.value;
                  e.target.parentElement.remove();
                  console.log("deleted user");
                })
                .catch((err) => {
                  console.error(err);
                });
            }
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });

  li.className = "list";
  li.appendChild(
    document.createTextNode(`${obj.name} : ${obj.email} : ${obj.phone}`)
  );
  li.appendChild(btnDel);
  li.appendChild(btnEdit);
  ul.insertAdjacentElement("beforeend", li);
};

const pageReload = () => {
  //getting all the userData from crudcrud
  axios
    .get(`https://crudcrud.com/api/944aa208bf8b457781c1843894e0e284/userData`)
    .then((res) => {
      res.data.forEach((user) => displayOnPage(user));
    })
    .catch((err) => console.log(err));
};

const onsubmit = (e) => {
  e.preventDefault();
  const name = document.querySelector("#userName");
  const email = document.querySelector("#email");
  const phone = document.querySelector("#phone");

  //checking if email is already used
  const ul = document.querySelector(".unordered-list");
  Array.from(ul.children).forEach((li) => {
    let userDetails = li.childNodes[0].textContent;
    if (userDetails.indexOf(email.value) != -1) {
      axios
        .get(
          `https://crudcrud.com/api/944aa208bf8b457781c1843894e0e284/userData`
        )
        .then((res) => {
          const userDataAll = res.data;
          userDataAll.forEach((user) => {
            if (userDetails.indexOf(user.email) != -1) {
              axios
                .delete(
                  `https://crudcrud.com/api/944aa208bf8b457781c1843894e0e284/userData/${user._id}`
                )
                .then((res) => {
                  li.remove();
                  console.log("user deleted");
                })
                .catch((err) => {
                  console.error(err);
                });
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
      li.remove();
    }
  });
  const user = { name: name.value, email: email.value, phone: phone.value };
  //storing in axios
  axios
    .post(
      `https://crudcrud.com/api/944aa208bf8b457781c1843894e0e284/userData`,
      user
    )
    .then((res) => {
      console.log("user details posted");
    })
    .catch((err) => {
      console.error(err);
    });
  name.value = "";
  email.value = "";
  phone.value = "";

  displayOnPage(user);
};

document.addEventListener("DOMContentLoaded", pageReload); //DOMContentLoaded is fired when page is reloded
form.addEventListener("submit", onsubmit);
