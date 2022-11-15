const User = require("../models/user");

exports.addUserToDb = (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  User.create({ name, email, phone })
    .then((result) => {
      // console.log(result.dataValues);
      res
        .status(200)
        .json({ user: result.dataValues, msg: "Successfully added user" });
    })
    .catch((err) => {
      res.status(500).json({ error: "user already exists" });
    });
};

exports.deleteUser = (req, res) => {
  const userId = req.params.userId;
  User.destroy({ where: { id: userId } }).then(() => {
    res.status(200).send({ msg: "user succesfully deleted" });
  });
};

exports.getAllUsers = (req, res) => {
  User.findAll()
    .then((users) => {
      res
        .status(200)
        .send({ allUsers: users, msg: "all users successfully retrived" });
    })
    .catch((err) => {
      res.status(500).send({ error: err });
    });
};
