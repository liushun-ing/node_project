const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/company-system")
  .then(() => {
    console.log("连接数据库成功");
  })
  .catch((error) => {
    console.log("连接数据库失败", error);
  });
