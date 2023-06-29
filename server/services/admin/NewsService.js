const NewsModel = require("../../models/NewsModel");

const NewsService = {
  add: async ({ title, content, category, cover, isPublish, createUser }) => {
    return NewsModel.create({
      title,
      content,
      category,
      cover,
      isPublish,
      editTime: new Date(),
      createUser,
    });
  },
  getList: async (id, createUser) => {
    return id
      ? NewsModel.find({ _id: id, createUser }, [
          "_id",
          "title",
          "content",
          "category",
          "cover",
          "isPublish",
          "editTime",
          "createUser",
        ])
      : NewsModel.find({ createUser }, [
          "_id",
          "title",
          "content",
          "category",
          "cover",
          "isPublish",
          "editTime",
          "createUser",
        ]);
  },
  publish: async ({ _id, isPublish, editTime }) => {
    return NewsModel.updateOne(
      {
        _id,
      },
      {
        isPublish,
        editTime,
      }
    );
  },
  deleteNews: async (_id) => {
    return NewsModel.deleteOne({
      _id,
    });
  },
  editNews: async ({
    _id,
    title,
    content,
    cover,
    category,
    isPublish,
    editTime,
  }) => {
    return cover
      ? NewsModel.updateOne(
          { _id },
          {
            title,
            content,
            cover,
            category,
            isPublish,
            editTime,
          }
        )
      : NewsModel.updateOne(
          { _id },
          {
            title,
            content,
            category,
            isPublish,
            editTime,
          }
        );
  },
};

module.exports = NewsService;
