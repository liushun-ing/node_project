const NewsModel = require("../../models/NewsModel");

const NewsService = {
  getList: async (id) => {
    return id
      ? NewsModel.find({ _id: id })
      : NewsModel.find({ isPublish: 1 }).sort({ editTime: -1 });
  },
  getTopList: async (limit) => {
    return NewsModel.find({ isPublish: 1 }).sort({ editTime: -1 }).limit(limit);
  },
};

module.exports = NewsService;
