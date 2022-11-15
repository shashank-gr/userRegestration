const User = require("../models/user");

exports.addUserToDb = (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  User.create({ name, email, phone })
    .then(() => {
      res.send("added user to DB");
    })
    .catch((err) => console.log(err));
};

exports.deleteUser = (req, res) => {
  console.log(req.params.email);
  User.destroy({ where: { email: req.params.email } }).then(() => {
    res.send("delted");
  });
};

exports.getAllUsers = (req, res) => {
  User.findAll().then((users) => {
    res.send(users);
  });
};
