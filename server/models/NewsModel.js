const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsType = {
  title: String,
  content: String,
  category: Number, // 类别1最新动态2典型案例3通知公告
  cover: String,
  isPublish: Number,
  editTime: Date,
  createUser: String
};

const NewsModel = mongoose.model("news", new Schema(NewsType));

module.exports = NewsModel;
