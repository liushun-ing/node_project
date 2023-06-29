const ProductModel = require("../../models/ProductModel");

const ProductService = {
  add: async ({ title, introduction, detail, cover, createUser }) => {
    return ProductModel.create({
      title,
      introduction,
      detail,
      cover,
      createTime: new Date(),
      editTime: new Date(),
      createUser,
    });
  },
  getList: async (id, createUser) => {
    return id
      ? ProductModel.find({ _id: id, createUser }, [
          "_id",
          "title",
          "introduction",
          "detail",
          "cover",
          "createTime",
          "editTime",
          "createUser",
        ])
      : ProductModel.find({ createUser }, [
          "_id",
          "title",
          "introduction",
          "detail",
          "cover",
          "createTime",
          "editTime",
          "createUser",
        ]);
  },
  deleteProduct: async (_id) => {
    return ProductModel.deleteOne({
      _id,
    });
  },
  editProduct: async ({ _id, title, introduction, cover, detail }) => {
    return cover
      ? ProductModel.updateOne(
          { _id },
          {
            title,
            introduction,
            cover,
            detail,
            editTime: new Date(),
          }
        )
      : ProductModel.updateOne(
          { _id },
          {
            title,
            introduction,
            detail,
            editTime: new Date(),
          }
        );
  },
};

module.exports = ProductService;
