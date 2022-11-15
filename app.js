const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const sequelize = require("./util/database");
const userRoute = require("./routes/user");

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use("/user", userRoute);
app.use((req, res, next) => {
  res.send(`<h1>Page not found</h1>`);
});
sequelize
  .sync()
  .then(() => {
    console.log("sequelize sync sucess");
    app.listen(3500);
  })
  .catch((err) => {
    console.log("sequelize sync failed");
  });
